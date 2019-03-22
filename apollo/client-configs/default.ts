import { ApolloLink } from 'apollo-link'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'

const ACTIVITY_GRAPH_API = 'https://api.graph.cool/simple/v1/cjr94yoay4hds0196reyj9lke'

const TOKEN = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE1NDgyNDQ3NzQsImNsaWVudElkIjoiY2pyOTR5b2F5NGhkdDAxOTYwajIwdDE1aiJ9.WulBc4uocM_ytX6b6-U9Et_ieGGERE2BpYZVkpaBUlo'

export default () => {
  const httpLink = new HttpLink({
    uri: ACTIVITY_GRAPH_API
  })

  const middlewareLink = new ApolloLink((operation: any, forward: any) => {
    operation.setContext({
      headers: {
        Authorization: `bearer ${TOKEN}`
      }
    })
    return forward(operation)
  })

  const link = middlewareLink.concat(httpLink)

  return {
    link,
    cache: new InMemoryCache(),
    defaultHttpLink: false
  }
}
