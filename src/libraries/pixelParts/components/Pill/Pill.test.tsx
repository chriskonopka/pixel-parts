import * as React from 'react';
import { render, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import Pill from './index';

expect.extend(toHaveNoViolations);

describe('Pill', () => {
  it('renders text', () => {
    render(<Pill color="blue" darkMode={false} text="Beta" />);
    expect(screen.getByText('Beta')).toBeInTheDocument();
  });

  it('is a button when clickable=true', () => {
    render(<Pill color="blue" darkMode={false} text="Clickable Pill" clickable={true} />);
    expect(screen.getByRole('button', { name: 'Clickable Pill' })).toBeInTheDocument();
  });

  it('is not a button when clickable=false', () => {
    render(<Pill color="green" darkMode={false} text="Static Pill" clickable={false} />);
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
    expect(screen.getByText('Static Pill')).toBeInTheDocument();
  });

  it('has no accessibility violations', async () => {
    const { container } = render(<Pill color="purple" darkMode={false} text="Accessible Pill" />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
