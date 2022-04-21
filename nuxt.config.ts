import { defineNuxtConfig } from 'nuxt'
import 'dotenv/config'
import { gtagList } from './app/utils/gtag.constants'
import { generalOg, twitterOg } from './app/utils/og.constants'

// https://v3.nuxtjs.org/docs/directory-structure/nuxt.config
export default defineNuxtConfig({
  srcDir: 'app/',
  mode: 'universal',
  target: 'static',
  head: {
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
    htmlAttrs: {
      lang: 'ja',
    },
  },
  css: ['~/assets/main.scss'],
  serverMiddleware: [{ path: '/api/hello', handler: '~/server/api/hello.ts' }],
  buildModules: ['@nuxtjs/svg'],
  publicRuntimeConfig: {
    space: process.env.CTF_SPACE_ID,
    accessToken: process.env.CTF_CDA_ACCESS_TOKEN,
    gtagId: process.env.GTAG_ID,
  },
})
