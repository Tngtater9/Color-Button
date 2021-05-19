import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import App from './App';

afterEach(cleanup);

test('button has correct initial color', () => {
  render(<App />);

  //find an element with role of button and text 'Change to blue'
  const colorButton = screen.getByRole('button', { name: 'Change to blue' });

  //expect the background color to be red
  expect(colorButton).toHaveStyle({ backgroundColor: 'red' });

  //click button
  fireEvent.click(colorButton);

  //expect the background color to change to blue
  expect(colorButton).toHaveStyle({backgroundColor: 'blue'});

  //expect the button text to be 'Change to red'
  expect(colorButton.textContent).toBe('Change to red');
});

test('initial conditions', () => {
  render(<App />);

  //button is enabled
  const colorButton = screen.getByRole('button', { name: 'Change to blue' });
  expect(colorButton).toBeEnabled();

  //checkbox starts unchecked
  const checkbox = screen.getByRole('checkbox', { name: 'Disable button' });
  expect(checkbox).not.toBeChecked();
})

test('checkbox disables and enables button', () => {
  render(<App />);
  const checkbox = screen.getByRole('checkbox', { name: 'Disable button' });
  const colorButton = screen.getByRole('button', { name: 'Change to blue' });

  //after first click button is disabled
  fireEvent.click(checkbox);
  expect(colorButton).toBeDisabled();
  
  //after second click button is re-enabled
  fireEvent.click(checkbox);
  expect(colorButton).toBeEnabled();
})