import { ApolloClient, InMemoryCache } from "@apollo/client";

export const client = new ApolloClient({
  uri: 'https://api-sa-east-1.graphcms.com/v2/cl4o7h7ho13c201z2eut46l1s/master',
  cache: new InMemoryCache
})