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
      if (props.errorType === 'error') return 'alert-block_error'
      if (props.errorType === 'warning') return 'alert-block_warning'
      return 'alert-block_normal'
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
