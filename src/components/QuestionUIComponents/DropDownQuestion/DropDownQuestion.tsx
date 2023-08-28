import { Autocomplete, TextField } from "@mui/material";
import { DropdownQuestionProps } from "../../../types/types";

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
        if (newValue) {
          setDropdownSelection({
            label: newValue.label,
            value: newValue.label,
          });
        } else {
          setDropdownSelection(null);
        }
      }}
      isOptionEqualToValue={(option, value) => option.label === value.label}
      renderInput={(params) => (
        <TextField {...params} label='Dropdown Question' />
      )}
    />
  );
};

export default DropdownQuestion;
