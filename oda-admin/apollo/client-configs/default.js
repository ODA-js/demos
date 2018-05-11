import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloClient } from 'apollo-client';
import { ApolloLink, concat } from 'apollo-link';
import { BatchHttpLink } from 'apollo-link-batch-http';
import { createUploadLink } from 'apollo-upload-client'

export default (ctx) => {
  const token = localStorage.getItem('authToken');
  const uri = ctx.env.API_URL;
  const httpLink = new BatchHttpLink({ uri });
  const uploadLink = createUploadLink({ uri })
  return new ApolloClient({
    link: uploadLink,
    cache: new InMemoryCache()
  });
}