import { TextField, Grid } from "@mui/material";

const FillInTheBlank = ({ inputAnswer, handleInputChange }) => {
  return (
    <Grid container justifyContent='center'>
      <Grid item xs={12} md={8}>
        <TextField
          variant='outlined'
          value={inputAnswer}
          onChange={handleInputChange}
          label='Your Answer'
          fullWidth
          sx={{ marginTop: 3, marginBottom: 3 }}
        />
      </Grid>
    </Grid>
  );
};

export default FillInTheBlank;
