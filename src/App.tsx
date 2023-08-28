import { ApolloProvider, useQuery, gql } from "@apollo/client";
import { Container, CircularProgress, Typography, Box } from "@mui/material";
import Quiz from "./components/Quiz/Quiz";
import { QuizData } from "../src/types/types";
import client from "./apollo.Client";

// GraphQL query
export const GET_QUIZ = gql`
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

// Main App
export function App() {
  // Apollo useQuery hook to fetch the quiz data from the server
  const { loading, error, data } = useQuery<QuizData>(GET_QUIZ);

  // If data is loading, show a circular spinner
  if (loading)
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}>
        <CircularProgress />
      </Box>
    );

  // If there's an error, show error message
  if (error)
    return (
      <Typography variant='h6' color='error'>
        Error: {error.message}
      </Typography>
    );

  // Check if data is present. If not, show error message
  if (!data?.jsQuizz?.questions)
    return (
      <Typography variant='h6' color='error'>
        Error fetching quiz data
      </Typography>
    );

  // If data is sccessfully loaded, render the Quiz component with questions
  return (
    <Container maxWidth='md'>
      <Quiz questions={data.jsQuizz.questions} />
    </Container>
  );
}

// Root that wraps the App
// Wrapping Apollo Client
function Root() {
  return (
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  );
}

export default Root;
