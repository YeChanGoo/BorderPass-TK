import { Autocomplete, TextField } from "@mui/material";
import { DropdownQuestionProps } from "../../../types/types";

// Renders dropdown input field questions
const DropdownQuestion: React.FC<DropdownQuestionProps> = ({
  choices = [],
  dropdownSelection,
  setDropdownSelection,
}) => {
  return (
    <Autocomplete
      value={dropdownSelection || null}
      disablePortal
      id='dropdown-question'
      options={choices.map((choice) => ({ label: choice }))}
      sx={{ marginTop: 3, marginBottom: 3, width: 300 }}
      onChange={(_event, newValue) => {
        // Set the selected dropdown option when an option is chosen
        if (newValue) {
          setDropdownSelection({
            label: newValue.label,
            value: newValue.label,
          });
        } else {
          // Clear the selected dropdown option when the selection is removed
          setDropdownSelection(null);
        }
      }}
      // Determine if an option is equal to the current value
      isOptionEqualToValue={(option, value) => option.label === value.label}
      renderInput={(params) => (
        <TextField {...params} label='Dropdown Question' />
      )}
    />
  );
};

export default DropdownQuestion;
