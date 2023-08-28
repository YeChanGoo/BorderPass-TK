import { render, screen, fireEvent } from "@testing-library/react";
import DropdownQuestion from "./DropDownQuestion";

describe("DropdownQuestion component", () => {
  test("selects an option from the Autocomplete dropdown", () => {
    const mockSetDropdownSelection = jest.fn();
    const choices = ["Option 1", "Option 2", "Option 3"];

    render(
      <DropdownQuestion
        choices={choices}
        dropdownSelection={null}
        setDropdownSelection={mockSetDropdownSelection}
      />
    );

    // Opening dropdown
    const autoCompleteInput = screen.getByRole("combobox");
    fireEvent.mouseDown(autoCompleteInput);

    // Select Option 2" from the dropdown
    const listItem = screen.getByText("Option 2");
    fireEvent.click(listItem);

    // Check for correct value
    expect(mockSetDropdownSelection).toHaveBeenCalledWith({
      label: "Option 2",
      value: "Option 2",
    });
  });
});
