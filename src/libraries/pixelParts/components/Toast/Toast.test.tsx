import * as React from 'react';
import { render, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import Toast from './index';

jest.mock('@fluentui/react-icons', () => new Proxy({}, { get: () => () => null }));

expect.extend(toHaveNoViolations);

describe('Toast', () => {
  it('renders message when isVisible=true', () => {
    render(<Toast message="Operation successful" isVisible={true} />);
    expect(screen.getByText('Operation successful')).toBeInTheDocument();
  });

  it('renders alert role element when isVisible=false', () => {
    render(<Toast message="Hidden message" isVisible={false} />);
    // The element is always in the DOM (visibility toggled via CSS class), but the role is present
    expect(screen.getByRole('alert')).toBeInTheDocument();
  });

  it('has no accessibility violations when visible', async () => {
    const { baseElement } = render(<Toast message="Accessible toast" isVisible={true} />);
    const results = await axe(baseElement);
    expect(results).toHaveNoViolations();
  });
});
