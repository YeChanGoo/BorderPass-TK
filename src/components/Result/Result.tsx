import { Button, Typography, Box, Divider } from "@mui/material";

const Result = ({ totalQuestions, result, onTryAgain }) => {
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
        {Object.values(result).map((res, index) => (
          <Box key={index} sx={{ mb: 1 }}>
            <Typography variant='body1'>{res}</Typography>
          </Box>
        ))}
      </Box>
      <Divider sx={{ mb: 2, width: "100%" }} />
      <Button variant='contained' color='primary' onClick={onTryAgain}>
        Try again
      </Button>
    </Box>
  );
};

export default Result;
