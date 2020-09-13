import { reactive } from '@vue/composition-api'

import { addContact } from '~/repositories/contact'

type ContactProps = {
  category: string
  blogTitle: string
}

export default (props: ContactProps) => {
  const form = reactive<{
    title: string
    category: number
    email: string
    description: string
  }>({
    title: '',
    category: 0,
    email: '',
    description: ''
  })

  const applyTitle = (value: string) => {
    form.title = value
  }

  const applyCategory = (value: number) => {
    form.category = value
  }

  const applyEmail = (value: string) => {
    form.email = value
  }

  const applyDescription = (value: string) => {
    form.description = value
  }
  const reset = () => {
    form.title = ''
    form.category = 0
    form.email = ''
    form.description = ''
  }

  const submit = async () => {
    const responseText = await addContact(form, props.category)
    /* eslint-disable */
    console.log(responseText)
    reset()
  }

  return {
    form,
    applyTitle,
    applyCategory,
    applyEmail,
    applyDescription,
    reset,
    submit
  }
}
