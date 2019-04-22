import { ApolloLink } from 'apollo-link'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'

const GRAPH_API = process.env.GRAPH_API;

const TOKEN = process.env.APOLLO_KEY;

export default () => {
  const httpLink = new HttpLink({
    uri: GRAPH_API
  });

  const middlewareLink = new ApolloLink((operation: any, forward: any) => {
    operation.setContext({
      headers: {
        Authorization: `bearer ${TOKEN}`
      }
    });
    return forward(operation)
  });

  const link = middlewareLink.concat(httpLink);

  return {
    link,
    cache: new InMemoryCache(),
    defaultHttpLink: false
  }
}
