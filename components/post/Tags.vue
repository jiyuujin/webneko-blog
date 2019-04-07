<template>
  <div>
    <title-label
      :is-center="isCenter"
      :is-bold="isBold"
      width="40%"
      horizontal-margin="30%"
      color="#42b883"
    >
      Tags
    </title-label>
    <div class="tags">
    <span
      v-for="tag in tags"
      :key="tag"
    >
      <label-form
        :tag-text="tag"
      />
    </span>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
const TitleLabel = () => import('~/components/atoms/TitleLabel.vue')
const LabelForm = () => import('~/components/atoms/LabelForm.vue')

@Component({
  components: {
    TitleLabel,
    LabelForm
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
