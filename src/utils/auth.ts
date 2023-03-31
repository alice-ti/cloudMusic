/**
 * @description 设置cookie
 * @param string
 */
export const setCookies = (string: string): void => {
  const cookies = string.split(';;')
  cookies.forEach((cookie) => {
    document.cookie = cookie
    const cookieKeyValue = cookie.split(';')[0].split('=')
    console.log('====', string, cookie, cookieKeyValue)
    localStorage.setItem(`cookie-${cookieKeyValue[0]}`, cookieKeyValue[1])
  })
}

/**
 * @description 获取对应key的Storage值
 * @param key
 * @returns
 */
export const getCookies = (key: string): string | null => {
  return localStorage.getItem(`cookie-${key}`)
}
