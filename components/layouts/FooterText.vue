<template>
  <div>
    <div class="info">
      <nuxt-link to="/contact">
        お問い合わせ
      </nuxt-link>
    </div>
    <footer>
      <div class="footer-text">
        {{ footerText }}
      </div>
    </footer>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

@Component({})
export default class Footer extends Vue {
  footerText: string = 'Created © 2019 jiyuujin LAB. All Rights Reserved.';
}
</script>

<style scoped>
.info {
  text-align: center;
}

footer {
  background-color: #35495e;
  color: #fff;
  max-width: 100%;
  display: flex;
  padding: 1rem 2rem 1rem;
}

.footer-text {
  margin: 0 auto;
}
</style>
