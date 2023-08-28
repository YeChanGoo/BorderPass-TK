import { ApolloClient, InMemoryCache, ApolloLink } from "@apollo/client";

// Create a mock Apollo Link that doesn't perform any actions
const link = new ApolloLink(() => {
  return null; // This is a mock link that does nothing
});

// Create an Apollo Client instance with a custom cache and the mock link
const client = new ApolloClient({
  cache: new InMemoryCache(),
  link,
});

export default client;
