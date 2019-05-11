<template>
  <div
    :style="`background-color: ${backgroundColor}; color: ${color};`"
    class="header"
  >
    <profile-image
      width="150px"
    />
    <h2>
      Web猫
    </h2>
    <h3>
      jiyuujin LAB.
    </h3>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'
const ProfileImage = () => import('~/components/profile/Image.vue')

@Component({
  components: {
    ProfileImage
  }
})
export default class Card extends Vue {
  @Prop() backgroundColor: string;
  @Prop() color: string;
}
</script>

<style scoped>
.header {
  max-width: 100%;
  display: flex;
  padding: 2.4rem 2rem 0;
  width: 100%;
  flex-direction: column;
  align-items: center;
}
</style>
