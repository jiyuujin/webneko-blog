import { URL_SCHEMA, POST_BASE_URL } from '~/utils/constant'

/**
 * Web Share API を使う
 * @param title
 * @param slug
 */
export const setupWebShare = async (title: string, slug: string) => {
  if (!window.navigator.share) {
    alert('ご利用のブラウザでは共有できません。')
    return
  }

  try {
    await window.navigator.share({
      title: 'Share API で共有！',
      text: title,
      url: `${URL_SCHEMA}${POST_BASE_URL}${slug}`
    })
  } catch (e) {
    console.error(e)
  }
}
