import { TextField, Grid } from "@mui/material";
import { FillInTheBlankProps } from "../../../types/types";

// Renders text input field for users
const FillInTheBlank: React.FC<FillInTheBlankProps> = ({
  inputAnswer,
  handleInputChange,
}) => {
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
          data-testid='text-field'
        />
      </Grid>
    </Grid>
  );
};

export default FillInTheBlank;
