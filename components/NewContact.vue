<template>
  <div>
    <j-form title="タイトル">
      <j-input :text="form.title" width="100%" @handleInput="applyTitle" />
    </j-form>
    <j-form v-if="category === 'manual'" title="カテゴリー">
      <j-select
        :options="contactCategories"
        :values="form.contactCategory"
        @handleSelect="applyContactCategory"
      />
    </j-form>
    <j-form title="メールアドレス">
      <j-input :text="form.email" width="100%" @handleInput="applyEmail" />
    </j-form>
    <j-form title="詳細">
      <j-input
        :text="form.description"
        width="100%"
        @handleInput="applyDescription"
      />
    </j-form>
    <j-form>
      <j-button text="送信します" fill="text" @handleClick="submit" />
      <span v-if="responseText">
        {{ responseText }}
      </span>
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
