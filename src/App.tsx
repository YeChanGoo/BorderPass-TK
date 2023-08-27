import React from "react";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  gql,
} from "@apollo/client";
import { Container } from "@mui/material";
import Quiz from "./components/Quiz/Quiz";

const client = new ApolloClient({
  uri: "http://localhost:4001",
  cache: new InMemoryCache(),
});

const GET_QUIZ = gql`
  query GetQuiz {
    jsQuizz {
      questions {
        id
        question
        choices
        type
        maxSelection
        required
      }
    }
  }
`;

function App() {
  const { loading, error, data } = useQuery(GET_QUIZ);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <Container maxWidth='md'>
      <Quiz questions={data.jsQuizz.questions} />
    </Container>
  );
}

function Root() {
  return (
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  );
}

export default Root;
