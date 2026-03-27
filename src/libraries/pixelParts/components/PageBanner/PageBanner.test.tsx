import * as React from 'react';
import { render, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import PageBanner from './index';

expect.extend(toHaveNoViolations);

describe('PageBanner', () => {
  it('renders leftContent', () => {
    render(<PageBanner leftContent={<span>Left side content</span>} />);
    expect(screen.getByText('Left side content')).toBeInTheDocument();
  });

  it('renders rightContent when provided', () => {
    render(
      <PageBanner
        leftContent={<span>Left</span>}
        rightContent={<span>Right side content</span>}
      />
    );
    expect(screen.getByText('Right side content')).toBeInTheDocument();
  });

  it('does not render rightContent when not provided', () => {
    render(<PageBanner leftContent={<span>Left only</span>} />);
    expect(screen.queryByText('Right side content')).not.toBeInTheDocument();
  });

  it('has no accessibility violations', async () => {
    const { container } = render(
      <PageBanner
        leftContent={<span>Left</span>}
        rightContent={<span>Right</span>}
      />
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
