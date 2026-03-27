import React from 'react';
import Pill from './';
import { DismissRegular } from '@fluentui/react-icons';

export default {
  title: 'Containers/Pill',
  component: Pill,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'The <b>Pill</b> component can be used to create a button or a div with a rounded pill shape, customizable background color, and text color based on the provided props.',
      },
    },
  },
};

export const LightMode = {
  args: {
    color: 'blue',
    darkMode: false,
    text: 'Light Mode Pill',
    link: 'https://example.com',
    clickable: true,
  },
};

export const DarkMode = {
  args: {
    color: 'green',
    darkMode: true,
    text: 'Dark Mode Pill',
    link: 'https://example.com',
    clickable: true,
  },
};

export const Large = {
  args: {
    color: 'purple',
    darkMode: true,
    text: 'Dark Mode Pill',
    link: 'https://example.com',
    clickable: false,
    isLarge: true,
  },
};

export const UnClickable = {
  args: {
    color: 'purple',
    darkMode: true,
    text: 'Dark Mode Pill',
    link: 'https://example.com',
    clickable: false,
  },
};

export const EndIcon = {
  args: {
    color: 'orange',
    darkMode: false,
    text: 'Pill with End Icon',
    clickable: true,
    endIcon: <DismissRegular style={{ fontSize: 10, color: 'white' }} aria-hidden="true" focusable={false} />,
  },
};

export const Styles = {
  args: {
    color: 'orange',
    darkMode: false,
    text: 'Pill with End Icon',
    clickable: true,
    style: { marginRight: '10px' },
    endIcon: <DismissRegular style={{ fontSize: 10, color: 'white' }} aria-hidden="true" focusable={false} />,
  },
};