import { defineNuxtConfig } from 'nuxt3'
import 'dotenv/config'
import { generalOg, twitterOg } from './app/utils/og.constants'

// https://v3.nuxtjs.org/docs/directory-structure/nuxt.config
export default defineNuxtConfig({
  srcDir: 'app/',
  head: {
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      ...generalOg(),
      ...twitterOg(),
    ],
  },
  css: ['~/assets/main.scss'],
  serverMiddleware: [{ path: '/api/hello', handler: '~/server/api/hello.ts' }],
  buildModules: ['@nuxtjs/svg'],
  publicRuntimeConfig: {
    space: process.env.CTF_SPACE_ID,
    accessToken: process.env.CTF_CDA_ACCESS_TOKEN,
  },
})
