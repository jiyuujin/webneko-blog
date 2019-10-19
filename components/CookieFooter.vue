<template>
  <footer>
    <client-only>
      <vue-cookie-law
        theme="dark-lime"
        button-text="受け入れる"
        @click.accept="$store.commit('acceptCookie')"
      >
        <div slot="message">
          {{ message }}
        </div>
      </vue-cookie-law>
    </client-only>
  </footer>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import VueCookieLaw from 'vue-cookie-law'

@Component({
  components: {
    VueCookieLaw
  }
})
export default class CookieFooter extends Vue {
  message: string = 'あなたがこのサイト上でベストな体験ができるようCookieを使用しています'
}
</script>
