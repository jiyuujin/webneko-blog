<template>
  <main-template>
    <div class="profile">
      <biography />
      <double-rows-menu
        :data="allWorks"
        title="経歴"
      />
      <single-rows-menu
        :data="allProducts"
        title="プロダクト一覧"
      />
      <single-rows-menu
        :data="allActivities"
        title="活動履歴"
      />
      <contact />
    </div>
  </main-template>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
const MainTemplate = ()=> import('~/components/templates/MainTemplate.vue')
const SingleRowsMenu = () => import('~/components/layouts/SingleRowsMenu.vue')
const DoubleRowsMenu = () => import('~/components/layouts/DoubleRowsMenu.vue')
const Biography = () => import('~/components/profile/Biography.vue')
const Contact = () => import('~/components/profile/Contact.vue')
import gql from 'graphql-tag'

const getWorkQuery = gql`
  query {
    allWorks(orderBy: startAt_DESC) {
      id
      company
      startAt
      endAt
    }
  }
`;

const getProductQuery = gql`
  query {
    allProducts {
      id
      title
      url
      tag
    }
  }
`;

const getActivityQuery = gql`
  query {
    allActivities(orderBy: time_DESC) {
      id
      title
      description
      url
    }
  }
`;

@Component({
  components: {
    MainTemplate,
    SingleRowsMenu,
    DoubleRowsMenu,
    Biography,
    Contact,
  },
  head() {
    return {
      title: 'プロフィール'
    }
  },
  apollo: {
    allWorks: getWorkQuery,
    allProducts: getProductQuery,
    allActivities: getActivityQuery
  },
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
