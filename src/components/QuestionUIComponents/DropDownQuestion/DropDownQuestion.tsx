import { Autocomplete, TextField } from "@mui/material";

const DropdownQuestion = ({ choices, setDropdownSelection }) => {
  return (
    <Autocomplete
      disablePortal
      id='dropdown-question'
      options={choices.map((choice) => ({ label: choice }))}
      sx={{ marginTop: 3, marginBottom: 3, width: 300 }}
      onChange={(event, newValue) => setDropdownSelection(newValue)}
      renderInput={(params) => (
        <TextField {...params} label='Dropdown Question' />
      )}
    />
  );
};

export default DropdownQuestion;
