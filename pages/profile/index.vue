<template>
  <main-template>
    <div class="profile">
      <card
        background-color="#000"
        color="#fff"
      />
      <biography
        fontSize="18px"
      />
      <timeline
        :data="allWorks"
        title="経歴"
      />
      <product
        :data="allProducts"
        title="プロダクト一覧"
      />
    </div>
  </main-template>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
const MainTemplate = ()=> import('~/components/layouts/MainTemplate.vue')
const Card = () => import('~/components/profile/Card.vue')
const Biography = () => import('~/components/profile/Biography.vue')
const Timeline = () => import('~/components/profile/Timeline.vue')
const Product = () => import('~/components/profile/Product.vue')
import gql from 'graphql-tag'

const getQuery = gql`
  query {
    allWorks(orderBy: startAt_DESC) {
      id
      company
      startAt
      endAt
      title
      description
    }
    allProducts {
      id
      title
      url
      tag
      image
    }
  }
`;

@Component({
  components: {
    MainTemplate,
    Card,
    Biography,
    Timeline,
    Product,
  },
  apollo: {
    allWorks: getQuery,
    allProducts: getQuery
  }
})
export default class Index extends Vue {}
</script>

<style scoped>
.profile {
  width: 80%;
  margin: 2% 10% 2% 10%;
  text-align: center;
}
</style>
