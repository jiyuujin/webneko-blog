<template>
  <footer>
    <div class="footer-text">
      <div class="contact-more">
        <nuxt-link to="/contact">
          <img
            v-if="mode === 'light'"
            src="/icon/contact-white.svg"
            alt="archive"
            decoding="async"
            :style="{ width: '40px' }"
          />
          <img
            v-if="mode === 'dark'"
            src="/icon/contact-white.svg"
            alt="archive"
            decoding="async"
            :style="{ width: '40px' }"
          />
          <span>問い合わせはこちら</span>
        </nuxt-link>
      </div>
      <div class="contact-more">
        <a
          href="https://github.com/jiyuujin/webneko-blog"
          target="_blank"
          rel="noopener noreferrer"
        >
          jiyuujin/webneko-blog
        </a>
      </div>
      <div class="copyright">
        <a
          href="https://github.com/nekohack"
          target="_blank"
          rel="noopener noreferrer"
        >
          ©︎ jiyuujin LAB. by {{ ' ' }}
          <img src="/icon/nekohack.svg" alt="nekohack logo" class="logo" />
        </a>
      </div>
    </div>
  </footer>
</template>

<script lang="ts">
import { useLayout } from '~/composables/layout'

export default {
  setup(props, ctx) {
    const { mode } = useLayout()
    return { mode }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/footer';
</style>
