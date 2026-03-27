import * as React from 'react';
import { render, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import AccessWarning from './index';

jest.mock('@fluentui/react-icons', () => new Proxy({}, { get: () => () => null }));

expect.extend(toHaveNoViolations);

describe('AccessWarning', () => {
  it('renders platformTitle in the warning message', () => {
    render(<AccessWarning platformTitle="Salesforce" />);
    expect(screen.getByText(/Salesforce/)).toBeInTheDocument();
  });

  it('renders a Request Access link', () => {
    render(<AccessWarning platformTitle="Jira" requestAccessUrl="https://example.com/access" />);
    const link = screen.getByRole('link', { name: 'Request Access' });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', 'https://example.com/access');
  });

  it('has no accessibility violations', async () => {
    const { container } = render(<AccessWarning platformTitle="ServiceNow" />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
