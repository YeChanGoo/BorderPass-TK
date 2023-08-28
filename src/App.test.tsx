jest.mock("./apollo.Client");

import { render, screen, waitFor } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";
import { App, GET_QUIZ } from "./App";
import "@testing-library/jest-dom";

// Sample mocked data for our tests
const mockQuizData = [
  {
    request: {
      query: GET_QUIZ,
    },
    result: {
      data: {
        jsQuizz: {
          questions: [
            {
              id: "1",
              question: "Sample question?",
              choices: ["choice1", "choice2"],
              type: "single",
              maxSelection: 1,
              required: true,
            },
          ],
        },
      },
    },
  },
];

describe("App Component", () => {
  // Loading state
  it("show loading state", async () => {
    render(
      <MockedProvider mocks={mockQuizData} addTypename={false}>
        <App />
      </MockedProvider>
    );
    expect(screen.getByRole("progressbar")).toBeInTheDocument();
  });
  // Rendering the quiz
  it("render the quiz when the data is loaded", async () => {
    render(
      <MockedProvider mocks={mockQuizData} addTypename={false}>
        <App />
      </MockedProvider>
    );
    await waitFor(() =>
      expect(screen.getByTestId("quiz-component")).toBeInTheDocument()
    );
  });
  // For error handling
  it("show an error message if there's an error", async () => {
    const errorMock = {
      request: {
        query: GET_QUIZ,
      },
      error: new Error("An error occurred"),
    };

    render(
      <MockedProvider mocks={[errorMock]} addTypename={false}>
        <App />
      </MockedProvider>
    );

    await waitFor(() =>
      expect(screen.getByText(/Error:/i)).toBeInTheDocument()
    );
  });
});
