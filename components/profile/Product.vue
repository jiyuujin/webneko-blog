<template>
  <div>
    <title-label
      :is-center="isCenter"
      :is-bold="isBold"
      width="40%"
      horizontal-margin="30%"
      color="#42b883"
    >
      {{ title }}
    </title-label>
    <div
      v-for="item in data"
      :key="item.id"
      class="card"
    >
      <a
        :href="item.url"
        target="_blank"
      >
        <img
          :src="`${item.image}.png`"
          :alt="item.title"
          decoding="async"
        >
      </a>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from '~/node_modules/nuxt-property-decorator'
const TitleLabel = () => import('~/components/atoms/TitleLabel.vue')

@Component({
  components: {
    TitleLabel
  }
})
export default class Product extends Vue {
  @Prop() title!: string;
  @Prop() description!: string;
  @Prop() data!: object;
  isCenter: boolean = true;
  isBold: boolean = true;
}
</script>

<style scoped>
.card {
  position: relative;
  width: calc(33.3% - 24px);
  margin: 8px;
  display: inline-block;
}

img {
  width: 100%;
}

@media (max-width: 500px) {
  .card {
    width: calc(100% - 10px);
    margin: 5px;
  }
}
</style>
