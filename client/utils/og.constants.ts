import Endpoints from './endpoints.constants'

export const generalOg = (title?: string, description?: string, url?: string, image?: string) => [
  {
    hid: 'description',
    name: 'description',
    content: description
      ? description
      : '2018年10月より運営の当ブログを始め、Vue.jsやNuxtを使ったフロントエンドを中心に設計・開発しています。',
  },
  {
    hid: 'og:site_name',
    name: 'og:site_name',
    content: title ? title : 'Web猫ブログ',
  },
  {
    hid: 'og:type',
    name: 'og:type',
    content: 'website',
  },
  {
    hid: 'og:description',
    name: 'og:description',
    content: description
      ? description
      : '2018年10月より運営の当ブログを始め、Vue.jsやNuxtを使ったフロントエンドを中心に設計・開発しています。',
  },
  {
    hid: 'og:title',
    name: 'og:title',
    content: title ? title : 'Web猫ブログ',
  },
  {
    hid: 'og:url',
    name: 'og:url',
    content: url ? url : 'https://webneko.dev/',
  },
  {
    hid: 'og:image',
    name: 'og:image',
    // content: `${Endpoints.BASE_URL}bakeneko-ogp.jpg`,
    content: image || `${Endpoints.BASE_URL}og/top.jpg`,
  },
]

export const twitterOg = (title?: string, description?: string, image?: string) => [
  {
    hid: 'twitter:description',
    name: 'twitter:description',
    content: description
      ? description
      : '2018年10月より運営の当ブログを始め、Vue.jsやNuxtを使ったフロントエンドを中心に設計・開発しています。',
  },
  {
    hid: 'twitter:title',
    name: 'twitter:title',
    content: title ? title : 'Web猫ブログ',
  },
  {
    hid: 'twitter:card',
    name: 'twitter:card',
    content: 'summary_large_image', // ex: summary, summary_large_image
  },
  {
    hid: 'twitter:site',
    name: 'twitter:site',
    content: '@jiyuujinlab',
  },
  {
    hid: 'twitter:creator',
    name: 'twitter:creator',
    content: '@jiyuujinlab',
  },
  {
    hid: 'twitter:site',
    name: 'twitter:site',
    content: '@jiyuujinlab',
  },
  {
    hid: 'twitter:image',
    name: 'twitter:image',
    // content: `${Endpoints.BASE_URL}bakeneko-ogp.jpg`,
    content: image || `${Endpoints.BASE_URL}og/top.jpg`,
  },
]
