import { useState, ChangeEvent } from "react";
import {
  Questions,
  DropdownSelection,
  ResultType,
  QuizHookResponse,
} from "../types/types";

// Custom hook
export const useQuiz = (questions: Questions[]): QuizHookResponse => {
  // Current question index
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  // User's selected answer index for single choice questions
  const [answerIdx, setanswerIdx] = useState<number | null>(null);
  // An object to store user's answers.
  const [result, setResult] = useState<ResultType>({});
  // Boolean to control when the quiz result is shown
  const [showResult, setShowResult] = useState(false);
  // User's answer for FillInTheBlank questions
  const [inputAnswer, setInputAnswer] = useState("");
  // User's selected option for DropDown questions.
  const [dropdownSelection, setDropdownSelection] =
    useState<DropdownSelection | null>(null);
  // Indices of selected answers for multiple choice questions
  const [selectedIndices, setSelectedIndices] = useState<number[]>([]);

  // Destructure keys from the current question
  const { id, choices, type } = questions[currentQuestionIndex];

  // Handler for when an answer option is clicked
  const onAnswerClick = (index: number): void => {
    // Adjusts selected indices accordingly for multiple choice questions
    if (type === "MCQs") {
      if (selectedIndices.includes(index)) {
        setSelectedIndices((prev) => prev.filter((idx) => idx !== index));
      } else {
        setSelectedIndices((prev) => [...prev, index]);
      }
    } else {
      setanswerIdx(index);
    }
  };

  // Handler for when the "Next" button is clicked
  const handleNextClick = (): void => {
    if (type === "FIB") {
      setResult((prev) => ({ ...prev, [id]: inputAnswer }));
    } else if (type === "SCQs" && choices && answerIdx !== null) {
      setResult((prev) => ({ ...prev, [id]: choices[answerIdx] }));
    } else if (type === "MCQs" && choices) {
      const selectedOptions = selectedIndices.map((index) => choices[index]);
      setResult((prev) => ({ ...prev, [id]: selectedOptions }));
    } else if (type === "Dropdown" && dropdownSelection) {
      setResult((prev) => ({ ...prev, [id]: dropdownSelection.label }));
    }
    // Reset the states for next question
    setanswerIdx(null);
    setSelectedIndices([]);
    setInputAnswer("");
    setDropdownSelection(null);

    // Navigate to the next question, or if it's the last question, reset the question index and display the results
    if (currentQuestionIndex !== questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      setCurrentQuestionIndex(0);
      setShowResult(true);
    }
  };

  // Handler for when the "Back" button is clicked
  const handleBackClick = (): void => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }

    // Reset local states to default for the previous question
    setanswerIdx(null);
    setInputAnswer("");
    setDropdownSelection(null);
  };

  // Resets the quiz to its initial state
  const onTryAgain = (): void => {
    setShowResult(false);
  };

  // Updates inputAnswer state with the user's input for FillInTheBlank questions
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setInputAnswer(event.target.value);
  };

  /**
   * Determines if the "Next" button should be disabled based on:
   * 1. The type of the current question.
   * 2. The user's input or selections.
   * @returns A boolean indicating if the "Next" button should be disabled.
   */
  const isNextButtonDisabled = (): boolean => {
    const questionDetails = questions[currentQuestionIndex];
    const isRequired = questionDetails.required === "yes";

    if (!isRequired) return false;

    if (type === "FIB") {
      return !inputAnswer;
    } else if (type === "Dropdown") {
      return !dropdownSelection;
    } else if (type === "SCQs") {
      return answerIdx === null;
    } else if (type === "MCQs") {
      const maxSelection = questions[currentQuestionIndex]?.maxSelection ?? 0;
      return selectedIndices.length < maxSelection;
    }
    return true; // default case to make the button disabled
  };

  // Returning all states and functions to be for Quiz component
  return {
    currentQuestionIndex,
    answerIdx,
    result,
    showResult,
    inputAnswer,
    dropdownSelection,
    setDropdownSelection,
    selectedIndices,
    onAnswerClick,
    handleNextClick,
    handleBackClick,
    onTryAgain,
    handleInputChange,
    isNextButtonDisabled,
  };
};
