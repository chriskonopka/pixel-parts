import * as React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe, toHaveNoViolations } from 'jest-axe';
import Card from './index';

expect.extend(toHaveNoViolations);

describe('Card', () => {
  it('renders cardTitle', () => {
    render(<Card cardTitle="My Card Title" />);
    expect(screen.getByText('My Card Title')).toBeInTheDocument();
  });

  it('renders children', () => {
    render(<Card><span>Card content</span></Card>);
    expect(screen.getByText('Card content')).toBeInTheDocument();
  });

  it('calls onClick when card is clicked with onClickTarget=Card', async () => {
    const user = userEvent.setup();
    const handleClick = jest.fn();
    render(<Card onClick={handleClick} onClickTarget="Card" cardTitle="Clickable" />);
    await user.click(screen.getByRole('button', { name: /Clickable/i }));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('has no accessibility violations', async () => {
    const { container } = render(<Card cardTitle="Accessible Card"><p>Content</p></Card>);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
