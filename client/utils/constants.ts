import Endpoints from '~/utils/endpoints.constants'

export const CONTACT_URL =
  'https://docs.google.com/forms/d/e/1FAIpQLSfFzwsCVnFbu-lV0Jz2fEYHR97hpBSK2g6kEwc-G1fo976ngA/viewform'
export const SOCIAL_LIST = ['twitter', 'hatena', 'note', 'share']
export const TWITTER_URL = (title: string, slug: string) =>
  `http://twitter.com/share?text=${title}&url=${Endpoints.POST_BASE_URL}${slug}`
export const HATENA_URL = (slug: string) => `http://b.hatena.ne.jp/entry/webneko.dev/posts/${slug}`
export const NOTE_URL = (slug: string) =>
  `https://note.mu/intent/post?url=${Endpoints.POST_BASE_URL}${slug}`
