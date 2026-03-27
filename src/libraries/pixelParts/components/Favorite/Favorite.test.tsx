import * as React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe, toHaveNoViolations } from 'jest-axe';
import Favorite from './index';

jest.mock('@fluentui/react-icons', () => new Proxy({}, { get: () => () => null }));

// The Favorite component does `import * as classNames from 'classnames'` and passes that
// namespace object directly into classnames(), which crashes because the namespace object
// has a null prototype (no .toString). We mock classnames to safely handle any input.
jest.mock('classnames', () => {
  const original = jest.requireActual('classnames');
  const safe = (...args: unknown[]) =>
    original(...args.map((a) => (typeof a === 'object' && a !== null && !Array.isArray(a) ? {} : a)));
  safe.default = safe;
  return safe;
});

expect.extend(toHaveNoViolations);

const defaultFavorited = { iconName: 'FavoriteStarFill', iconColor: '#F6C31E', text: 'Favorited', textColor: '#fff' };
const defaultUnFavorited = { iconName: 'FavoriteStar', iconColor: '#F6C31E', text: 'Add Favorite', textColor: '#fff' };

describe('Favorite', () => {
  it('renders the button', () => {
    render(
      <Favorite
        favorited={defaultFavorited}
        unFavorited={defaultUnFavorited}
        onClick={() => {}}
      />
    );
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('shows unfavorited text when isFavorited=false', () => {
    render(
      <Favorite
        favorited={defaultFavorited}
        unFavorited={defaultUnFavorited}
        isFavorited={false}
        onClick={() => {}}
      />
    );
    expect(screen.getByText('Add Favorite')).toBeInTheDocument();
  });

  it('shows favorited text when isFavorited=true', () => {
    render(
      <Favorite
        favorited={defaultFavorited}
        unFavorited={defaultUnFavorited}
        isFavorited={true}
        onClick={() => {}}
      />
    );
    expect(screen.getByText('Favorited')).toBeInTheDocument();
  });

  it('calls onClick when clicked', async () => {
    const user = userEvent.setup();
    const handleClick = jest.fn();
    render(
      <Favorite
        favorited={defaultFavorited}
        unFavorited={defaultUnFavorited}
        onClick={handleClick}
      />
    );
    await user.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('has no accessibility violations', async () => {
    const { container } = render(
      <Favorite
        favorited={defaultFavorited}
        unFavorited={defaultUnFavorited}
        onClick={() => {}}
        aria-label="Toggle favorite"
      />
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
