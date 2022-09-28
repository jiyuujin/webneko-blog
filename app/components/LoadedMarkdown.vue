<template>
  <div class="article">
    <div v-if="USE_CONTENTFUL">
      <div class="post-detail" v-html="$md.render(body)" />
    </div>
    <div v-if="USE_CONTENT">
      <div class="post-detail">
        <content-doc v-slot="{ doc }">
          <content-renderer :value="doc" />
        </content-doc>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { USE_CONTENT, USE_CONTENTFUL } from '~/utils/feature.constants'

export default {
  props: {
    body: {
      type: String,
      default: ''
    }
  },
  data() {
    return { USE_CONTENT, USE_CONTENTFUL }
  }
}
</script>
