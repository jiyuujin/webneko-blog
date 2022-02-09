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
          <img src="~/assets/notion.svg" alt="Notion logo" class="notion-logo" />
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
          <img
            src="~/assets/nekohack_logo.svg"
            alt="nekohack logo"
            class="nekohack-logo"
          />
        </a>
      </div>
    </div>
  </footer>
</template>

<script lang="ts">
import { CONTACT_URL } from '~/utils/constants'

export default {
  data() {
    return { contactUrl: CONTACT_URL }
  }
}
</script>
