import * as React from 'react';
import { render, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import AccordionPanel from './index';

jest.mock('@fluentui/react-icons', () => new Proxy({}, { get: () => () => null }));

expect.extend(toHaveNoViolations);

describe('AccordionPanel', () => {
  it('renders title', () => {
    render(<AccordionPanel title="My Panel"><p>Content</p></AccordionPanel>);
    expect(screen.getByText('My Panel')).toBeInTheDocument();
  });

  it('renders children when isOpen=true', () => {
    render(
      <AccordionPanel title="Open Panel" isOpen={true}>
        <p>Visible content</p>
      </AccordionPanel>
    );
    expect(screen.getByText('Visible content')).toBeInTheDocument();
  });

  it('has no accessibility violations', async () => {
    const { container } = render(
      <AccordionPanel title="Accessible Panel">
        <p>Panel content</p>
      </AccordionPanel>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
