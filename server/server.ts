import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { jsQuizz } from "../src/constants";
import { QuizResultInput, Resolvers } from "./types/serverTypes";

// Define the schema using GraphQL type definitions (typeDefs)
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

// Create an array to store quiz results (temporary)
const storedResults: QuizResultInput[] = [];

// Define the resolver functions to handle GraphQL queries and mutations
const resolvers: Resolvers = {
  Query: {
    jsQuizz: () => jsQuizz, // Return the predefined quiz data
    fetchQuizResults: () => storedResults, // Return stored quiz results
  },

  Mutation: {
    submitQuizResults: (_, args) => {
      // Save the results to our "storedResults" array
      storedResults.push(...args.results);

      // Return a response indicating success and a message
      return {
        success: true,
        message: "Results submitted successfully!",
      };
    },
  },
};

// Create an instance of ApolloServer with the defined schema and resolvers
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// Create an instance of ApolloServer with the defined schema and resolvers
//  1. creates an Express app
//  2. installs your ApolloServer instance as middleware
//  3. prepares your app to handle incoming requests
async function startServer() {
  const { url } = await startStandaloneServer(server, {
    listen: { port: 4001 },
  });
  console.log(`🚀 Server listening at: ${url}`);
}

// Start the server
startServer();
