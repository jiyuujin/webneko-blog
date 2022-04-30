import { Configuration } from 'webpack'
import { Context } from '@nuxt/types'

import { useESBuildMinify, useESBuildLoader } from './app/hooks/useESBuild'
import { gtagList } from './app/utils/gtag.constants'
import { generalOg, twitterOg } from './app/utils/og.constants'
import { manifestData } from './app/utils/manifest.constants'

const sass = require('sass')
const fiber = require('fibers')

export default {
  srcDir: 'app/',

  ssr: true,

  head: {
    title: 'トップ',
    titleTemplate: 'Web猫ブログ | %s',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      ...gtagList(),
      ...generalOg(),
      ...twitterOg(),
    ],
    __dangerouslyDisableSanitizersByTagID: {
      GAsrc: ['innerHTML'],
      GAcode: ['innerHTML'],
    },
    link: [
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '32x32',
        href: '/icon/webneko-blog-white.png',
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '16x16',
        href: '/icon/webneko-blog-white.png',
      },
      {
        rel: 'icon',
        type: 'image/x-icon',
        href: '/icon/webneko-blog-white.png',
      },
      {
        rel: 'manifest',
        href: '/site.webmanifest',
      },
      {
        rel: 'alternate',
        type: 'application/rss+xml',
        title: 'RSS for blog posts',
        href: 'https://nuxt2.webneko.dev/feeds.xml',
      },
      {
        rel: 'dns-prefetch',
        href: '//pagead2.googlesyndication.com',
      },
      {
        rel: 'dns-prefetch',
        href: '//googleads.g.doubleclick.net',
      },
      {
        rel: 'dns-prefetch',
        href: '//tpc.googlesyndication.com',
      },
      {
        rel: 'dns-prefetch',
        href: '//www.gstatic.com',
      },
    ],
    script: [
      {
        async: true,
        src: 'js/adsense.js',
      },
    ],
    htmlAttrs: {
      lang: 'ja',
    },
  },

  loading: { color: '#fff' },

  css: [
    {
      src: '~/assets/main.scss',
      lang: 'css',
    },
  ],

  plugins: ['~plugins/sanitize.ts', '~plugins/markdown-it.ts'],

  components: true,

  modules: [
    [
      '@nuxtjs/google-adsense',
      {
        id: 'ca-pub-7095980629133842',
        pageLevelAds: true,
      },
    ],
    '@nuxtjs/sentry',
    '@nuxtjs/sitemap',
    '@nuxtjs/markdownit',
    'nuxt-svg-loader',
  ],

  module: {
    rules: [
      {
        test: /\.md/,
        loader: 'markdownit-loader',
      },
    ],
  },

  sentry: {
    dsn: process.env.SENTRY_DSN,
  },

  pwa: {
    manifest: {
      ...manifestData(),
    },
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
          enforce: false,
        },
      },
    },
    splitChunks: {
      layouts: true,
      pages: true,
      commons: true,
    },
    extend(config: Configuration, { isClient }: Context) {
      if (isClient) {
        config.devtool = '#source-map'
      }
      config.node = { fs: 'empty', child_process: 'empty', net: 'empty', tls: 'empty' } as any
      useESBuildMinify(config)
      useESBuildLoader(config, {
        loader: 'jsx',
        target: 'es2017',
      })
      useESBuildLoader(config, {
        loader: 'tsx',
        target: 'es2017',
      })
    },
    babel: {
      plugins: [
        [
          '@babel/plugin-proposal-private-methods',
          {
            loose: true,
          },
        ],
      ],
    },
    loaders: {
      scss: {
        implementation: sass,
        sassOptions: {
          fiber: fiber,
        },
      },
    },
  },

  buildModules: [
    '@nuxtjs/pwa',
    [
      '@nuxt/typescript-build',
      {
        typeCheck: true,
        ignoreNotFoundWarnings: true,
      },
    ],
    '@nuxtjs/composition-api/module',
  ],

  publicRuntimeConfig: {
    sentryDsn: process.env.SENTRY_DSN,
    lhciGithubAppToken: process.env.LHCI_GITHUB_APP_TOKEN,
    blogPostTypeID: process.env.CTF_BLOG_POST_TYPE_ID,
    spaceId: process.env.CTF_SPACE_ID,
    cdaAccessToken: process.env.CTF_CDA_ACCESS_TOKEN,
    gtagId: process.env.GTAG_ID,
  },

  privateRuntimeConfig: {
    //
  },
}
