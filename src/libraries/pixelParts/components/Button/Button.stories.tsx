import * as React from 'react';
import Button from './';

export default {
  title: 'Input/Button',
  component: Button,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'The <b>Button</b> component is a versatile button element that can include an icon, text, and various styling options.',
      },
    },
  },
};

export const White = {
  args: {
    icon: '★',
    text: 'Request Access',
    variant: 'white',
  },
};

export const LightGray = {
  args: {
    icon: '★',
    text: 'Request Access',
    variant: 'lightGray',
  },
};

export const FullWidth = {
  args: {
    icon: '★',
    text: 'Request Access',
    variant: 'lightGray',
    fullWidth: true,
  },
};

export const Green = {
  args: {
    icon: '⭐',
    text: 'Launch',
    variant: 'green',
  },
};

export const Dark = {
  args: {
    text: 'Clear',
    variant: 'dark',
  },
};

export const DarkMuted = {
  args: {
    text: 'Clear',
    variant: 'darkMuted',
  },
};

export const Alert = {
  args: {
    text: 'Delete',
    variant: 'alert',
  },
};

export const Navy = {
  args: {
    text: 'Open New Matter',
    variant: 'navy',
    isLarge: true,
  },
};

export const TabNavyStates = {
  render: () => (
    <div style={{ display: 'flex', gap: '24px' }}>
      <Button text="Overview" variant="tabNavy" isActive={false} />
      <Button text="Overview" variant="tabNavy" isActive />
    </div>
  ),
};
