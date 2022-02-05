import dayjs from 'dayjs'

import createClient from '~/plugins/contentful'

export const PAGE = 20
export const LATEST_PAGE = 8
export const ORDER = '-fields.publishDate'

export const fetchPosts = (isLatest?: boolean) => {
  const client = createClient()
  return client.getEntries({
    content_type: 'blogPost',
    order: ORDER,
    limit: isLatest ? LATEST_PAGE : PAGE,
    skip: 0,
  })
}

export const fetchPost = async (params) => {
  const client = createClient()

  let result: object = {}
  await client
    .getEntries({
      content_type: 'blogPost',
      order: ORDER,
    })
    .then((entries) => {
      if (params.slug) {
        const currentPost = entries.items.filter((item) => {
          return item.fields.slug === params.slug
        })
        result = currentPost[0]
      }

      if (params.ym) {
        result = entries.items.filter((item) => {
          return dayjs(item.fields.publishDate).format('YYYY-MM').includes(params.ym)
        })
      }
    })

  return result
}
