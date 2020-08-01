<template>
  <div class="contact">
    <div class="contact-title">
      お問い合わせ
    </div>

    <div style="padding: 8px 0;">
      <j-input
        :text="form.title"
        placeholder="タイトル"
        width="100%"
        @handleInput="applyTitle"
      />
    </div>
    <template v-if="category === 'manual'">
      <div style="padding: 8px 0;">
        <j-select
          :options="contactCategories"
          :values="form.category"
          @handleSelect="applyCategory"
        />
      </div>
    </template>
    <div style="padding: 8px 0;">
      <j-input
        :text="form.email"
        placeholder="メールアドレス"
        width="100%"
        @handleInput="applyEmail"
      />
    </div>
    <div style="padding: 8px 0;">
      <j-input
        :text="form.description"
        placeholder="詳細"
        width="100%"
        @handleInput="applyDescription"
      />
    </div>
    <div style="padding: 8px 0;">
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
import { defineComponent, SetupContext } from '@vue/composition-api'
import ContactComposable from '~/composables/contact'

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
  setup(props, ctx: SetupContext) {
    const contactModule = ContactComposable(props, ctx)
    const contactCategories = ContactCategories
    return { ...contactModule, contactCategories }
  }
})
</script>
