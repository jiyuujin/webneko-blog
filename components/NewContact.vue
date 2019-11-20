<template>
  <div>
    <div
      v-if="validationText"
      class="validate"
    >
      {{ validationText }}
    </div>
    <div v-if="responseText">
      {{ responseText }}
    </div>
    <j-form title="タイトル">
      <j-input
        input-type="text"
        @handleInput="applyTitle"
      />
    </j-form>
    <j-form
      v-if="category === 'manual'"
      title="カテゴリー"
    >
      <j-select
        :options="contactCategories"
        :multiple="Boolean(false)"
        :selected-values="form.contactCategory"
        @handleSelect="applyContactCategory"
      />
    </j-form>
    <j-form title="メールアドレス">
      <j-input
        input-type="text"
        @handleInput="applyEmail"
      />
    </j-form>
    <j-form title="詳細">
      <j-input
        input-type="text"
        @handleInput="applyDescription"
      />
    </j-form>
    <main-template :is-form="isForm">
      <div class="form">
        <j-button
          text="送信します"
          variant-style="text"
          @handleClick="submit"
        />
      </div>
    </main-template>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import dayjs from 'dayjs'
import Firestore from '~/plugins/firebase.ts'
import { isValidText } from '~/store/utils.ts'
import { ContactCategories } from '~/services/contact'
import { ContactCategory, Category } from '~/types/contact'

const MainTemplate = () => import('~/components/MainTemplate.vue')

const adminFirestore: any = Firestore.firestore()

const contactsCollection: any = adminFirestore.collection('contacts')

export default Vue.extend({
    components: {
        MainTemplate
    },
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
    data() {
        return {
            isForm: true as boolean,
            form: {
                title: '',
                contactCategory: 0,
                email: '',
                description: ''
            } as Category,
            validationText: '' as string,
            responseText: '' as string,
            contactCategories: ContactCategories as ContactCategory[]
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
            this.validationText = ''
        },
        async submit() {
            this.responseText = ''

            if (isValidText(this.form.title)) {
                if (isValidText(this.form.description)) {
                    this.validationText = 'タイトル・詳細は必須です'
                    return
                }
                this.validationText = 'タイトルは必須です'
                return
            }

            if (isValidText(this.form.description)) {
                this.validationText = '詳細は必須です'
                return
            }

            await contactsCollection.add({
                'time': dayjs().format(),
                'title': this.form.title,
                'category': this.getCategory(),
                'email': this.form.email,
                'description': this.form.description
            })

            this.reset()

            this.responseText = '送信に成功しました'
        },
        getCategory(): ContactCategory | undefined {
            if (this.category !== 'manual' && this.form.contactCategory === 0) {
                return {
                    value: 10,
                    text: this.blogTitle
                }
            }

            return ContactCategories.find((cc: ContactCategory) => cc.value === this.form.contactCategory)
        }
    }
})
</script>

<style scoped>
a {
  font-size: 14px;
  font-weight: bold;
  border: solid 1px;
  border-radius: 5px;
  margin: 10px 10px 10px 0;
  padding: 2px 6px 3px;
  outline: none;
  cursor: pointer;
  transition: all 0.3s ease-out;
  -webkit-font-smoothing: antialiased;
  text-decoration: none;
}

.validate {
  margin: 8px auto;
  text-align: center;
  color: #c71582;
}

.form {
  margin: 8px auto;
  text-align: center;
}
</style>
