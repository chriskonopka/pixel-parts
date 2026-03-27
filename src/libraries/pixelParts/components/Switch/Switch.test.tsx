import * as React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe, toHaveNoViolations } from 'jest-axe';
import Switch from './index';

expect.extend(toHaveNoViolations);

describe('Switch', () => {
  it('renders a switch button', () => {
    render(<Switch label="Enable feature" />);
    expect(screen.getByRole('switch')).toBeInTheDocument();
  });

  it('calls onChange when clicked', async () => {
    const user = userEvent.setup();
    const handleChange = jest.fn();
    render(<Switch label="Toggle me" onChange={handleChange} />);
    await user.click(screen.getByRole('switch'));
    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(handleChange).toHaveBeenCalledWith(true);
  });

  it('is disabled when disabled prop is true', () => {
    render(<Switch label="Disabled switch" disabled />);
    expect(screen.getByRole('switch')).toBeDisabled();
  });

  it('has no accessibility violations', async () => {
    // Provide an id so the component renders a <label> wrapping the button,
    // giving the switch an accessible name via the label element.
    const { container } = render(<Switch id="accessible-switch" label="Accessible switch" />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
