import { gql } from "@apollo/client";

export const SUBMIT_QUIZ_RESULTS = gql`
  mutation SubmitQuizResults($results: [QuizResultInput!]!) {
    submitQuizResults(results: $results) {
      success
      message
    }
  }
`;
