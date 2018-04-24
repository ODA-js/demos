import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloClient } from 'apollo-client';
import { ApolloLink, concat } from 'apollo-link';
import { BatchHttpLink } from 'apollo-link-batch-http';
import { createUploadLink } from 'apollo-upload-client'

export default ({ uri }) => {
  const httpLink = new BatchHttpLink({ uri });
  const token = localStorage.getItem('authToken');
  const uploadLink = createUploadLink({ uri })

  const authMiddleware = new ApolloLink((operation, forward) => {
    // add the authorization to the headers
    const token = localStorage.getItem('authToken');
    operation.setContext({
      headers: {
        authorization: token ? `Bearer ${token}` : null,
      }
    });
    return forward(operation);
  })

  return new ApolloClient({
    link: uploadLink,
    cache: new InMemoryCache()
  });
}