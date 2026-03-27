import * as React from 'react';
import { render, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import PageBannerTitle from './index';

expect.extend(toHaveNoViolations);

describe('PageBannerTitle', () => {
  it('renders title', () => {
    render(<PageBannerTitle title="My Page Title" />);
    expect(screen.getByText('My Page Title')).toBeInTheDocument();
  });

  it('renders subtitle when provided', () => {
    render(<PageBannerTitle title="Page Title" subtitle="A helpful subtitle" />);
    expect(screen.getByText('A helpful subtitle')).toBeInTheDocument();
  });

  it('does not render subtitle when not provided', () => {
    render(<PageBannerTitle title="Page Title" />);
    expect(screen.queryByText('A helpful subtitle')).not.toBeInTheDocument();
  });

  it('has no accessibility violations', async () => {
    const { container } = render(
      <PageBannerTitle title="Accessible Title" subtitle="Accessible subtitle" />
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
