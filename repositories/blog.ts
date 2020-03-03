import { createClient } from '~/plugins/contentful'
import dayjs from 'dayjs'

import { PAGE, LATEST_PAGE, ORDER } from '~/services/blog'
import { PostItem, Posts, Param } from '~/types/blog'

export const fetchPosts = async (isLatest: boolean = false) => {
  const client = createClient()

  let result: PostItem[] = []
  await client
    .getEntries({
      content_type: process.env.CTF_BLOG_POST_TYPE_ID,
      order: ORDER,
      limit: isLatest ? LATEST_PAGE : PAGE
      // skip: (state.page - 1) * PAGE
    })
    .then((entries: Posts) => {
      result = entries.items
    })

  return result
}

export const fetchPost = async (params: Param) => {
  const client = createClient()

  let result: object = {}
  await client
    .getEntries({
      content_type: process.env.CTF_BLOG_POST_TYPE_ID,
      order: ORDER
    })
    .then((entries: Posts) => {
      if (params.slug) {
        const currentPost = entries.items.filter((item: PostItem) => {
          return item.fields.slug === params.slug
        })
        result = currentPost[0]
      }

      if (params.ym) {
        result = entries.items.filter((item: PostItem) => {
          return dayjs(item.fields.publishDate)
            .format('YYYY-MM')
            .includes(params.ym)
        })
      }
    })

  return result
}
