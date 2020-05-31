<template>
  <div class="contact">
    <div class="contact-title">
      お問い合わせ
    </div>

    <j-form title="タイトル">
      <div style="text-align: left;">
        <j-input :text="form.title" width="100%" @handleInput="applyTitle" />
      </div>
    </j-form>
    <j-form v-if="category === 'manual'" title="カテゴリー">
      <div style="text-align: left;">
        <j-select
          :options="contactCategories"
          :values="form.contactCategory"
          @handleSelect="applyContactCategory"
        />
      </div>
    </j-form>
    <j-form title="メールアドレス">
      <div style="text-align: left;">
        <j-input :text="form.email" width="100%" @handleInput="applyEmail" />
      </div>
    </j-form>
    <j-form title="詳細">
      <div style="text-align: left;">
        <j-input
          :text="form.description"
          width="100%"
          @handleInput="applyDescription"
        />
      </div>
    </j-form>
    <j-form>
      <div style="text-align: left;">
        <j-button text="送信します" fill="text" @handleClick="submit" />
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
    </j-form>
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'

import { addContact } from '~/repositories/contact'
import { ContactCategories } from '~/services/contact'
import { Category, ContactCategory } from '~/types/contact'

export default Vue.extend({
  props: {
    category: {
      type: String as PropType<string>,
      default: ''
    },
    blogTitle: {
      type: String as PropType<string>,
      default: ''
    }
  },
  data() {
    return {
      isForm: true as boolean,
      form: {
        title: '',
        contactCategory: 0,
        email: '',
        description: ''
      } as Category,
      contactCategories: ContactCategories as ContactCategory[],
      responseText: '' as string
    }
  },
  methods: {
    applyTitle(value: string) {
      this.form.title = value
    },
    applyContactCategory(value: number) {
      this.form.contactCategory = value
    },
    applyEmail(value: string) {
      this.form.email = value
    },
    applyDescription(value: string) {
      this.form.description = value
    },
    reset() {
      this.form.title = ''
      this.form.contactCategory = 0
      this.form.email = ''
      this.form.description = ''
    },
    async submit() {
      this.responseText = await addContact(this.form, this.category)
      this.reset()
    }
  }
})
</script>
