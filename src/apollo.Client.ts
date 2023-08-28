import { ApolloClient, InMemoryCache } from "@apollo/client";

// Create a new Apollo Client instance
const client = new ApolloClient({
  uri: "http://localhost:4001",
  cache: new InMemoryCache(),
});

export default client;
