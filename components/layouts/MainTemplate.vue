<template>
  <div :class="isForm ? `form` : ``">
    <slot />
    <footer-text
      v-if="!isForm"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'
const FooterText = () => import('~/components/layouts/FooterText.vue')

@Component({
  components: {
    FooterText
  }
})
export default class MainTemplate extends Vue {
  @Prop() isForm: boolean;
}
</script>

<style scoped>
.form {
  width: 80%;
  margin: 0 auto;
  padding: 1px;
}
</style>
