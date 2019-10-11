import { Configuration } from 'webpack'
import { Context } from '@nuxt/types'
import { ContentfulClientApi } from 'contentful'

const contentful = require('contentful')

require('dotenv').config()

export default {
  mode: 'universal',

  head: {
    title: 'トップ',
    titleTemplate: 'Web猫ブログ | %s',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '2018年10月より運営の当ブログを始め、Vue.jsやNuxtを使ったフロントエンドを中心に設計・開発しています。' },
      { property: 'og:site_name', content: 'Web猫ブログ' },
      { property: 'og:url', content: 'https://webneko.dev/' },
      { property: 'og:type', content: 'website' },
      { property: 'og:title', content: 'Web猫ブログ' },
      { property: 'og:description', content: '2018年10月より運営の当ブログを始め、Vue.jsやNuxtを使ったフロントエンドを中心に設計・開発しています。' },
      { property: 'og:image', content: 'https://webneko.dev/kuroneko1th.png' },
      { property: 'twitter:card', content: 'summary' },
      { property: 'twitter:site', content: '@jiyuujinlab' }
    ],
    link: [
      {
        rel: 'icon',
        type: 'image/x-icon',
        href: 'kuroneko1th.png'
      }
    ],
    script: [
      { async: true, src: '//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js' }
    ]
  },

  loading: { color: '#fff' },

  css: [
    {
      src: '~/assets/main.css',
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
    {
      src: '~plugins/infinite-loading.ts',
      mode: 'client'
    },
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
    '@nuxtjs/markdownit',
  ],

  markdownit: {
    preset: 'default',
    injected: true,
    breaks: true,
    html: true,
    linkify: true,
    typography: true,
    use: [
      'markdown-it-attrs',
      [
        'markdown-it-container',
        'warning'
      ],
      'markdown-it-toc'
    ],
    highlight: (str: string, lang: string) => {
      const hljs = require('highlight.js')
      if (lang && hljs.getLanguage(lang)) {
        return '<pre class="hljs"><code>' +
          hljs.highlight(lang, str, true).value +
          '</code></pre>'
      }
      // 言語設定が無い場合、プレーンテキストとして表示
      return '<pre class="hljs"><code>' +
        hljs.highlight('plaintext', str, true).value +
        '</code></pre>'
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
    generate: false,
    async routes () {
      const client: ContentfulClientApi = contentful.createClient({
        space: process.env.CTF_SPACE_ID,
        accessToken: process.env.CTF_CDA_ACCESS_TOKEN
      })

      const posts = await client.getEntries({
        'content_type': process.env.CTF_BLOG_POST_TYPE_ID,
        order: '-fields.publishDate'
      })

      let urls: string[] = []
      posts.items.forEach((val: any, idx: number) => {
        urls[idx] = 'posts/' + val.fields.slug
      })

      return urls
    }
  },

  manifest: {
    name: 'webneko-blog',
    lang: 'ja'
  },

  build: {
    extend (config: Configuration, { isClient }: Context) {
      if (isClient) {
        config.devtool = '#source-map'
      }
    }
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
    subFolders: false
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
