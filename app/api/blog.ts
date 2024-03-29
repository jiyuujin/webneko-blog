import { createClient } from '~/plugins/contentful'
import dayjs from 'dayjs'

import { PostItem, Posts, Param } from '~/types/addon-contentful'

export const PAGE = 10

export const LATEST_PAGE = 6

export const ORDER = '-fields.publishDate'

export const fetchPosts = async ($config, isLatest: boolean = false) => {
  const client = createClient($config)

  let result: PostItem[] = []
  await client
    .getEntries({
      content_type: $config.blogPostTypeID,
      order: ORDER,
      limit: isLatest ? LATEST_PAGE : PAGE,
      skip: 0,
      // skip: (state.page - 1) * PAGE
    })
    .then((entries: Posts) => {
      result = entries.items
    })

  return result
}

export const fetchAllPosts = async ($config, tagName: string = '') => {
  const client = createClient($config)

  let result: PostItem[] = []
  await client
    .getEntries({
      content_type: $config.blogPostTypeID,
      order: ORDER,
    })
    .then((entries: Posts) => {
      result = entries.items
    })

  let resultByTag: PostItem[] = []
  if (tagName !== '') {
    for (let index = 0; index < result.length; index++) {
      if (result[index].fields.tags !== undefined) {
        for (let tag of result[index].fields.tags) {
          if (tag === tagName) {
            resultByTag.push(result[index])
            break
          }
        }
      }
    }
  }

  return tagName === '' ? result : resultByTag
}

export const fetchTags = async ($config) => {
  const client = createClient($config)

  let data: PostItem[] = []
  await client
    .getEntries({
      content_type: $config.blogPostTypeID,
      order: ORDER,
    })
    .then((entries: Posts) => {
      data = entries.items
    })

  let result: string[] = []
  for (let index = 0; index < data.length; index++) {
    if (data[index].fields.tags !== undefined) {
      for (let tag of data[index].fields.tags) {
        result.push(tag)
      }
    }
  }

  // 重複を削除する
  // result = result.filter(function (x, i, self) {
  //   return self.indexOf(x) === i
  // })

  let counts: any = {}
  for (let key of result) {
    counts[key] = result.filter((tag) => {
      return tag == key
    }).length
  }

  return Object.keys(counts)
    .map((e) => ({
      key: e,
      value: counts[e],
    }))
    .sort(function (a, b) {
      if (a.value < b.value) return 1
      if (a.value > b.value) return -1
      return 0
    })
}

export const fetchPost = async ($config, params: Param) => {
  const client = createClient($config)

  let result: object = {}
  await client
    .getEntries({
      content_type: $config.blogPostTypeID,
      order: ORDER,
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
          return dayjs(item.fields.publishDate).format('YYYY-MM').includes(params.ym)
        })
      }
    })

  return result
}

export const fetchPostsByTag = async ($config, name: string) => {
  const client = createClient($config)

  let data: PostItem[] = []
  await client
    .getEntries({
      content_type: $config.blogPostTypeID,
      order: ORDER,
    })
    .then((entries: Posts) => {
      data = entries.items
    })

  let newData: PostItem[] = []
  for (let index = 0; index < data.length; index++) {
    if (data[index].fields.tags !== undefined) {
      for (let tag of data[index].fields.tags) {
        if (tag === name) {
          newData.push(data[index])
          break
        }
      }
    }
  }

  return newData
}
