<template>
  <main-template>
    <div class="profile">
      <profile-card
        background-color="#000"
        color="#fff"
        fontSize="18px"
      />
      <skillset :list="allSkills" />
      <slide-cards :list="allActivities" />
      <work-timeline :list="allWorks" />
    </div>
  </main-template>
</template>

<script lang="ts">
import Vue from 'vue'
import { fetchProfile } from '~/services/profile'
const MainTemplate = ()=> import('~/components/layouts/MainTemplate.vue')
const ProfileCard = () => import('~/components/profile/ProfileCard.vue')
const SlideCards = () => import('~/components/profile/SlideCards.vue')
const WorkTimeline = () => import('~/components/profile/WorkTimeline.vue')
const Skillset = () => import('~/components/profile/Skillset.vue')

export default Vue.extend({
  components: {
    MainTemplate,
    ProfileCard,
    SlideCards,
    WorkTimeline,
    Skillset
  },
  data() {
    return {
      allWorks: null,
      allActivities: null,
      allSkills: null
    }
  },
  async mounted() {
    const responseData = await fetchProfile()
    this.allWorks = responseData.data.allWorks
    this.allActivities = responseData.data
      .allActivities
      .filter(activity => activity.enabled === true)
    this.allSkills = responseData.data.allSkills
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
