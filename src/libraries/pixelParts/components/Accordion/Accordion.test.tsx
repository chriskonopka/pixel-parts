import * as React from 'react';
import { render, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import Accordion from './index';

jest.mock('@fluentui/react-icons', () => new Proxy({}, { get: () => () => null }));

expect.extend(toHaveNoViolations);

describe('Accordion', () => {
  it('renders children', () => {
    render(
      <Accordion>
        <div title="Panel 1">Panel one content</div>
      </Accordion>
    );
    expect(screen.getByText('Panel one content')).toBeInTheDocument();
  });

  it('has no accessibility violations', async () => {
    const { container } = render(
      <Accordion>
        <div title="Panel 1">Content here</div>
      </Accordion>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
