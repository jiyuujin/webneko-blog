import { useRuntimeConfig } from '#app'
import contentful from 'contentful'

const createClient = () => {
  const $config = useRuntimeConfig()
  return contentful.createClient({
    space: $config.space,
    accessToken: $config.accessToken,
  })
}

export default createClient
