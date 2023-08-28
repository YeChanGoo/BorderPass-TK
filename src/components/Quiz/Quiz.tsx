import Result from "../Result/Result";
import { Button, Typography, Grid, Box } from "@mui/material";
import FillInTheBlank from "../QuestionUIComponents/FillInTheBlank/FillInTheBlank";
import DropdownQuestion from "../QuestionUIComponents/DropDownQuestion/DropDownQuestion";
import ChoiceQuestions from "../QuestionUIComponents/ChoiceQuestions/ChoiceQuestions";
import { useQuiz } from "../../hooks/Hooks";
import {
  Questions,
  QuizProps,
  BackButtonProps,
  NextButtonProps,
} from "../../types/types";
import { ReactNode } from "react";

const Quiz: React.FC<QuizProps> = ({ questions }) => {
  const {
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
  } = useQuiz(questions);

  const BackButton: React.FC<BackButtonProps> = ({ onClick, disabled }) => (
    <Grid item xs={4}>
      <Button
        variant='contained'
        color='primary'
        onClick={onClick}
        disabled={disabled}
        fullWidth>
        Back
      </Button>
    </Grid>
  );

  const NextButton: React.FC<NextButtonProps> = ({
    onClick,
    disabled,
    isLastQuestion,
  }) => (
    <Grid item xs={4}>
      <Button
        variant='contained'
        color='primary'
        onClick={onClick}
        disabled={disabled}
        fullWidth>
        {isLastQuestion ? "Finish" : "Next"}
      </Button>
    </Grid>
  );

  const renderQuestion = (type: string, question: Questions): ReactNode => {
    switch (type) {
      case "FIB":
        return (
          <FillInTheBlank
            inputAnswer={inputAnswer}
            handleInputChange={handleInputChange}
          />
        );
      case "Dropdown":
        return (
          <DropdownQuestion
            choices={question.choices}
            dropdownSelection={dropdownSelection}
            setDropdownSelection={setDropdownSelection}
          />
        );
      case "MCQs":
      case "SCQs":
        return (
          <Box component='ul' sx={{ listStyleType: "none", padding: 0 }}>
            <ChoiceQuestions
              type={type}
              choices={question.choices}
              answerIdx={answerIdx}
              onAnswerClick={onAnswerClick}
              selectedIndices={selectedIndices}
              maxSelection={questions[currentQuestionIndex].maxSelection}
            />
          </Box>
        );
      default:
        return null;
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
            {questions[currentQuestionIndex].question}
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              width: "100%",
              mb: 3,
            }}>
            {renderQuestion(
              questions[currentQuestionIndex].type,
              questions[currentQuestionIndex]
            )}
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
              <BackButton
                onClick={handleBackClick}
                disabled={currentQuestionIndex === 0}
              />
              <NextButton
                onClick={handleNextClick}
                disabled={isNextButtonDisabled()}
                isLastQuestion={currentQuestionIndex === questions.length - 1}
              />
            </Grid>
          </Box>
        </>
      ) : (
        <Result result={result} onTryAgain={onTryAgain} questions={questions} />
      )}
    </Box>
  );
};

export default Quiz;
