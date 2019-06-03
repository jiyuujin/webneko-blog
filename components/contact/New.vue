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
    <form-template>
      <input-form
        :data="form.title"
        column="タイトル"
        @form-data="applyTitle"
      />
    </form-template>
    <form-template v-if="category === 'manual'">
      <single-select-form
        :option="contactCategories"
        :number="form.contactCategory"
        column="カテゴリー"
        @form-data="applyContactCategory"
      />
    </form-template>
    <form-template>
      <input-form
        :data="form.email"
        column="メールアドレス (任意)"
        @form-data="applyEmail"
      />
    </form-template>
    <form-template>
      <text-area-form
        :data="form.description"
        column="詳細"
        @form-data="applyDescription"
      />
    </form-template>
    <form-template>
      <a
        href="javascript: void(0)"
        @click="submit(); return false;"
      >
        送信します
      </a>
    </form-template>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'
import dayjs from 'dayjs'
import Firestore from '~/plugins/firebase.ts'
import { isValidText } from '~/store/utils.ts'
const FormTemplate = () => import('~/components/templates/FormTemplate.vue')
const InputForm = () => import('~/components/atoms/InputForm.vue')
const SingleSelectForm = () => import('~/components/atoms/SingleSelectForm.vue')
const TextAreaForm = () => import('~/components/atoms/TextAreaForm.vue')

const adminFirestore: any = Firestore.firestore();

const contactsCollection: any = adminFirestore.collection('contacts')

interface Category {
  title: string,
  contactCategory: number,
  email: string,
  description: string
}

interface ContactCategory {
  value: number,
  text: string
}

const ContactCategories: ContactCategory[] = [
  {
    value: 1,
    text: '仕事のご依頼'
  },
  {
    value: 2,
    text: '当ブログへのご提案'
  },
  {
    value: 99,
    text: 'その他'
  }
];

@Component({
  components: {
    FormTemplate,
    InputForm,
    SingleSelectForm,
    TextAreaForm
  }
})
export default class NewContact extends Vue {
  @Prop() category!: string;
  @Prop() blogTitle!: string;

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
</style>
