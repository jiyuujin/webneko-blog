import { useRoute } from '#app'
import dayjs from 'dayjs'

import client from '~/services/contentful'
import { SHOW_ARCHIVES } from '~/utils/feature.constants'

export const PAGE = 20
export const LATEST_PAGE = 8
export const ORDER = '-fields.publishDate'

export const useFetchPosts = (isLatest?: boolean) => {
  const $client = client()

  return $client.getEntries({
    content_type: 'blogPost',
    order: ORDER,
    limit: isLatest ? LATEST_PAGE : PAGE,
    skip: 0,
  })
}

export const useFetchPost = async () => {
  const route = useRoute()

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

  return result
}
