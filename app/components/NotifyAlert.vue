<template>
  <div :class="['alert-block', backgroundColor]">
    <h3 v-if="years">{{ `当記事は公開されてから ${years} 年以上経過している記事です。` }}</h3>
    <p>{{ `「${title}」の改善提案など気軽にご協力いただければ幸いです。` }}</p>
    <p>
      Issue はこちらでよろしくお願いします:
      <wbr />
      <a href="https://github.com/jiyuujin/webneko-blog/issues" title="Issueはこちらでよろしくお願いします" target="_blank" rel="noopener noreferrer">
        https://github.com/jiyuujin/webneko-blog/issues
      </a>
    </p>
  </div>
</template>

<script lang="ts">
import { computed } from '@nuxtjs/composition-api'

export default {
  props: {
    title: {
      type: String,
      default: ''
    },
    errorType: {
      type: String,
      default: 'normal'
    }
  },
  setup(props) {
    const backgroundColor = computed(() => {
      if (props.errorType === 'error') return 'error'
      if (props.errorType === 'warning') return 'warning'
      return 'normal'
    })
    const years = computed(() => {
      if (props.errorType === 'error') return 3
      if (props.errorType === 'warning') return 1
      return ''
    })
    return { backgroundColor, years }
  }
}
</script>

<style scoped>
.normal {
  border-color: #318a62;
}

.warning {
  border-color: #b29400;
}

.error {
  border-color: #c00;
}
</style>
