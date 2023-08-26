import { useState } from "react";
import { resultInitialState } from "../../constants";
import Result from "../Result/Result";
import {
  TextField,
  Autocomplete,
  Checkbox,
  FormControlLabel,
  Button,
  Typography,
  Grid,
  Box,
} from "@mui/material";

const Quiz = ({ questions }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answerIdx, setanswerIdx] = useState(null);
  const [result, setResult] = useState(resultInitialState);
  const [showResult, setShowResult] = useState(false);
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
    setResult(resultInitialState);
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

  const getQuestionUI = () => {
    if (type === "FIB") {
      return (
        <Grid container justifyContent='center'>
          <Grid item xs={12} md={8}>
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
          sx={{ marginTop: 3, marginBottom: 3, width: 300 }}
          onChange={(event, newValue) => setDropdownSelection(newValue)}
          renderInput={(params) => (
            <TextField {...params} label={question.question} />
          )}
        />
      );
    } else if (type === "MCQs" || type === "SCQs") {
      const maxSelection = questions[currentQuestionIndex].maxSelection || 1;
      return (
        <Box component='ul' sx={{ listStyleType: "none", padding: 0 }}>
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
        </Box>
      );
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: 3,
        border: "1px solid",
        borderColor: "divider",
        width: ["90%", "80%", "70%", "60%"], // responsive widths based on breakpoints
        maxWidth: "800px", // or any other value that suits your design
        margin: "0 auto", // center the box
      }}>
      {!showResult ? (
        <>
          <Typography variant='h4' gutterBottom align='center'>
            {question}
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              width: "100%",
              mb: 3,
            }}>
            {getQuestionUI()}
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              width: "100%",
              mb: 2,
            }}>
            <Grid container justifyContent='space-between' spacing={2}>
              <Grid item xs={4}>
                <Button
                  variant='contained'
                  color='primary'
                  onClick={() => handleBackClick()}
                  disabled={currentQuestionIndex === 0}
                  fullWidth>
                  Back
                </Button>
              </Grid>
              <Grid item xs={4}>
                <Button
                  variant='contained'
                  color='primary'
                  onClick={() => handleNextClick()}
                  disabled={isNextButtonDisabled()}
                  fullWidth>
                  {currentQuestionIndex === questions.length - 1
                    ? "Finish"
                    : "Next"}
                </Button>
              </Grid>
            </Grid>
          </Box>
        </>
      ) : (
        <Result
          result={result}
          onTryAgain={onTryAgain}
          totalQuestions={questions.length}
        />
      )}
    </Box>
  );
};

export default Quiz;
