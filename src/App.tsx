import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  gql,
} from "@apollo/client";
import { Container, CircularProgress, Typography, Box } from "@mui/material";
import Quiz from "./components/Quiz/Quiz";
import { QuizData } from "../src/types/types";

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
  const { loading, error, data } = useQuery<QuizData>(GET_QUIZ);

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
  if (error)
    return (
      <Typography variant='h6' color='error'>
        Error: {error.message}
      </Typography>
    );

  if (!data?.jsQuizz?.questions)
    return (
      <Typography variant='h6' color='error'>
        Error fetching quiz data
      </Typography>
    );

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
