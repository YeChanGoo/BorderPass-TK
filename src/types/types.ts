import { ChangeEvent } from "react";

export interface Questions {
  id: string;
  question: string;
  type: "FIB" | "SCQs" | "MCQs" | "Dropdown";
  required: "yes" | "no";
  choices?: string[]; // Optional because not all questions have choices
  maxSelection?: number; // Optional, only for type MCQs
}

// Defining the shape of the Quiz
export interface QuizProps {
  questions: Questions[];
}

// Additional types for the GraphQL response and errors
export interface QuizData {
  jsQuizz: QuizProps;
}

export interface DropdownSelection {
  label: string;
  value: string;
}

export type ResultType = {
  [key: string]: string | string[] | null;
};

export interface QuizHookResponse {
  currentQuestionIndex: number;
  answerIdx: number | null;
  result: ResultType;
  showResult: boolean;
  inputAnswer: string;
  dropdownSelection: DropdownSelection | null;
  selectedIndices: number[];
  onAnswerClick: (index: number) => void;
  handleNextClick: () => void;
  handleBackClick: () => void;
  onTryAgain: () => void;
  handleInputChange: (event: ChangeEvent<HTMLInputElement>) => void;
  isNextButtonDisabled: () => boolean;
  setDropdownSelection: React.Dispatch<
    React.SetStateAction<DropdownSelection | null>
  >;
}

export interface BackButtonProps {
  onClick: () => void;
  disabled: boolean;
}

export interface NextButtonProps extends BackButtonProps {
  isLastQuestion: boolean;
}

export type ResultProps = {
  result: ResultType;
  onTryAgain: () => void; // type this based on actual usage
  questions: Questions[];
};

export interface SubmitQuizResultsResponse {
  submitQuizResults: {
    success: boolean;
    message: string;
  };
}

export interface FillInTheBlankProps {
  inputAnswer: string;
  handleInputChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

export interface DropdownQuestionProps {
  choices: string[] | undefined;
  dropdownSelection: DropdownSelection | null;
  setDropdownSelection: React.Dispatch<
    React.SetStateAction<DropdownSelection | null>
  >;
}

export interface ChoiceQuestionProps {
  type: "MCQs" | "SCQs";
  choices: string[] | undefined;
  onAnswerClick: (index: number) => void;
  answerIdx?: number | null; // Might be optional based on your implementation
  selectedIndices: number[];
  maxSelection?: number; // Optional since not always used
}
