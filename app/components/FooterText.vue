<template>
  <footer>
    <div class="footer-text">
      <div class="contact-more">
        <a
          :href="contactUrl"
          role="button"
          aria-pressed="true"
          target="_blank"
          rel="noopener noreferrer"
        >
          <NotionSvg class="notion-logo" />
          <span>問い合わせはこちら</span>
        </a>
      </div>
      <div class="copyright">
        <a
          href="https://github.com/nekohack"
          role="button"
          aria-pressed="true"
          target="_blank"
          rel="noopener noreferrer"
        >
          ©︎ jiyuujin LAB. by {{ ' ' }}
          <img src="/icon/nekohack.svg" alt="nekohack logo" class="nekohack-logo" />
        </a>
      </div>
    </div>
  </footer>
</template>

<script lang="ts">
import NotionSvg from '~/static/icon/notion.svg'

import { CONTACT_URL } from '~/utils/constants'

export default {
  components: {
    NotionSvg
  },
  data() {
    return { contactUrl: CONTACT_URL }
  }
}
</script>
