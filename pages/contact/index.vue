<template>
  <main-template>
    <new-contact category="manual" />
  </main-template>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'

const MainTemplate = () => import('~/components/MainTemplate.vue')
const NewContact = () => import('~/components/NewContact.vue')

export default defineComponent({
  components: {
    MainTemplate,
    NewContact
  },
  head() {
    return {
      title: '問い合わせ',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: '問い合わせするならこちらからお願いします。'
        },
        { hid: 'twitter:title', name: 'twitter:title', content: '問い合わせ' },
        {
          hid: 'twitter:description',
          name: 'twitter:description',
          content: '問い合わせするならこちらからお願いします。'
        },
        { hid: 'twitter:card', name: 'twitter:card', content: 'summary' },
        { hid: 'twitter:image', name: 'twitter:image', content: '' },
        { hid: 'og:type', name: 'og:type', content: 'article' },
        { hid: 'og:title', name: 'og:title', content: '問い合わせ' },
        {
          hid: 'og:description',
          name: 'og:description',
          content: '問い合わせするならこちらからお願いします'
        },
        { hid: 'og:url', name: 'og:url', content: '/contact' },
        { hid: 'og:image', name: 'og:image', content: '' }
      ]
    }
  }
})
</script>
