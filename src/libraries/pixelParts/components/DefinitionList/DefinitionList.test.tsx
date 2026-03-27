import * as React from 'react';
import { render, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import DefinitionList from './index';

expect.extend(toHaveNoViolations);

const mockData = {
  Name: 'Alice',
  Role: 'Engineer',
  Location: 'Remote',
};

describe('DefinitionList', () => {
  it('renders terms from data prop', () => {
    render(<DefinitionList data={mockData} />);
    expect(screen.getByText('Name:')).toBeInTheDocument();
    expect(screen.getByText('Role:')).toBeInTheDocument();
    expect(screen.getByText('Location:')).toBeInTheDocument();
  });

  it('renders definitions from data prop', () => {
    render(<DefinitionList data={mockData} />);
    expect(screen.getByText('Alice')).toBeInTheDocument();
    expect(screen.getByText('Engineer')).toBeInTheDocument();
    expect(screen.getByText('Remote')).toBeInTheDocument();
  });

  it('has no accessibility violations', async () => {
    const { container } = render(<DefinitionList data={mockData} />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
