<template>
  <div class="contact">
    <title-label
      :is-center="isCenter"
      :is-bold="isBold"
      width="40%"
      horizontal-margin="30%"
      color="#42b883"
    >
      コンタクト
    </title-label>
    <title-label
      :is-center="isCenter"
      width="80%"
      horizontal-margin="10%"
    >
      <a
        href="https://twitter.com/jiyuujinlab"
        target="_blank"
        rel="noopener"
      >
        @jiyuujinlab
      </a>
    </title-label>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import TitleLabel from '~/components/atoms/TitleLabel.vue'

@Component({
  components: {
    TitleLabel
  }
})
export default class Contact extends Vue {
  isCenter: boolean = true;
  isBold: boolean = true;
}
</script>

<style scoped>

</style>
