<template>
  <div class="contact">
    <div class="contact-title">お問い合わせ</div>

    <div class="form">
      <j-input
        :text="form.title"
        placeholder="タイトル"
        width="100%"
        @handleInput="applyTitle"
      />
    </div>
    <template v-if="category === 'manual'">
      <div class="form">
        <j-select
          :options="contactCategories"
          :values="form.category"
          @handleSelect="applyCategory"
        />
      </div>
    </template>
    <div class="form">
      <j-input
        :text="form.email"
        placeholder="メールアドレス"
        width="100%"
        @handleInput="applyEmail"
      />
    </div>
    <div class="form">
      <j-input
        :text="form.description"
        placeholder="詳細"
        width="100%"
        @handleInput="applyDescription"
      />
    </div>
    <div class="form">
      <j-button text="送信します" @handleClick="submit" />
      <span>
        <a
          href="https://nekohack-privacy-policy.netlify.app"
          target="_blank"
          rel="noopener noreferrer"
        >
          プライバシーポリシーはこちらで
        </a>
      </span>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import useContact from '~/composables/contact'

import { ContactCategories } from '~/services/contact'

export default defineComponent({
  props: {
    category: {
      type: String,
      default: ''
    },
    blogTitle: {
      type: String,
      default: ''
    }
  },
  setup(props) {
    const contactCategories = ContactCategories
    return { contactCategories, ...useContact(props) }
  }
})
</script>

<style scoped>
.form {
  padding: 8px 0;
}
</style>
