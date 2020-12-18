import Firestore from '~/plugins/firebase'
import dayjs from 'dayjs'

type Scrap = {
  message: string
  name: string
}

export const addScrap = async (
  form: Scrap,
  blogTitle: string
): Promise<string> => {
  const adminFirestore = Firestore.firestore()
  const scrapCollection = adminFirestore.collection('scraps')

  let responseText: string = ''
  if (isValidText(form.message)) {
    responseText = 'メッセージは必須です'
    return responseText
  }

  await scrapCollection.add({
    time: dayjs().format(),
    message: form.message,
    name: form.name,
    title: blogTitle
  })

  responseText = '送信に成功しました'
  return responseText
}

export const fetchScraps = async (slug: string) => {
  let result: {
    item: Array<{
      id: string
      data: { [field: string]: string }
      page: number
    }>
  } = {
    item: []
  }

  const adminFirestore = Firestore.firestore()
  const scrapCollection = adminFirestore.collection('scraps')
  await scrapCollection
    .where('title', '==', slug)
    .orderBy('time', 'asc')
    .get()
    .then((snapshot) => {
      let i = 1
      snapshot.forEach((doc) => {
        // console.log(doc.id + ' ' + doc.data())
        result.item.push({
          id: doc.id,
          data: doc.data(),
          page: Math.ceil(i / 20)
        })
        i++
      })
    })

  return result
}

const isValidText = (value: string) => {
  if (value === '') {
    return true
  }
  return false
}
