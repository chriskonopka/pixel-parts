import * as React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe, toHaveNoViolations } from 'jest-axe';
import DrawerPanel from './index';

jest.mock('@fluentui/react-icons', () => new Proxy({}, { get: () => () => null }));

expect.extend(toHaveNoViolations);

describe('DrawerPanel', () => {
  it('renders title', () => {
    render(<DrawerPanel title="Panel Title"><p>Content</p></DrawerPanel>);
    expect(screen.getByText('Panel Title')).toBeInTheDocument();
  });

  it('renders children', () => {
    render(<DrawerPanel title="Title"><p>Panel children</p></DrawerPanel>);
    expect(screen.getByText('Panel children')).toBeInTheDocument();
  });

  it('calls onClose when close button is clicked', async () => {
    const user = userEvent.setup();
    const handleClose = jest.fn();
    render(
      <DrawerPanel title="Closeable Panel" onClose={handleClose}>
        <p>Content</p>
      </DrawerPanel>
    );
    await user.click(screen.getByRole('button', { name: 'Close Panel' }));
    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it('has no accessibility violations', async () => {
    const { container } = render(
      <DrawerPanel title="Accessible Panel">
        <p>Content</p>
      </DrawerPanel>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
