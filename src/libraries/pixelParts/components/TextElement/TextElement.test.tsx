import * as React from 'react';
import { render, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import TextElement from './index';

expect.extend(toHaveNoViolations);

describe('TextElement', () => {
  it('renders children text', () => {
    render(<TextElement>Hello world</TextElement>);
    expect(screen.getByText('Hello world')).toBeInTheDocument();
  });

  it('renders as span by default', () => {
    const { container } = render(<TextElement>Span text</TextElement>);
    expect(container.querySelector('span')).toBeInTheDocument();
  });

  it('renders as p when as="p"', () => {
    const { container } = render(<TextElement as="p">Paragraph text</TextElement>);
    expect(container.querySelector('p')).toBeInTheDocument();
    expect(screen.getByText('Paragraph text')).toBeInTheDocument();
  });

  it('renders as h2 when as="h2"', () => {
    render(<TextElement as="h2">Heading text</TextElement>);
    expect(screen.getByRole('heading', { level: 2, name: 'Heading text' })).toBeInTheDocument();
  });

  it('has no accessibility violations', async () => {
    const { container } = render(<TextElement as="p">Accessible text</TextElement>);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
