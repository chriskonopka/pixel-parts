import * as React from 'react';
import { render, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import CopyButton from './index';

jest.mock('@fluentui/react-icons', () => new Proxy({}, { get: () => () => null }));

expect.extend(toHaveNoViolations);

describe('CopyButton', () => {
  it('renders a button', () => {
    render(<CopyButton content="Some content to copy" />);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('renders button text when text prop is provided', () => {
    render(<CopyButton content="Copy me" text="Copy" />);
    expect(screen.getByText('Copy')).toBeInTheDocument();
  });

  it('has no accessibility violations', async () => {
    const { baseElement } = render(<CopyButton content="Accessible copy" text="Copy" />);
    const results = await axe(baseElement);
    expect(results).toHaveNoViolations();
  });
});
