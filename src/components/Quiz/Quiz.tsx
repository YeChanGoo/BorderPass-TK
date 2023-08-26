import { useEffect, useState } from "react";
import { resultInitialState } from "../../constants";
import "./Quiz.scss";
// import AnswerTimer from "../AnswerTimer/AnswerTimer";
import Result from "../Result/Result";

const Quiz = ({ questions }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answerIdx, setanswerIdx] = useState(null);
  // const [answer, setAnswer] = useState(null);
  const [result, setResult] = useState(resultInitialState);
  const [showResult, setShowResult] = useState(false);
  const [showAnswerTimer, setShowAnswerTimer] = useState(true);
  const [inputAnswer, setInputAnswer] = useState("");
  const { id, question, choices, type } = questions[currentQuestionIndex];

  const onAnswerClick = (index) => {
    setanswerIdx(index);
    // if (answer === correctAnswer) {
    //   setAnswer(true);
    // } else {
    //   setAnswer(false);
    // }
  };

  const onClickNext = () => {
    if (type === "FIB") {
      console.log("prev FIB", inputAnswer);
      setResult((prev) => ({ ...prev, [id]: inputAnswer }));
      console.log("FIB", result);
    } else if (type === "MCQs") {
      setResult((prev) => ({ ...prev, [id]: choices[answerIdx] }));
      console.log("MCQs", result);
    }
    setanswerIdx(null);
    setShowAnswerTimer(false);
    setInputAnswer("");

    if (currentQuestionIndex !== questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      setCurrentQuestionIndex(0);
      setShowResult(true);
    }

    // setTimeout(() => {
    //   setShowAnswerTimer(true);
    // });
  };

  const onClickBack = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }

    // Reset states if needed, for instance:
    setanswerIdx(null);
    setInputAnswer("");
    setShowAnswerTimer(true);
    // ... any other state resets or operations you need.
  };

  const onTryAgain = () => {
    setResult(resultInitialState);
    setShowResult(false);
  };

  // const handleTimeUp = () => {
  //   setAnswer(false);
  //   onClickNext(false);
  // };

  const handleInputChange = (event) => {
    setInputAnswer(event.target.value);

    // if (event.target.value === correctAnswer) {
    //   setAnswer(true);
    // } else {
    //   setAnswer(false);
    // }
  };

  const getAnswerUI = () => {
    if (type === "FIB") {
      return <input value={inputAnswer} onChange={handleInputChange} />;
    }
    return (
      <ul>
        {choices.map((options, index) => (
          <li
            onClick={() => onAnswerClick(index)}
            key={options}
            className={answerIdx === index ? "selected-option" : null}>
            {options}
          </li>
        ))}
      </ul>
    );
  };

  //remembering past answers
  // useEffect(() => {
  //   if (questions[currentQuestionIndex].type === "MCQs") {
  //     const previousAnswer = result[questions[currentQuestionIndex].id];
  //     const previousAnswerIndex =
  //       questions[currentQuestionIndex].choices.indexOf(previousAnswer);
  //     setanswerIdx(previousAnswerIndex);
  //   } else if (questions[currentQuestionIndex].type === "FIB") {
  //     const previousAnswer = result[questions[currentQuestionIndex].id];
  //     setInputAnswer(previousAnswer || "");
  //   }
  // }, [currentQuestionIndex, questions, result]);

  return (
    <div className='quiz-container'>
      {!showResult ? (
        <>
          {/* {showAnswerTimer && (
            <AnswerTimer duration={10} onTimeUp={handleTimeUp} />
          )} */}
          <span className='active-question-no'>{currentQuestionIndex + 1}</span>
          <span className='total-question'>/{questions.length}</span>
          <h2>{question}</h2>
          {getAnswerUI()}
          <div className='buttons'>
            <div className='back-button'>
              <button
                onClick={() => onClickBack()}
                disabled={currentQuestionIndex === 0}>
                Back
              </button>
            </div>
            <div className='next-button'>
              <button
                onClick={() => onClickNext()}
                disabled={answerIdx === null && !inputAnswer}>
                {currentQuestionIndex === questions.length - 1
                  ? "Finish"
                  : "Next"}
              </button>
            </div>
          </div>
        </>
      ) : (
        <Result
          result={result}
          onTryAgain={onTryAgain}
          totalQuestions={questions.length}
        />
      )}
    </div>
  );
};

export default Quiz;
