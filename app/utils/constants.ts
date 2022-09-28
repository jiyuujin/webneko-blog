import Endpoints from './endpoints.constants'

export const CONTACT_URL =
  'https://nekohack.notion.site/jiyuujin-Yuma-Kitamura-c0a6b685fb524ca4823cc1dccbf2f9b8'
export const SOCIAL_LIST = ['twitter', 'hatena', 'note']
export const TWITTER_URL = (title: string, slug: string) =>
  `http://twitter.com/share?text=${title}&url=${Endpoints.BASE_URL}posts/${slug}`
export const HATENA_URL = (slug: string) => `http://b.hatena.ne.jp/entry/webneko.dev/posts/${slug}`
export const NOTE_URL = (slug: string) =>
  `https://note.mu/intent/post?url=${Endpoints.BASE_URL}posts/${slug}`
