<template>
  <div v-if="post" class="post">
    <div
      class="post-detail"
      v-html="$md.render(post.fields.body)"
    ></div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'

@Component({
  async mounted() {
    (this as any).$microlinkjs('.link-preview')
  }
})
export default class Detail extends Vue {
    @Prop() post: object;
}
</script>
