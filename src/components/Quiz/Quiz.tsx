import { useEffect, useState } from "react";
import { resultInitialState } from "../../constants";
// import "./Quiz.scss";
// import AnswerTimer from "../AnswerTimer/AnswerTimer";
import Result from "../Result/Result";
import { TextField } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import { Checkbox, FormControlLabel } from "@mui/material";
import { Button, Typography, Grid } from "@mui/material";

const Quiz = ({ questions }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answerIdx, setanswerIdx] = useState(null);
  // const [answer, setAnswer] = useState(null);
  const [result, setResult] = useState(resultInitialState);
  const [showResult, setShowResult] = useState(false);
  // const [showAnswerTimer, setShowAnswerTimer] = useState(true);
  const [inputAnswer, setInputAnswer] = useState("");
  const { id, question, choices, type } = questions[currentQuestionIndex];
  const [dropdownSelection, setDropdownSelection] = useState(null);
  // multiple checkboxes for MCQs
  const [selectedIndices, setSelectedIndices] = useState([]);

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
    setDropdownSelection(null);

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

  const getAnswerUI = () => {
    if (type === "FIB") {
      return (
        <Grid container justifyContent='center'>
          <Grid item xs={12} md={8}>
            {" "}
            {/* Adjust the sizes (xs, md, etc.) as you see fit */}
            <TextField
              variant='outlined'
              value={inputAnswer}
              onChange={handleInputChange}
              label='Your Answer'
              fullWidth // This will ensure the TextField takes the full width of its container (the Grid item)
              sx={{ marginTop: 3, marginBottom: 3 }} // You can adjust these values as needed
            />
          </Grid>
        </Grid>
      );
    } else if (type === "Dropdown") {
      return (
        <Autocomplete
          disablePortal
          id='dropdown-question'
          options={choices.map((choice) => ({ label: choice }))}
          sx={{ width: 400 }}
          onChange={(event, newValue) => setDropdownSelection(newValue)}
          renderInput={(params) => (
            <TextField {...params} label={question.question} />
          )}
        />
      );
    } else if (type === "MCQs" || type === "SCQs") {
      const maxSelection = questions[currentQuestionIndex].maxSelection || 1;
      return (
        <ul>
          {choices.map((options, index) => (
            <li key={options}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={
                      type === "MCQs"
                        ? selectedIndices.includes(index)
                        : answerIdx === index
                    }
                    onChange={() => onAnswerClick(index)}
                    disabled={
                      type === "MCQs" &&
                      !selectedIndices.includes(index) &&
                      selectedIndices.length >= maxSelection
                    }
                  />
                }
                label={options}
              />
            </li>
          ))}
        </ul>
      );
    }
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
    <Grid container spacing={3} justifyContent='center'>
      <Grid item xs={12} md={8} lg={6}>
        <div className='quiz-container'>
          {!showResult ? (
            <>
              {/* {showAnswerTimer && (
                            <AnswerTimer duration={10} onTimeUp={handleTimeUp} />
                        )} */}
              <span className='active-question-no'>
                {currentQuestionIndex + 1}
              </span>
              <span className='total-question'>/{questions.length}</span>
              <Typography variant='h4' align='center'>
                {question}{" "}
                {questions[currentQuestionIndex].required === "no" &&
                  "(Optional)"}
              </Typography>
              {getAnswerUI()}
              <Grid
                container
                className='buttons'
                justifyContent='space-between'
                spacing={2}>
                <Grid item xs={4}>
                  <Button
                    variant='contained'
                    color='primary'
                    onClick={() => onClickBack()}
                    disabled={currentQuestionIndex === 0}
                    fullWidth>
                    Back
                  </Button>
                </Grid>
                <Grid item xs={4}>
                  <Button
                    variant='contained'
                    color='primary'
                    onClick={() => onClickNext()}
                    disabled={isNextButtonDisabled()}
                    fullWidth>
                    {currentQuestionIndex === questions.length - 1
                      ? "Finish"
                      : "Next"}
                  </Button>
                </Grid>
              </Grid>
            </>
          ) : (
            <Result
              result={result}
              onTryAgain={onTryAgain}
              totalQuestions={questions.length}
            />
          )}
        </div>
      </Grid>
    </Grid>
  );
};

export default Quiz;
