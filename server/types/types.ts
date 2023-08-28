import { Quiz } from "../../src/types/types";

export interface QuizResultInput {
  questionId: string;
  answer: string[];
}

export interface SubmitQuizResultsArgs {
  results: QuizResultInput[];
}

export type Resolvers = {
  Query: {
    jsQuizz: () => Quiz;
    fetchQuizResults: () => QuizResultInput[];
  };
  Mutation: {
    submitQuizResults: (
      parent: undefined,
      args: SubmitQuizResultsArgs
    ) => {
      success: boolean;
      message: string;
    };
  };
};
