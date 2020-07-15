import { SetupContext, reactive } from '@vue/composition-api'

import { addContact } from '~/repositories/contact'
import { ContactCategories } from '~/services/contact'

type ContactProps = {
  category: string
  blogTitle: string
}

export default (props: ContactProps, ctx: SetupContext) => {
  const state = reactive({
    form: {
      title: '',
      contactCategory: 0,
      email: '',
      description: ''
    },
    isForm: true,
    contactCategories: ContactCategories,
    responseText: ''
  })

  const applyTitle = (value: string) => {
    state.form.title = value
  }

  const applyContactCategory = (value: number) => {
    state.form.contactCategory = value
  }

  const applyEmail = (value: string) => {
    state.form.email = value
  }

  const applyDescription = (value: string) => {
    state.form.description = value
  }
  const reset = () => {
    state.form.title = ''
    state.form.contactCategory = 0
    state.form.email = ''
    state.form.description = ''
  }

  const submit = async () => {
    state.responseText = await addContact(state.form, props.category)
    reset()
  }

  return {
    state,
    applyTitle,
    applyContactCategory,
    applyEmail,
    applyDescription,
    reset,
    submit
  }
}
