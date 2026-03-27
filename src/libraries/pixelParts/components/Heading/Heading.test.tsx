import * as React from 'react';
import { render, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import Heading from './index';

expect.extend(toHaveNoViolations);

describe('Heading', () => {
  it('renders children text', () => {
    render(<Heading>My Heading</Heading>);
    expect(screen.getByText('My Heading')).toBeInTheDocument();
  });

  it('renders as h1 by default', () => {
    render(<Heading>Default Heading</Heading>);
    expect(screen.getByRole('heading', { level: 1, name: 'Default Heading' })).toBeInTheDocument();
  });

  it('renders as h2 when as="h2"', () => {
    render(<Heading as="h2">Level Two</Heading>);
    expect(screen.getByRole('heading', { level: 2, name: 'Level Two' })).toBeInTheDocument();
  });

  it('renders as h3 when as="h3"', () => {
    render(<Heading as="h3">Level Three</Heading>);
    expect(screen.getByRole('heading', { level: 3, name: 'Level Three' })).toBeInTheDocument();
  });

  it('has no accessibility violations', async () => {
    const { container } = render(<Heading as="h2">Accessible Heading</Heading>);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
