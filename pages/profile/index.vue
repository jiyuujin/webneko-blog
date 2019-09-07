<template>
  <main-template>
    <div class="profile">
      <profile-card
        background-color="#000"
        color="#fff"
        fontSize="18px"
      />
      <slide-cards :list="allActivities" />
      <work-timeline :list="allWorks" />
    </div>
  </main-template>
</template>

<script lang="ts">
import Vue from 'vue'
import ApolloClient from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import gql from 'graphql-tag'
import fetch from 'node-fetch'

const apolloClient = new ApolloClient({
  link: new HttpLink({
    uri: process.env.GRAPH_API,
    fetch
  }),
  cache: new InMemoryCache()
})

const MainTemplate = ()=> import('~/components/layouts/MainTemplate.vue')
const ProfileCard = () => import('~/components/profile/ProfileCard.vue')
const SlideCards = () => import('~/components/profile/SlideCards.vue')
const WorkTimeline = () => import('~/components/profile/WorkTimeline.vue')

export default Vue.extend({
  components: {
    MainTemplate,
    ProfileCard,
    SlideCards,
    WorkTimeline
  },
  data() {
    return {
      allWorks: null,
      allActivities: null
    }
  },
  async mounted() {
    await apolloClient.query({
      query: gql`
        query {
          allWorks(orderBy: startAt_DESC) {
            id
            startAt
            endAt
            title
            description
          }
          allActivities(orderBy: time_DESC) {
            id
            title
            url
            event
            time
            enabled
          }
        }
      `,
    })
    .then(res => {
      this.allWorks = res.data.allWorks
      this.allActivities = res.data
        .allActivities
        .filter(activity => activity.enabled === true)
    })
  }
})
</script>

<style scoped>
.profile {
  width: 80%;
  margin: 2% 10% 2% 10%;
  text-align: center;
}
</style>
