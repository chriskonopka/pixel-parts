import * as React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe, toHaveNoViolations } from 'jest-axe';
import Modal from './index';

expect.extend(toHaveNoViolations);

describe('Modal', () => {
  it('renders title', () => {
    render(<Modal title="Test Title"><p>Body</p></Modal>);
    expect(screen.getByText('Test Title')).toBeInTheDocument();
  });

  it('renders children', () => {
    render(<Modal><p>Modal body content</p></Modal>);
    expect(screen.getByText('Modal body content')).toBeInTheDocument();
  });

  it('calls onClose when close button is clicked', async () => {
    const user = userEvent.setup();
    const handleClose = jest.fn();
    render(
      <Modal title="My Modal" showCloseButton onClose={handleClose}>
        <p>Content</p>
      </Modal>
    );
    await user.click(screen.getByRole('button', { name: 'Close modal' }));
    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it('has no accessibility violations', async () => {
    const { container } = render(
      <Modal title="Accessible Modal" showCloseButton onClose={() => {}}>
        <p>Content</p>
      </Modal>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
