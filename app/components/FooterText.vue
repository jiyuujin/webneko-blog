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
          <NotionLogo />
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
          <NekohackLogo />
        </a>
      </div>
    </div>
  </footer>
</template>

<script lang="ts">
import NotionLogo from '~/assets/notion.svg'
import NekohackLogo from '~/assets/nekohack_logo.svg'
import { CONTACT_URL } from '~/utils/constants'

export default {
  components: {
    NotionLogo,
    NekohackLogo
  },
  data() {
    return { contactUrl: CONTACT_URL }
  }
}
</script>
