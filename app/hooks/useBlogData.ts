import dayjs from 'dayjs'

import client from '~/services/contentful'
import { USE_CONTENT, USE_CONTENTFUL, SHOW_ARCHIVES } from '~/utils/feature.constants'

export const PAGE = 20
export const LATEST_PAGE = 8
export const ORDER = '-fields.publishDate'

export const useFetchPosts = async (isLatest?: boolean) => {
  if (USE_CONTENT && !USE_CONTENTFUL) {
    const { data: posts } = await useAsyncData('posts', () => {
      if (isLatest) {
        return queryContent('posts').sort({ date: -1 }).find()
      }
      return queryContent('posts').sort({ date: -1 }).find()
    })
    return posts
  }

  const $client = client()

  const res = await $client.getEntries({
    content_type: 'blogPost',
    order: ORDER,
    limit: isLatest ? LATEST_PAGE : PAGE,
    skip: 0,
  })
  return res.items
}

export const useFetchPost = async () => {
  const route = useRoute()

  if (USE_CONTENT && !USE_CONTENTFUL) {
    const { data: currentPost } = await useAsyncData(`post-${route.params.slug}`, () => {
      return queryContent().where({ slug: route.params.slug }).findOne()
    })
    return currentPost
  }

  const $client = client()

  let result: object = {}
  await $client
    .getEntries({
      content_type: 'blogPost',
      order: ORDER,
    })
    .then((entries) => {
      if (route.params.slug) {
        const currentPost = entries.items.filter((item) => {
          return item.fields.slug === route.params.slug
        })
        result = currentPost[0]
      }

      if (SHOW_ARCHIVES && route.params.ym) {
        result = entries.items.filter((item) => {
          return dayjs(item.fields.publishDate).format('YYYY-MM').includes(route.params.ym)
        })
      }
    })

  return result.fields
}
