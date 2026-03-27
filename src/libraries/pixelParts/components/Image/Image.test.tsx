import * as React from 'react';
import { render, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import Image from './index';

expect.extend(toHaveNoViolations);

describe('Image', () => {
  it('renders img with src and alt', () => {
    render(<Image src="https://example.com/photo.jpg" alt="A photo" />);
    const img = screen.getByRole('img', { name: 'A photo' });
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', 'https://example.com/photo.jpg');
    expect(img).toHaveAttribute('alt', 'A photo');
  });

  it('renders with width and height attributes', () => {
    render(<Image src="https://example.com/photo.jpg" alt="Photo" width={200} height={100} />);
    const img = screen.getByRole('img', { name: 'Photo' });
    expect(img).toHaveAttribute('width', '200');
    expect(img).toHaveAttribute('height', '100');
  });

  it('has no accessibility violations', async () => {
    const { container } = render(<Image src="https://example.com/photo.jpg" alt="Accessible image" />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
