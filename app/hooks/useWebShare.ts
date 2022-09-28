import Endpoints from '~/utils/endpoints.constants'

/**
 * Web Share API を使う
 * @param title
 * @param slug
 */
export const useWebShareSetup = async (title: string, slug: string) => {
  if (!window.navigator.share) {
    alert('ご利用のブラウザでは共有できません。')
    return
  }

  try {
    await window.navigator.share({
      title: 'Share API で共有！',
      text: title,
      url: `${Endpoints.BASE_URL}posts/${slug}`,
    })
  } catch (e) {
    console.error(e)
  }
}
