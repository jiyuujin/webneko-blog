import { blogVersion } from '~/services/release'
import { getCookie } from '~/services/cookie'
import { PAGE } from '~/services/blog'

export default () => {
  const blogVersionText = `v${blogVersion}`

  const blogMessage =
    'あなたがこのサイト上でベストな体験ができるようCookieを使用しています'

  const blogUrl = 'https://nekohack-privacy-policy.netlify.app/'

  const count = PAGE

  const isExistedCookie = () => {
    getCookie()
  }

  return { blogVersionText, blogMessage, blogUrl, count, isExistedCookie }
}
