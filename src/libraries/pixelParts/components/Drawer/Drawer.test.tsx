import * as React from 'react';
import { render, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import Drawer from './index';

expect.extend(toHaveNoViolations);

describe('Drawer', () => {
  it('renders children when isOpen=true', () => {
    render(
      <Drawer isOpen={true}>
        <div>Drawer content</div>
      </Drawer>
    );
    expect(screen.getByText('Drawer content')).toBeInTheDocument();
  });

  it('does not render children when isOpen=false', () => {
    render(
      <Drawer isOpen={false}>
        <div>Hidden content</div>
      </Drawer>
    );
    expect(screen.queryByText('Hidden content')).not.toBeInTheDocument();
  });

  it('has no accessibility violations when open', async () => {
    const { container } = render(
      <Drawer isOpen={true}>
        <div>Accessible drawer</div>
      </Drawer>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
