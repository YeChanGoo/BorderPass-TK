import { QuizProps } from "./types/types";

export const jsQuizz: QuizProps = {
  questions: [
    {
      id: "q1",
      question: "Please enter your name",
      type: "FIB",
      required: "yes",
    },
    {
      id: "q2",
      question: "How often do you wear shoes?",
      choices: [
        "Very Frequently",
        "Frequently",
        "Occasionally",
        "Rarely",
        "Never",
      ],
      type: "SCQs",
      required: "yes",
    },
    {
      id: "q3",
      question: "What is your favorite day of the week?",
      choices: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      type: "SCQs",
      required: "yes",
    },
    {
      id: "q4",
      question:
        "Which countries speak Portuguese as an official language? Select 2",
      choices: ["Brazil", "Mexico", "Peru", "Portugal"],
      type: "MCQs",
      maxSelection: 2,
      required: "yes",
    },
    {
      id: "q5",
      question: "What are your top 3 movies from this list? Select 3",
      choices: [
        "Inception",
        "Terminator 2",
        "John Wick",
        "Toy Story",
        "Back to the Future",
      ],
      type: "MCQs",
      maxSelection: 3,
      required: "yes",
    },
    {
      id: "q6",
      question: "Select your favorite cake",
      choices: [
        "Chocolate Cake",
        "Red Velvet Cake",
        "Coconut Cake",
        "None of the above",
      ],
      type: "Dropdown",
      required: "yes",
    },
    {
      id: "q7",
      question: "Additional Comments (Optional)",
      type: "FIB",
      required: "no",
    },
  ],
};
