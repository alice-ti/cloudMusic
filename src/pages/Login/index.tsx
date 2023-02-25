import type { QRCodeToStringOptionsOther } from 'qrcode'
import QRcode from 'qrcode'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { loginQrCodeCheck, loginQrCodeKey } from '@/service/auth'
import { setCookies } from '@/utils/auth'

const Sop: QRCodeToStringOptionsOther = {
  width: 192,
  margin: 0,
  color: {
    dark: '#6c216d',
    light: '#ffffff',
  },
  type: 'svg',
}

const codeTxt: { [name: number]: string } = {
  0: '打开网易云音乐APP扫码登录',
  1: '二维码已失效，请重新扫码',
  2: '扫描成功，请在手机上确认登录',
  3: '登录成功，请稍后...',
}

const Login: React.FC = () => {
  const [qrcode, setQrcode] = useState<string>('')
  const [qrState, setQrState] = useState<number>(0)

  const navigate = useNavigate()

  let code = '' // unikey

  useEffect(() => {
    const fetch = async (): Promise<void> => {
      await getKey()
      await checkLogin(code)
    }
    void fetch()
    return () => clearInterval(interCount)
  }, [])

  /**
   * @description 获取生成二维码key
   */
  const getKey = async (): Promise<void> => {
    const {
      data: { data },
    } = await loginQrCodeKey()
    const { unikey } = data

    code = unikey
    const svg = await QRcode.toString(`https://music.163.com/login?codekey=${unikey}`, Sop)
    setQrcode(svg)

    /* 等同于上面 `https://music.163.com/login?codekey=${unikey}`
    const {
      data: { qrurl },
    } = await loginQrCodeCreate({ key: unikey })
    */
  }

  let interCount: NodeJS.Timer
  /**
   * @description 轮询扫码状态
   * - 800为二维码过期
   * - 801为等待扫码
   * - 802为待确认,
   * - 803为授权登录成功(803状态码下会返回cookies)
   * @param key
   */
  const checkLogin = async (key: string): Promise<void> => {
    interCount = setInterval(() => {
      const poll = async (): Promise<void> => {
        const {
          data: { code, cookie },
        } = await loginQrCodeCheck(key)
        console.log('check', code, cookie)

        const _800 = (): void => {
          void getKey()
        }
        const _801 = (): void => {
          setQrState(1)
        }
        const _802 = (): void => {
          setQrState(2)
        }
        const _803 = (): void => {
          setQrState(3)
          clearInterval(interCount)
          setCookies(cookie)
          navigate('/mine')
        }

        switch (code) {
          case 800:
            return _800()
          case 802:
            return _802()
          case 803:
            return _803()
          default:
            return _801()
        }
      }
      void poll()
    }, 1000)
  }

  return (
    <>
      <main className="flex-1">
        <section className="flex flex-col justify-center pt-10">
          <img className="h-60" src={`data:image/svg+xml;utf8,${encodeURIComponent(qrcode)}`} />
          <div>{codeTxt[qrState]}</div>
        </section>
      </main>
    </>
  )
}

export default Login
