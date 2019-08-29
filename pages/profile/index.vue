<template>
  <main-template>
    <div class="profile">
      <card
        background-color="#000"
        color="#fff"
        fontSize="18px"
      />
      <!--
      <timeline
        :data="allWorks"
        title="経歴"
      />
      -->
    </div>
  </main-template>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
const MainTemplate = ()=> import('~/components/layouts/MainTemplate.vue')
const Card = () => import('~/components/profile/Card.vue')
const Timeline = () => import('~/components/profile/Timeline.vue')
// import gql from 'graphql-tag'
//
// const getQuery = gql('~/apollo/query/fetchWorks.graphql')

@Component({
  components: {
    MainTemplate,
    Card,
    Timeline
  },
})
export default class Index extends Vue {
  // get apollo() {
  //   return {
  //     allWorks: getQuery
  //   }
  // }
}
</script>

<style scoped>
.profile {
  width: 80%;
  margin: 2% 10% 2% 10%;
  text-align: center;
}
</style>
