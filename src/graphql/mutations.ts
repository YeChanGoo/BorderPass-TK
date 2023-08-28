import { gql } from "@apollo/client";

// GraphQL mutation to submit quiz results
export const SUBMIT_QUIZ_RESULTS = gql`
  mutation SubmitQuizResults($results: [QuizResultInput!]!) {
    submitQuizResults(results: $results) {
      success
      message
    }
  }
`;
