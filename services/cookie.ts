const COOKIE_KEY: string = 'webneko-blog-cookie'

export const getCookie = () => {
  if (process.client) {
    return window.localStorage.getItem(COOKIE_KEY)
  }
}

export const setCookie = (flag) => {
  localStorage.setItem(COOKIE_KEY, JSON.stringify(flag))
}
