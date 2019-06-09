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
    <title-label
      width="92%"
      horizontal-margin="4%"
    >
      <ul>
        <li
          v-for="item in data"
          :key="item.id"
        >
          <p>
            {{ item.title }}
          </p>
          <p>
            <a
              :href="item.url"
              target="_blank"
              rel="noopener"
            >
              {{ item.description ? item.description : item.url }}
            </a>
          </p>
        </li>
      </ul>
    </title-label>
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
export default class ListMenu extends Vue {
  @Prop() title!: string;
  @Prop() description!: string;
  @Prop() data!: object;
  isCenter: boolean = true;
  isBold: boolean = true;
}
</script>

<style scoped>
.list-menu ul {
  display: table;
}

.list-menu ul li {
  margin-bottom: 15px;
  text-align: left;
}
</style>
