import { Button, Typography, Box, Divider } from "@mui/material";
import { SUBMIT_QUIZ_RESULTS } from "../../graphql/mutations";
import { useMutation } from "@apollo/client";
import { ResultProps, SubmitQuizResultsResponse } from "../../types/types";

// Display results of quiz to user
const Result: React.FC<ResultProps> = ({ result, onTryAgain, questions }) => {
  // Use useMutation hook to submit quiz results
  const [submitQuizResults, { loading, error }] =
    useMutation<SubmitQuizResultsResponse>(SUBMIT_QUIZ_RESULTS);

  // Handler for quiz submission
  const handleSubmitResults = async (): Promise<void> => {
    try {
      // Transform the results object into an array suitable for the GraphQL mutation
      const transformedResults = Object.values(result).map((res, index) => ({
        questionId: index,
        answer: res,
      }));

      // Submitting the results
      const response = await submitQuizResults({
        variables: { results: transformedResults },
      });

      // Alert the user based on the response
      if (response.data?.submitQuizResults.success) {
        alert(response.data.submitQuizResults.message);
      } else {
        alert("Error submitting results!");
      }
    } catch (err) {
      console.error("Failed to submit results:", err);
    }
  };

  // Render the results UI
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: 3,
        border: "1px solid",
        borderColor: "divider",
        width: ["90%", "80%", "70%", "60%"],
        maxWidth: "800px",
        margin: "0 auto",
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
        {/* Map through questions and display them with the user's answer */}
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
            </Typography>
          </Box>
        ))}
      </Box>
      <Divider sx={{ mb: 2, width: "100%" }} />
      {/* "Try Again" button to retake the quiz */}
      <Button variant='contained' color='primary' onClick={onTryAgain}>
        Try again
      </Button>
      {/* "Submit" button to send the results */}
      <Button
        variant='contained'
        color='secondary'
        sx={{ mt: 2 }}
        onClick={handleSubmitResults}
        disabled={loading} // Disable the button while the mutation is in progress
      >
        Submit
      </Button>
      {/* Error message if there was an error in submitting the results */}
      {error && (
        <Typography color='error'>Error submitting results!</Typography>
      )}
    </Box>
  );
};

export default Result;
