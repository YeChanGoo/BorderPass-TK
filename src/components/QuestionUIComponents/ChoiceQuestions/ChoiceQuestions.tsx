import { Checkbox, Radio, FormControlLabel, Box } from "@mui/material";
import { ChoiceQuestionProps } from "../../../types/types";
import React from "react";

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
      {choices.map((option, index) => (
        <li key={option}>
          <FormControlLabel
            control={
              type === "MCQs" ? (
                <Checkbox
                  checked={selectedIndices.includes(index)}
                  onChange={() => onAnswerClick(index)}
                  disabled={
                    type === "MCQs" &&
                    !selectedIndices.includes(index) &&
                    selectedIndices.length >= (maxSelection ?? Infinity)
                  }
                />
              ) : (
                <Radio
                  checked={answerIdx === index}
                  onChange={() => onAnswerClick(index)}
                  name='single-choice-question'
                />
              )
            }
            label={option}
          />
        </li>
      ))}
    </Box>
  );
};

export default ChoiceQuestions;
