import * as React from 'react';
import { render, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import FlexBox from './index';

expect.extend(toHaveNoViolations);

describe('FlexBox', () => {
  it('renders children', () => {
    render(
      <FlexBox>
        <span>Child one</span>
        <span>Child two</span>
      </FlexBox>
    );
    expect(screen.getByText('Child one')).toBeInTheDocument();
    expect(screen.getByText('Child two')).toBeInTheDocument();
  });

  it('has no accessibility violations', async () => {
    const { container } = render(
      <FlexBox>
        <span>Content</span>
      </FlexBox>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
