import { ApolloClient, InMemoryCache } from "@apollo/client";

export const client = new ApolloClient({
  // @Atharva(3.5): Please mention the correct endpoint in the env file.
  uri: process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT,
  cache: new InMemoryCache(),
});
