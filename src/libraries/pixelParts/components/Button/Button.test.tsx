import * as React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe, toHaveNoViolations } from 'jest-axe';
import Button from './index';

expect.extend(toHaveNoViolations);

describe('Button', () => {
  it('renders button text', () => {
    render(<Button text="Click me" />);
    expect(screen.getByRole('button', { name: 'Click me' })).toBeInTheDocument();
  });

  it('calls onClick when clicked', async () => {
    const handleClick = jest.fn();
    render(<Button text="Click me" onClick={handleClick} />);
    await userEvent.click(screen.getByRole('button', { name: 'Click me' }));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('is disabled when disabled prop is true', () => {
    render(<Button text="Disabled" disabled />);
    expect(screen.getByRole('button', { name: 'Disabled' })).toBeDisabled();
  });

  it('has no accessibility violations', async () => {
    const { container } = render(<Button text="Accessible button" />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
