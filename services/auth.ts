import ApolloClient from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'

export const setAuth = () => {
  return new ApolloClient({
    link: new HttpLink({
      uri: process.env.GRAPH_API
    }),
    cache: new InMemoryCache()
  })
}
