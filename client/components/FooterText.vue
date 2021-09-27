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
          <span>問い合わせはこちら</span>
        </a>
      </div>
      <div class="contact-more">
        <a
          href="https://github.com/jiyuujin/webneko-blog"
          role="button"
          aria-pressed="true"
          target="_blank"
          rel="noopener noreferrer"
        >
          jiyuujin/webneko-blog
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
          <img src="/icon/nekohack.svg" alt="nekohack logo" class="logo" />
        </a>
      </div>
    </div>
  </footer>
</template>

<script lang="ts">
export default {
  //
}
</script>
