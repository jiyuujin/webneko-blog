export const generalOg = (title?: string, description?: string, url?: string, image?: string) => [
  {
    hid: 'description',
    property: 'description',
    content: description
      ? description
      : '2018年10月より運営の当ブログを始め、Vue.jsやNuxtを使ったフロントエンドを中心に設計・開発しています。',
  },
  {
    hid: 'og:site_name',
    property: 'og:site_name',
    content: title ? title : 'Web猫ブログ',
  },
  {
    hid: 'og:type',
    property: 'og:type',
    content: 'website',
  },
  {
    hid: 'og:description',
    property: 'og:description',
    content: description
      ? description
      : '2018年10月より運営の当ブログを始め、Vue.jsやNuxtを使ったフロントエンドを中心に設計・開発しています。',
  },
  {
    hid: 'og:title',
    property: 'og:title',
    content: title ? title : 'Web猫ブログ',
  },
  {
    hid: 'og:url',
    property: 'og:url',
    content: url ? url : 'https://webneko.dev/',
  },
  {
    hid: 'og:image',
    property: 'og:image',
    // content: `${Endpoints.BASE_URL}bakeneko-ogp.jpg`,
    content: image,
  },
]

export const twitterOg = (title?: string, description?: string, image?: string) => [
  {
    hid: 'twitter:description',
    property: 'twitter:description',
    content: description
      ? description
      : '2018年10月より運営の当ブログを始め、Vue.jsやNuxtを使ったフロントエンドを中心に設計・開発しています。',
  },
  {
    hid: 'twitter:title',
    property: 'twitter:title',
    content: title ? title : 'Web猫ブログ',
  },
  {
    hid: 'twitter:card',
    property: 'twitter:card',
    content: 'summary_large_image', // ex: summary, summary_large_image
  },
  {
    hid: 'twitter:site',
    property: 'twitter:site',
    content: '@jiyuujinlab',
  },
  {
    hid: 'twitter:creator',
    property: 'twitter:creator',
    content: '@jiyuujinlab',
  },
  {
    hid: 'twitter:site',
    property: 'twitter:site',
    content: '@jiyuujinlab',
  },
  {
    hid: 'twitter:image',
    property: 'twitter:image',
    // content: `${Endpoints.BASE_URL}bakeneko-ogp.jpg`,
    content: image,
  },
]
