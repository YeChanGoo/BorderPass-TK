import { render, screen, fireEvent } from "@testing-library/react";
import FillInTheBlank from "./FillInTheBlank";
import "@testing-library/jest-dom";

describe("FillInTheBlank component", () => {
  // Rendering the TextField
  test("renders the TextField correctly", () => {
    render(<FillInTheBlank inputAnswer='' handleInputChange={() => {}} />);

    const textField = screen.getByTestId("text-field");
    expect(textField).toBeInTheDocument();
  });

  // User Input
  test("capturing user input", () => {
    const handleInputChange = jest.fn();

    render(
      <FillInTheBlank inputAnswer='' handleInputChange={handleInputChange} />
    );

    const inputElement = screen
      .getByTestId("text-field")
      .querySelector("input") as HTMLInputElement;
    fireEvent.change(inputElement, { target: { value: "test input" } });

    expect(handleInputChange).toHaveBeenCalled();
  });
});
