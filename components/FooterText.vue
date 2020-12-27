<template>
  <footer>
    <div class="footer-text">
      <div class="menu">
        <a :href="`/archives/${getCurrentMonth}`">
          <img
            v-if="mode === 'light'"
            src="/icon/archive-black.svg"
            alt="archive"
            decoding="async"
            :style="{ width: '40px' }"
          />
          <img
            v-if="mode === 'dark'"
            src="/icon/archive-white.svg"
            alt="archive"
            decoding="async"
            :style="{ width: '40px' }"
          />
        </a>
        <a href="/contact">
          <img
            v-if="mode === 'light'"
            src="/icon/contact-black.svg"
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
        </a>
      </div>
      <div class="menu">
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
import { computed } from '@vue/composition-api'
import dayjs from 'dayjs'

import { useLayout } from '~/composables/layout'

export default {
  setup(props, ctx) {
    const { mode } = useLayout()
    const getCurrentMonth = computed(() => {
      return dayjs().format('YYYY-MM')
    })
    return { mode, getCurrentMonth }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/footer';
</style>
