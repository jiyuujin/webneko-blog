<template>
  <div>
    <title-text
      :is-center="!isCenter"
      :is-bold="isBold"
      width="60%"
    >
      スキルセット
    </title-text>
    <ul v-for="item in list" :key="item.id">
      <li>
        <progress-bar
          :background-color="item.color"
          :title="item.name"
          :ratio="item.ratio"
        ></progress-bar>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
const TitleText = () => import('~/components/atoms/TitleText.vue')
const ProgressBar = () => import('~/components/atoms/ProgressBar.vue')

export default {
  components: {
    TitleText,
    ProgressBar
  },
  props: {
    list: {
      type: Array
    }
  },
  data() {
    return {
      isCenter: true,
      isBold: true
    }
  }
}
</script>

<style scoped>
ul {
  list-style: none;
  margin: 20px 0;
  padding: 0;
  text-align: left;
}

ul > li {
  margin-bottom: 60px;
}

@media (min-width : 640px) {
  ul > li {
    overflow: hidden;
    margin: 0;
    position: relative;
  }
}
</style>
