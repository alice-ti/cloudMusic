import Img from '@components/Img'
import { dailyRecommendTracks } from '@service/song'
import type { RecommSongApiType } from '@type/api'
import sample from 'lodash/sample'
import { useEffect, useState } from 'react'

const defaultCovers = [
  'https://p2.music.126.net/0-Ybpa8FrDfRgKYCTJD8Xg==/109951164796696795.jpg',
  'https://p2.music.126.net/QxJA2mr4hhb9DZyucIOIQw==/109951165422200291.jpg',
  'https://p1.music.126.net/0a56FLdyySKVC6g15DL-RQ==/109951164266089265.jpg',
]

const RecomSong: React.FC = () => {
  const [cover, setCover] = useState<string>('')

  useEffect(() => {
    const getSong = async (): Promise<void> => {
      const { data } = await dailyRecommendTracks()
      const recomm = sample<RecommSongApiType[] | string[]>(
        (data as any)?.msg !== null ? data : defaultCovers ?? defaultCovers
      )
      const src = typeof recomm === 'string' ? recomm : (recomm as RecommSongApiType)?.picUrl
      setCover(src)
    }
    void getSong()
  }, [])

  return (
    <>
      <div className="w-full aspect-[6/2] relative rounded-md overflow-hidden select-none">
        <Img className={'w-full aspect-square animate-[moveTo_34s_linear_infinite]'} src={cover} />
      </div>
    </>
  )
}

export default RecomSong
