/** @format - prettier */

import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import App, { replaceCamelWithSpaces } from "./App";

afterEach(cleanup);

test("button has correct initial color", () => {
  render(<App />);

  //find an element with role of button and text 'Change to MidnightBlue'
  const colorButton = screen.getByRole("button", {
    name: "Change to Midnight Blue",
  });

  //expect the background color to be MediumVioletRed
  expect(colorButton).toHaveStyle({ backgroundColor: "MediumVioletRed" });

  //click button
  fireEvent.click(colorButton);

  //expect the background color to change to MidnightBlue
  expect(colorButton).toHaveStyle({ backgroundColor: "MidnightBlue" });

  //expect the button text to be 'Change to MediumVioletRed'
  expect(colorButton).toHaveTextContent("Change to Medium Violet Red");
});

test("initial conditions", () => {
  render(<App />);

  //button is enabled
  const colorButton = screen.getByRole("button", {
    name: "Change to Midnight Blue",
  });
  expect(colorButton).toBeEnabled();

  //checkbox starts unchecked
  const checkbox = screen.getByRole("checkbox", { name: "Disable button" });
  expect(checkbox).not.toBeChecked();
});

test("checkbox disables and enables button", () => {
  render(<App />);
  const checkbox = screen.getByRole("checkbox", { name: "Disable button" });
  const colorButton = screen.getByRole("button", {
    name: "Change to Midnight Blue",
  });

  //after first click button is disabled
  fireEvent.click(checkbox);
  expect(colorButton).toBeDisabled();

  //after second click button is re-enabled
  fireEvent.click(checkbox);
  expect(colorButton).toBeEnabled();
});

test("button is gray after being disabled", () => {
  render(<App />);
  const checkbox = screen.getByRole("checkbox", { name: "Disable button" });
  const colorButton = screen.getByRole("button", {
    name: "Change to Midnight Blue",
  });

  //after first click button is disabled
  fireEvent.click(checkbox);
  expect(colorButton).toHaveStyle({ backgroundColor: "gray" });

  //after second click button is re-enabled
  fireEvent.click(checkbox);
  expect(colorButton).toHaveStyle({ backgroundColor: "MediumVioletRed" });
});

test("after button changes color and is disabled it is gray", () => {
  render(<App />);
  const checkbox = screen.getByRole("checkbox", { name: "Disable button" });
  const colorButton = screen.getByRole("button", {
    name: "Change to Midnight Blue",
  });

  fireEvent.click(colorButton);
  fireEvent.click(checkbox);

  expect(colorButton).toHaveStyle({ backgroundColor: "gray" });

  fireEvent.click(checkbox);

  expect(colorButton).toHaveStyle({ backgroundColor: "MidnightBlue" });
});

describe("spaces before camel-case capital letters", () => {
  test("Works for no inner capital letters", () => {
    expect(replaceCamelWithSpaces("Red")).toBe("Red");
  });

  test("Works for one inner capital letter", () => {
    expect(replaceCamelWithSpaces("MidnightBlue")).toBe("Midnight Blue");
  });

  test("Works for multiple inner capital letters", () => {
    expect(replaceCamelWithSpaces("MediumVioletRed")).toBe("Medium Violet Red");
  });
});
