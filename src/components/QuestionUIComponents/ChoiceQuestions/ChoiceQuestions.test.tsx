import { render, screen, fireEvent } from "@testing-library/react";
import ChoiceQuestions from "./ChoiceQuestions";

describe("ChoiceQuestions component", () => {
  const choices = ["Option 1", "Option 2", "Option 3"];

  describe("Checkboxes", () => {
    // Rendering Checkboxes
    test("checking render for MCQs", () => {
      render(
        <ChoiceQuestions
          type='MCQs'
          choices={choices}
          onAnswerClick={jest.fn()}
          selectedIndices={[]}
        />
      );
      const checkboxes = screen.getAllByRole("checkbox");
      expect(checkboxes).toHaveLength(3);
    });
    // Click Event for Checkboxes
    test("clicking updates state for checkboxes", () => {
      const mockOnAnswerClick = jest.fn();
      render(
        <ChoiceQuestions
          type='MCQs'
          choices={choices}
          onAnswerClick={mockOnAnswerClick}
          selectedIndices={[]}
        />
      );
      const checkbox = screen.getAllByRole("checkbox")[0];
      fireEvent.click(checkbox);
      expect(mockOnAnswerClick).toHaveBeenCalledWith(0);
    });
    // Disabling Checkbox with maxSelection
    test("checkboxes are disabled after maxSelection is reached", () => {
      const mockOnAnswerClick = jest.fn();
      render(
        <ChoiceQuestions
          type='MCQs'
          choices={choices}
          onAnswerClick={mockOnAnswerClick}
          selectedIndices={[0]}
          maxSelection={1}
        />
      );
      const checkboxes = screen.getAllByRole("checkbox");
      expect((checkboxes[1] as HTMLInputElement).disabled).toBe(true);
      expect((checkboxes[2] as HTMLInputElement).disabled).toBe(true);
    });
  });

  describe("Radio Buttons", () => {
    // Rendering Radios
    test("checking render for SCQs", () => {
      render(
        <ChoiceQuestions
          type='SCQs'
          choices={choices}
          onAnswerClick={jest.fn()}
          selectedIndices={[]}
        />
      );
      const radioButtons = screen.getAllByRole("radio");
      expect(radioButtons).toHaveLength(3);
    });
    // Radio click event
    test("clicking a radio button updates state", () => {
      const mockOnAnswerClick = jest.fn();
      render(
        <ChoiceQuestions
          type='SCQs'
          choices={choices}
          onAnswerClick={mockOnAnswerClick}
          selectedIndices={[]}
        />
      );
      const radioButton = screen.getAllByRole("radio")[0];
      fireEvent.click(radioButton);
      expect(mockOnAnswerClick).toHaveBeenCalledWith(0);
    });
  });
});
