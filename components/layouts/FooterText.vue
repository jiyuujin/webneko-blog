<template>
  <div>
    <!--
    <div class="above-footer">
      <description-space>
        <nuxt-link to="/privacy">
          プライバシーポリシー
        </nuxt-link>
      </description-space>
      <description-space>
        <nuxt-link to="/contact">
          お問い合わせ
        </nuxt-link>
      </description-space>
    </div>
    -->
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
.above-footer {
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
