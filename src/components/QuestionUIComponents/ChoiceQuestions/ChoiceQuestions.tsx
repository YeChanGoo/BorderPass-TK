import { Checkbox, Radio, FormControlLabel, Box } from "@mui/material";
import { ChoiceQuestionProps } from "../../../types/types";
import React from "react";

// Renders multiple-choice and single-choice questions
const ChoiceQuestions: React.FC<ChoiceQuestionProps> = ({
  type,
  choices = [],
  onAnswerClick,
  answerIdx,
  selectedIndices,
  maxSelection,
}) => {
  return (
    <Box component='ul' sx={{ listStyleType: "none", padding: 0 }}>
      {/* Map through each answer option and render corresponding UI */}
      {choices.map((option, index) => (
        <li key={option}>
          <FormControlLabel
            control={
              type === "MCQs" ? (
                // Checkbox for multiple-choice questions
                <Checkbox
                  checked={selectedIndices.includes(index)}
                  onChange={() => onAnswerClick(index)}
                  disabled={
                    // Disable the checkbox if maximum selection limit is reached
                    type === "MCQs" &&
                    !selectedIndices.includes(index) &&
                    selectedIndices.length >= (maxSelection ?? Infinity)
                  }
                />
              ) : (
                // Radio button for single-choice questions
                <Radio
                  checked={answerIdx === index}
                  onChange={() => onAnswerClick(index)}
                  name='single-choice-question'
                />
              )
            }
            label={option} // Display the answer option text
          />
        </li>
      ))}
    </Box>
  );
};

export default ChoiceQuestions;
