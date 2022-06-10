import { defineNuxtConfig } from 'nuxt'
import svgLoader from 'vite-svg-loader'
import 'dotenv/config'
import { adsenseList } from './app/utils/adsense.constants'
import { gtagList } from './app/utils/gtag.constants'
import { generalOg, twitterOg } from './app/utils/og.constants'
import { icons, manifest } from './app/utils/pwa.constants'

// https://v3.nuxtjs.org/docs/directory-structure/nuxt.config
export default defineNuxtConfig({
  srcDir: 'app/',
  app: {
    buildAssetsDir: '/_nuxt/',
  },
  mode: 'universal',
  target: 'static',
  head: {
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      ...adsenseList(),
      ...gtagList(),
      ...generalOg(),
      ...twitterOg(),
    ],
    link: [...icons(), ...manifest()],
    __dangerouslyDisableSanitizersByTagID: {
      ADsrc: ['innerHTML'],
      ADcode: ['innerHTML'],
      GAsrc: ['innerHTML'],
      GAcode: ['innerHTML'],
    },
    htmlAttrs: {
      lang: 'ja',
    },
  },
  css: ['~/assets/main.scss'],
  serverMiddleware: [{ path: '/api/hello', handler: '~/server/api/hello.ts' }],
  vite: {
    plugins: [svgLoader()],
  },
  vue: {
    compilerOptions: {
      isCustomElement: (tag) => ['adsbygoogle'].includes(tag),
    },
  },
  publicRuntimeConfig: {
    space: process.env.CTF_SPACE_ID,
    accessToken: process.env.CTF_CDA_ACCESS_TOKEN,
    gtagId: process.env.GTAG_ID,
  },
  build: {
    extractCSS: true,
  },
})
