import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { jsQuizz } from "../src/constants";
import { QuizResultInput, Resolvers } from "./types/serverTypes";

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.

const typeDefs = `
  type Question {
    id: ID!
    question: String!
    choices: [String]
    type: String!
    maxSelection: Int
    required: String!
  }

  type Quiz {
    questions: [Question]
  }

  type QuizResult {
    questionId: ID!
    answer: [String!]!
  }

  type Query {
    jsQuizz: Quiz
    fetchQuizResults: [QuizResult!]!
  }

  type Mutation {
    submitQuizResults(results: [QuizResultInput!]!): SubmissionResponse!
  }
  
  input QuizResultInput {
    questionId: ID!
    answer: [String!]!
}
  
  type SubmissionResponse {
    success: Boolean!
    message: String
  }
`;
// Create an array to store quiz results
// Note: This is just for demonstration. In a real-world application, you'd use a database.
const storedResults: QuizResultInput[] = [];

const resolvers: Resolvers = {
  Query: {
    jsQuizz: () => jsQuizz,
    fetchQuizResults: () => storedResults,
  },

  Mutation: {
    submitQuizResults: (_, args) => {
      // Save the results to our "storedResults" array
      storedResults.push(...args.results);

      return {
        success: true,
        message: "Results submitted successfully!",
      };
    },
  },
};
// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// Passing an ApolloServer instance to the `startStandaloneServer` function:
//  1. creates an Express app
//  2. installs your ApolloServer instance as middleware
//  3. prepares your app to handle incoming requests
async function startServer() {
  const { url } = await startStandaloneServer(server, {
    listen: { port: 4001 },
  });
  console.log(`🚀 Server listening at: ${url}`);
}

startServer();

console.log(`🚀 Server listening at: `);
