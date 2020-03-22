import { Configuration } from 'webpack'
import { Context } from '@nuxt/types'
import { ContentfulClientApi } from 'contentful'

const contentful = require('contentful')
const sass = require('sass')
const fiber = require('fibers')

const md = require('markdown-it')
const hl = require('highlight.js')

require('dotenv').config()

export default {
  mode: 'universal',

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
      }
    ],
    script: [
      // {
      //     async: true,
      //     src: '//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js'
      // }
    ],
    htmlAttrs: {
      lang: 'ja'
    }
  },

  render: {
    bundleRenderer: {
      shouldPreload: (file, type) => {
        return ['script', 'style'].includes(type)
      }
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
    {
      src: '~plugins/microlink.ts',
      mode: 'client'
    },
    // {
    //     src: '~plugins/infinite-loading.ts',
    //     mode: 'client'
    // },
    '~plugins/firebase.ts',
    '~plugins/j-stylebook.ts',
    '~plugins/profile-component.ts'
  ],

  modules: [
    '@nuxtjs/pwa',
    '@nuxtjs/dotenv',
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

  markdownit: {
    preset: 'default',
    injected: true,
    breaks: true,
    html: true,
    linkify: true,
    typography: true,
    use: [
      [
        'markdown-it-container',
        'warning',
        {
          validate: function(params) {
            return params.trim().match(/^message\s+(.*)$/)
          },
          render: function(tokens, idx) {
            const m = tokens[idx].info.trim().match(/^message\s+(.*)$/)
            if (tokens[idx].nesting === 1) {
              return '<div class="message ' + md.utils.escapeHtml(m[1]) + '">'
            } else {
              return '</div>\n'
            }
          }
        }
      ],
      'markdown-it-toc',
      [
        'markdown-it-link-attributes',
        {
          pattern: /https?:/,
          attrs: {
            target: '_blank',
            rel: 'nofollow noopener noreferrer'
          }
        }
      ],
      'markdown-it-attrs',
      'markdown-it-video',
      'markdown-it-mark'
    ],
    highlight: (str, lang) => {
      if (lang && hl.getLanguage(lang)) {
        try {
          return (
            '<pre class="hljs"><code>' +
            hl.highlight(lang, str, true).value +
            '</code></pre>'
          )
        } catch (__) {}
      }
      // 言語設定がない場合、プレーンテキストとして表示する
      return (
        '<pre class="hljs"><code>' +
        hl.highlight('plaintext', str, true).value +
        '</code></pre>'
      )
    }
  },

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
    generate: true,
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
      posts.items.forEach((val: any, idx: number) => {
        urls[idx] = 'posts/' + val.fields.slug
      })

      return urls
    }
  },

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
    theme_color: '#ffbb33',
    background_color: '#ffbb33'
  },

  build: {
    maxChunkSize: 300000,
    extend(config: Configuration, { isClient }: Context) {
      if (isClient) {
        config.devtool = '#source-map'
      }
    },
    loaders: {
      scss: {
        implementation: sass,
        sassOptions: {
          fiber: fiber
        }
      }
    },
    hardSource: true
  },

  buildModules: [
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
    CTF_CDA_ACCESS_TOKEN: process.env.CTF_CDA_ACCESS_TOKEN,
    API_KEY: process.env.API_KEY,
    AUTH_DOMAIN: process.env.AUTH_DOMAIN,
    PROJECT_ID: process.env.PROJECT_ID,
    GRAPH_API: process.env.GRAPH_API,
    APOLLO_KEY: process.env.APOLLO_KEY,
    MICROLINK_API: process.env.MICROLINK_API
  }
}
