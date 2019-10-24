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
    <main-template
      :is-form="isForm"
      class="form"
    >
      <j-input
        placeholder="タイトル"
        input-type="text"
        width="80%"
        @handleInput="applyTitle"
      />
    </main-template>
    <main-template
      v-if="category === 'manual'"
      :is-form="isForm"
      class="form"
    >
      <j-select
        :options="contactCategories"
        :multiple="Boolean(false)"
        :selected-values="form.contactCategory"
        width="80%"
        @handleSelect="applyContactCategory"
      />
    </main-template>
    <main-template
      :is-form="isForm"
      class="form"
    >
      <j-input
        placeholder="メールアドレス (任意)"
        input-type="text"
        width="80%"
        @handleInput="applyEmail"
      />
    </main-template>
    <main-template
      :is-form="isForm"
      class="form"
    >
      <j-input
        placeholder="詳細"
        input-type="text"
        width="80%"
        @handleInput="applyDescription"
      />
    </main-template>
    <main-template
      :is-form="isForm"
      class="form"
    >
      <j-button
        text="送信します"
        width="128px"
        variant-style="text"
        @handleClick="submit"
      />
    </main-template>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'
import dayjs from 'dayjs'
import Firestore from '~/plugins/firebase.ts'
import { isValidText } from '~/store/utils.ts'
import { ContactCategories } from '~/services/contact'
import { ContactCategory, Category } from '~/types/contact'
const MainTemplate = () => import('~/components/MainTemplate.vue')

const adminFirestore: any = Firestore.firestore();

const contactsCollection: any = adminFirestore.collection('contacts')

@Component({
    components: {
        MainTemplate
    }
})
export default class NewContact extends Vue {
    @Prop() category!: string;
    @Prop() blogTitle!: string;
    isForm: boolean = true;

    form: Category = {
        title: '',
        contactCategory: 0,
        email: '',
        description: ''
    };
    validationText: string = '';
    responseText: string = '';

    contactCategories: ContactCategory[] = ContactCategories;

    applyTitle(value: string) {
        this.form.title = value
    }

    applyContactCategory(value: number) {
        this.form.contactCategory = value
    }

    applyEmail(value: string) {
        this.form.email = value
    }

    applyDescription(value: string) {
        this.form.description = value
    }

    reset() {
        this.form.title = ''
        this.form.contactCategory = 0
        this.form.email = ''
        this.form.description = ''
        this.validationText = ''
    }

    async submit() {
        this.responseText = '';

        if (isValidText(this.form.title)) {
            if (isValidText(this.form.description)) {
                this.validationText = 'タイトル・詳細は必須です';
                return;
            }
            this.validationText = 'タイトルは必須です';
            return;
        }

        if (isValidText(this.form.description)) {
            this.validationText = '詳細は必須です';
            return;
        }

        await contactsCollection.add({
            'time': dayjs().format(),
            'title': this.form.title,
            'category': this.getCategory(),
            'email': this.form.email,
            'description': this.form.description
        });

        this.reset();

        this.responseText = '送信に成功しました';
    }

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
  text-align: left;
  color: #c71582;
}

.form {
  margin: 8px auto;
}
</style>
