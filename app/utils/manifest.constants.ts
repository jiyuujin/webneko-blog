export const manifestData = () => {
  return {
    name: 'Web猫ブログ',
    short_name: 'Web猫ブログ',
    title: 'Web猫ブログ',
    'og:title': 'Web猫ブログ',
    description:
      '2018年10月より運営の当ブログを始め、Vue.jsやNuxtを使ったフロントエンドを中心に設計・開発しています。',
    'og:description':
      '2018年10月より運営の当ブログを始め、Vue.jsやNuxtを使ったフロントエンドを中心に設計・開発しています。',
    lang: 'en',
    start_url: 'https://nuxt2.webneko.dev/',
    icons: [
      {
        src: 'icon/webneko-blog-white-72.png',
        sizes: '72x72',
        type: 'image/png',
      },
      {
        src: 'icon/webneko-blog-white-96.png',
        sizes: '96x96',
        type: 'image/png',
      },
      {
        src: 'icon/webneko-blog-white-128.png',
        sizes: '128x128',
        type: 'image/png',
      },
      {
        src: 'icon/webneko-blog-white-144.png',
        sizes: '144x144',
        type: 'image/png',
      },
      {
        src: 'icon/webneko-blog-white-152.png',
        sizes: '152x152',
        type: 'image/png',
      },
      {
        src: 'icon/webneko-blog-white-192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: 'icon/webneko-blog-white-384.png',
        sizes: '384x384',
        type: 'image/png',
      },
      {
        src: 'icon/webneko-blog-white-512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
    theme_color: '#ffbb33',
    background_color: '#ffbb33',
    display: 'standalone',
  }
}
