import { Button, Typography, Box, Divider } from "@mui/material";
import { SUBMIT_QUIZ_RESULTS } from "../../graphql/mutations";
import { useMutation } from "@apollo/client";
import { ResultProps, SubmitQuizResultsResponse } from "../../types/types";

const Result: React.FC<ResultProps> = ({ result, onTryAgain, questions }) => {
  const [submitQuizResults, { loading, error }] =
    useMutation<SubmitQuizResultsResponse>(SUBMIT_QUIZ_RESULTS);

  const handleSubmitResults = async (): Promise<void> => {
    try {
      const transformedResults = Object.values(result).map((res, index) => ({
        questionId: index, // Or whatever ID represents the question
        answer: res,
      }));

      const response = await submitQuizResults({
        variables: { results: transformedResults },
      });

      if (response.data?.submitQuizResults.success) {
        alert(response.data.submitQuizResults.message);
      } else {
        alert("Error submitting results!");
      }
    } catch (err) {
      console.error("Failed to submit results:", err);
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
      <Typography variant='h4' gutterBottom>
        Result
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "start",
          width: "100%",
          mb: 3,
        }}>
        {questions.map((question) => (
          <Box key={question.id} sx={{ mb: 2 }}>
            <Typography variant='h6' gutterBottom>
              Question: {question.question}
            </Typography>
            <Typography
              variant='body1'
              sx={{ color: result[question.id] ? "green" : "red" }}>
              Your Answer:{" "}
              {Array.isArray(result[question.id])
                ? (result[question.id] as string[])?.join(", ") // Join selected answers with commas and spaces
                : result[question.id] || "Not answered"}{" "}
              {/* Handle possible null */}
            </Typography>
          </Box>
        ))}
      </Box>
      <Divider sx={{ mb: 2, width: "100%" }} />
      <Button variant='contained' color='primary' onClick={onTryAgain}>
        Try again
      </Button>
      <Button
        variant='contained'
        color='secondary'
        sx={{ mt: 2 }}
        onClick={handleSubmitResults}
        disabled={loading} // Disable the button while the mutation is in progress
      >
        Submit
      </Button>
      {error && (
        <Typography color='error'>Error submitting results!</Typography>
      )}
    </Box>
  );
};

export default Result;
