import * as React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe, toHaveNoViolations } from 'jest-axe';
import Checkbox from './index';

expect.extend(toHaveNoViolations);

describe('Checkbox', () => {
  it('renders label', () => {
    render(<Checkbox id="cb1" label="Accept terms" checked={false} onChange={() => {}} />);
    expect(screen.getByLabelText('Accept terms')).toBeInTheDocument();
  });

  it('calls onChange when clicked', async () => {
    const user = userEvent.setup();
    const handleChange = jest.fn();
    render(<Checkbox id="cb2" label="Subscribe" checked={false} onChange={handleChange} />);
    await user.click(screen.getByLabelText('Subscribe'));
    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  it('renders as disabled', () => {
    render(<Checkbox id="cb3" label="Disabled option" checked={false} onChange={() => {}} disabled />);
    expect(screen.getByLabelText('Disabled option')).toBeDisabled();
  });

  it('has no accessibility violations', async () => {
    const { container } = render(
      <Checkbox id="cb4" label="Accessible checkbox" checked={false} onChange={() => {}} />
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
