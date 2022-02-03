import createClient from '~/plugins/contentful'

export const PAGE = 20
export const ORDER = '-fields.publishDate'

export const fetchPosts = () => {
  const client = createClient()
  return client.getEntries({
    content_type: 'blogPost',
    order: ORDER,
    limit: PAGE,
    skip: 0,
  })
}
