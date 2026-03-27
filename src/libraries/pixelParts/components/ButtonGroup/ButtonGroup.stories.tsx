import React from 'react';
import ButtonGroup from './';

export default {
  title: 'Input/ButtonGroup',
  component: ButtonGroup,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'The <b>ButtonGroup</b> component allows users organize buttons in an inline grouped format. The buttons act like a radio button group, where only one button can be selected at a time.<br /><br />There are a variety of props available to customize the ButtonGroup component.',
      },
    },
  },
};

export const lightTheme = {
  args: {
    options: ['Summary', 'Document'],
    onChange: (value) => console.log('Selected:', value)
  },
  parameters: {
    docs: {
      description: {
        story: 'Default button.',
      },
    },
  },
};

export const darkTheme = {
  args: {
    variant: 'dark',
    options: ['Summary', 'Document'],
    onChange: (value) => console.log('Selected:', value),
  },
  decorators: [
    (Story: any) => (
      <div style={{ padding: 30, backgroundColor: '#181818' }}>
        <Story />
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story: 'Default button.',
      },
    },
  },
};

export const FullWidth = {
  args: {
    options: ['Option 1', 'Option 1', 'Option 3', 'Option 4'],
    onChange: (value) => console.log('Selected:', value),
    isFullWidth: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Adding <code>isFullWidth={true}</code> will make the buttons expand the full width of the parent container.',
      },
    },
  },
};

export const ButtonGroupWithFluentUIIcons = {
  decorators: [
    (Story: any) => (
      <div style={{ padding: 30, backgroundColor: '#181818' }}>
        <Story />
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story: 'To render Fluent Ui icons, set the `icon` property of each option to a string that matches the icon name from Fluent UI. <br /><br />The `iconColor` property can be used to set the color of the icon.',
      },
    },
  },
  args: {
    variant: 'dark',
    options: [
      { text: 'Yes', icon: 'Accept', iconColor: '#b4eb34' },
      { text: 'No', icon: 'ChromeClose', iconColor: '#fc4903' },
    ],
    defaultSelected: 1,
    buttonFontSize: '14px',
    onChange: (value) => console.log('Selected:', value),
  },
};

export const ButtonGroupWithImageIcons = {
  decorators: [
    (Story: any) => (
      <div style={{ padding: 30, backgroundColor: '#181818' }}>
        <Story />
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story: 'To render Image icons, set the `icon` property of each option with an HTML image element.',
      },
    },
  },
  args: {
    variant: 'dark',
    options: [
      { text: 'Yes', icon: <img width="16" height="14" src="https://cdn.prod.website-files.com/67642ec2aab22deb663ccb28/67642ec2aab22deb663ccd95_ai.svg" loading="lazy" /> },
      { text: 'No', icon: <img width="16" height="14" src="https://cdn.prod.website-files.com/67642ec2aab22deb663ccb28/67642ec2aab22deb663ccda3_platform.svg" loading="lazy" /> },
    ],
    defaultSelected: 1,
    buttonFontSize: '14px',
    onChange: (value) => console.log('Selected:', value),
  },
};

export const CustomTheme = {
  args: {
    options: ['Yes', 'No'],
    backgroundColor: '#f73b23',
    borderColor: '#f73b23',
    buttonColor: '#ffffff',
    activeTextColor: '#f73b23',
    inactiveTextColor: '#ffffff',
    hoverBackgroundColor: '#d91a02',
    iconColorVariant: 'none',
    onChange: (value) => console.log('Selected:', value),
  },
  parameters: {
    docs: {
      description: {
        story: 'Default button.',
      },
    },
  },
};

export const disabled = {
  args: {
    isDisabled: true,
    options: ['Summary', 'Document'],
    onChange: (value) => console.log('Selected:', value)
  },
  parameters: {
    docs: {
      description: {
        story: 'Default button.',
      },
    },
  },
};