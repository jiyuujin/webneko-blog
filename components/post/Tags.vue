<template>
  <div>
    <title-text
      :is-center="isCenter"
      :is-bold="isBold"
      width="40%"
      horizontal-margin="30%"
      color="#42b883"
    >
      Tags
    </title-text>
    <div class="tags">
      <span
        v-for="tag in tags"
        :key="tag"
      >
        <label-text
          :tag-text="tag"
        />
      </span>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
const TitleText = () => import('~/components/atoms/TitleText.vue')
const LabelText = () => import('~/components/atoms/LabelText.vue')

@Component({
  components: {
    TitleText,
    LabelText
  }
})
export default class Tags extends Vue {
  get tags() {
    return this.$store.state.product.tags
  }

  isCenter: boolean = true;
  isBold: boolean = true;
}
</script>

<style scoped>
.tags {
  width: 100%;
  text-align: center;
}
</style>
