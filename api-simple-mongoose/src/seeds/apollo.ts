import { InMemoryCache, NormalizedCacheObject } from 'apollo-cache-inmemory';
import { ApolloClient } from 'apollo-client';
import { ApolloLink, concat, } from 'apollo-link';
import { BatchHttpLink } from 'apollo-link-batch-http';

export default ({ uri, token }) => {
  const httpLink = new BatchHttpLink({ uri });
  if (token) {
    const authMiddleware = new ApolloLink((operation, forward) => {
      operation.setContext({
        headers: {
          authorization: token ? `Bearer ${token}` : null,
        }
      });
      return forward(operation);
    });
    return new ApolloClient({
      link: concat(authMiddleware, httpLink),
      cache: new InMemoryCache()
    });
  } else {
    return new ApolloClient({
      link: httpLink,
      cache: new InMemoryCache()
    });
  }
}