import Firestore from '~/plugins/firebase'
import dayjs from 'dayjs'

import { ContactCategories } from '~/services/contact'
import { Category, ContactCategory } from '~/types/contact'

export const addContact = async (
  form: Category,
  categoryText: string = 'manual'
): Promise<string> => {
  const adminFirestore = Firestore.firestore()
  const contactsCollection = adminFirestore.collection('contacts')

  let responseText: string = ''
  if (isValidText(form.title)) {
    if (isValidText(form.description)) {
      responseText = 'タイトル・詳細は必須です'
      return responseText
    }
    responseText = 'タイトルは必須です'
    return responseText
  }

  if (isValidText(form.description)) {
    responseText = '詳細は必須です'
    return responseText
  }

  await contactsCollection.add({
    time: dayjs().format(),
    title: form.title,
    category: getCategory(form.category, form.title, categoryText),
    email: form.email,
    description: form.description
  })

  responseText = '送信に成功しました'
  return responseText
}

const getCategory = (
  category: number,
  title: string,
  categoryText: string
): ContactCategory | undefined => {
  if (categoryText !== 'manual' && category === 0) {
    return {
      value: 10,
      text: title
    }
  }

  return ContactCategories.find((cc: ContactCategory) => cc.value === category)
}

const isValidText = (value: string) => {
  if (value === '') {
    return true
  }
  return false
}
