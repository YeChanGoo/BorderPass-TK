import { useState } from "react";

export const useQuiz = (questions) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answerIdx, setanswerIdx] = useState(null);
  const [result, setResult] = useState({}); // Note: you might want to provide a better default state
  const [showResult, setShowResult] = useState(false);
  const [inputAnswer, setInputAnswer] = useState("");
  const [dropdownSelection, setDropdownSelection] = useState(null);
  const [selectedIndices, setSelectedIndices] = useState([]);
  const { id, question, choices, type } = questions[currentQuestionIndex];

  // ... all your other logic and handlers from Quiz component ...
  const onAnswerClick = (index) => {
    if (type === "MCQs") {
      // Toggle the selected state of checkboxes for MCQs
      if (selectedIndices.includes(index)) {
        setSelectedIndices((prev) => prev.filter((idx) => idx !== index));
      } else {
        setSelectedIndices((prev) => [...prev, index]);
      }
    } else {
      setanswerIdx(index);
    }
  };

  const handleNextClick = () => {
    if (type === "FIB") {
      console.log("prev FIB", inputAnswer);
      setResult((prev) => ({ ...prev, [id]: inputAnswer }));
    } else if (type === "SCQs") {
      setResult((prev) => ({ ...prev, [id]: choices[answerIdx] }));
    } else if (type === "MCQs") {
      const selectedOptions = selectedIndices.map((index) => choices[index]);
      setResult((prev) => ({ ...prev, [id]: selectedOptions }));
    } else if (type === "Dropdown") {
      setResult((prev) => ({ ...prev, [id]: dropdownSelection.label }));
    }
    setanswerIdx(null);
    setSelectedIndices([]);
    setInputAnswer("");
    setDropdownSelection(null);

    if (currentQuestionIndex !== questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      setCurrentQuestionIndex(0);
      setShowResult(true);
    }
  };

  const handleBackClick = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }

    // Reset states if needed, for instance:
    setanswerIdx(null);
    setInputAnswer("");
    setDropdownSelection(null);
  };

  const onTryAgain = () => {
    setShowResult(false);
  };

  const handleInputChange = (event) => {
    setInputAnswer(event.target.value);
  };

  const isNextButtonDisabled = () => {
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
      const maxSelection = questions[currentQuestionIndex].maxSelection;
      return selectedIndices.length < maxSelection;
    }
    return true; // default case to make the button disabled
  };

  return {
    currentQuestionIndex,
    answerIdx,
    result,
    showResult,
    inputAnswer,
    setDropdownSelection, // <-- Add this
    selectedIndices,
    onAnswerClick,
    handleNextClick,
    handleBackClick,
    onTryAgain,
    handleInputChange,
    isNextButtonDisabled,
  };
};
