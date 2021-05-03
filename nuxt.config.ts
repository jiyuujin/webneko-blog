import { Configuration } from 'webpack'
import { Context } from '@nuxt/types'
import { ContentfulClientApi, Entry } from 'contentful'

const contentful = require('contentful')
const sass = require('sass')
const fiber = require('fibers')

require('dotenv').config()

export default {
  ssr: true,

  head: {
    title: 'トップ',
    titleTemplate: 'Web猫ブログ | %s',
    meta: [
      {
        charset: 'utf-8'
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1'
      },
      {
        hid: 'description',
        name: 'description',
        content:
          '2018年10月より運営の当ブログを始め、Vue.jsやNuxtを使ったフロントエンドを中心に設計・開発しています。'
      },
      {
        hid: 'twitter:title',
        name: 'twitter:title',
        content: 'Web猫ブログ'
      },
      {
        hid: 'twitter:description',
        name: 'twitter:description',
        content:
          '2018年10月より運営の当ブログを始め、Vue.jsやNuxtを使ったフロントエンドを中心に設計・開発しています。'
      },
      {
        hid: 'twitter:card',
        name: 'twitter:card',
        content: 'summary'
      },
      {
        hid: 'twitter:site',
        name: 'twitter:site',
        content: '@jiyuujinlab'
      },
      {
        hid: 'og:site_name',
        name: 'og:site_name',
        content: 'Web猫ブログ'
      },
      {
        hid: 'og:type',
        name: 'og:type',
        content: 'website'
      },
      {
        hid: 'og:title',
        name: 'og:title',
        content: 'Web猫ブログ'
      },
      {
        hid: 'og:description',
        name: 'og:description',
        content:
          '2018年10月より運営の当ブログを始め、Vue.jsやNuxtを使ったフロントエンドを中心に設計・開発しています。'
      },
      {
        hid: 'og:url',
        name: 'og:url',
        content: 'https://webneko.dev/'
      },
      {
        hid: 'og:image',
        name: 'og:image',
        content: '/icon/webneko-blog-black.png'
      }
    ],
    link: [
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '32x32',
        href: '/icon/webneko-blog-white.png'
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '16x16',
        href: '/icon/webneko-blog-white.png'
      },
      {
        rel: 'icon',
        type: 'image/x-icon',
        href: '/icon/webneko-blog-white.png'
      },
      {
        rel: 'manifest',
        href: '/site.webmanifest'
      },
      {
        rel: 'alternate',
        type: 'application/rss+xml',
        title: 'RSS for blog posts',
        href: 'https://webneko.dev/feeds.xml'
      },
      {
        rel: 'dns-prefetch',
        href: '//pagead2.googlesyndication.com'
      },
      {
        rel: 'dns-prefetch',
        href: '//googleads.g.doubleclick.net'
      },
      {
        rel: 'dns-prefetch',
        href: '//tpc.googlesyndication.com'
      },
      {
        rel: 'dns-prefetch',
        href: '//www.gstatic.com'
      }
    ],
    script: [
      {
        async: true,
        src: 'js/adsense.js'
      }
    ],
    htmlAttrs: {
      lang: 'ja'
    }
  },

  loading: { color: '#fff' },

  css: [
    {
      src: '~/assets/main.scss',
      lang: 'css'
    },
    {
      src: '~/node_modules/highlight.js/styles/hopscotch.css',
      lang: 'css'
    }
  ],

  plugins: [
    '~plugins/composition-api.ts',
    '~plugins/sanitize.ts',
    '~plugins/markdown-it.ts'
  ],

  components: true,

  modules: [
    [
      '@nuxtjs/google-adsense',
      {
        id: 'ca-pub-7095980629133842',
        pageLevelAds: true
      }
    ],
    [
      '@nuxtjs/google-analytics',
      {
        id: 'UA-141123200-1'
      }
    ],
    '@nuxtjs/sitemap',
    '@nuxtjs/markdownit'
  ],

  module: {
    rules: [
      {
        test: /\.md/,
        loader: 'markdownit-loader'
      }
    ]
  },

  sitemap: {
    path: '/sitemap.xml',
    hostname: 'https://webneko.dev/',
    cacheTime: 1000 * 60 * 15,
    async routes() {
      const client: ContentfulClientApi = contentful.createClient({
        space: process.env.CTF_SPACE_ID,
        accessToken: process.env.CTF_CDA_ACCESS_TOKEN
      })

      const posts = await client.getEntries({
        content_type: process.env.CTF_BLOG_POST_TYPE_ID,
        order: '-fields.publishDate'
      })

      const urls: string[] = []
      posts.items.forEach((post: Entry<any>, index: number) => {
        urls[index] = 'posts/' + post.fields.slug
      })

      return urls
    }
  },

  pwa: {
    manifest: {
      name: 'Web猫ブログ',
      short_name: 'Web猫ブログ',
      title: 'Web猫ブログ',
      'og:title': 'Web猫ブログ',
      description:
        '2018年10月より運営の当ブログを始め、Vue.jsやNuxtを使ったフロントエンドを中心に設計・開発しています。',
      'og:description':
        '2018年10月より運営の当ブログを始め、Vue.jsやNuxtを使ったフロントエンドを中心に設計・開発しています。',
      lang: 'en',
      start_url: 'https://webneko.dev/',
      icons: [
        {
          src: 'icon/webneko-blog-white-72.png',
          sizes: '72x72',
          type: 'image/png'
        },
        {
          src: 'icon/webneko-blog-white-96.png',
          sizes: '96x96',
          type: 'image/png'
        },
        {
          src: 'icon/webneko-blog-white-128.png',
          sizes: '128x128',
          type: 'image/png'
        },
        {
          src: 'icon/webneko-blog-white-144.png',
          sizes: '144x144',
          type: 'image/png'
        },
        {
          src: 'icon/webneko-blog-white-152.png',
          sizes: '152x152',
          type: 'image/png'
        },
        {
          src: 'icon/webneko-blog-white-192.png',
          sizes: '192x192',
          type: 'image/png'
        },
        {
          src: 'icon/webneko-blog-white-384.png',
          sizes: '384x384',
          type: 'image/png'
        },
        {
          src: 'icon/webneko-blog-white-512.png',
          sizes: '512x512',
          type: 'image/png'
        }
      ],
      theme_color: '#ffbb33',
      background_color: '#ffbb33',
      display: 'standalone'
    }
  },

  build: {
    optimization: {
      minimize: true,
      splitChunks: {
        chunks: 'all',
        automaticNameDelimiter: '.',
        name: 'test',
        maxSize: 128000,
        cacheGroups: {
          chunks: 'all', // 非同期で読み込む
          enforce: false
        }
      }
    },
    splitChunks: {
      layouts: true,
      pages: true,
      commons: true
    },
    extend(config: Configuration, { isClient }: Context) {
      if (isClient) {
        config.devtool = '#source-map'
      }
    },
    babel: {
      plugins: [
        [
          '@babel/plugin-proposal-private-methods',
          {
            loose: true
          }
        ]
      ]
    },
    loaders: {
      scss: {
        implementation: sass,
        sassOptions: {
          fiber: fiber
        }
      }
    }
  },

  buildModules: [
    '@nuxtjs/dotenv',
    '@nuxtjs/pwa',
    [
      '@nuxt/typescript-build',
      {
        typeCheck: true,
        ignoreNotFoundWarnings: true
      }
    ]
  ],

  router: {
    //
  },

  generate: {
    // 404対応
    fallback: true,
    // Payload機能
    // https://ja.nuxtjs.org/api/configuration-generate/#-code-payload-code-%E3%81%AB%E3%82%88%E3%82%8B%E5%8B%95%E7%9A%84%E3%83%AB%E3%83%BC%E3%83%86%E3%82%A3%E3%83%B3%E3%82%B0%E7%94%9F%E6%88%90%E3%81%AE%E9%AB%98%E9%80%9F%E5%8C%96
    routes() {
      const client: ContentfulClientApi = contentful.createClient({
        space: process.env.CTF_SPACE_ID,
        accessToken: process.env.CTF_CDA_ACCESS_TOKEN
      })

      const posts: any = client.getEntries({
        content_type: process.env.CTF_BLOG_POST_TYPE_ID,
        order: '-fields.publishDate'
      })

      const urls: string[] = []
      posts.items.forEach((val: any, idx: number) => {
        urls[idx] = 'posts/' + val.fields.slug
      })

      return urls
    }
  },

  env: {
    CTF_PERSON_ID: process.env.CTF_PERSON_ID,
    CTF_BLOG_POST_TYPE_ID: process.env.CTF_BLOG_POST_TYPE_ID,
    CTF_SPACE_ID: process.env.CTF_SPACE_ID,
    CTF_CDA_ACCESS_TOKEN: process.env.CTF_CDA_ACCESS_TOKEN
  }
}
