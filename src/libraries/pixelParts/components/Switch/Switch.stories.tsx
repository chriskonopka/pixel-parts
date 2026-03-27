import React from 'react';
import Switch from '.';

export default {
  title: 'Input/Switch',
  component: Switch,
  tags: ["autodocs"],
  decorators: [
    (Story: any) => (
      <div style={{ width: 400, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Story />
      </div>
    ),
  ],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'The <b>Switch</b> component allows users to toggle between two states, typically "on" and "off". It is commonly used in forms and settings to enable or disable options.',
      },
    },
  }
};

export const Default = {
  args: {
    defaultChecked: true,
  },
};

export const WithLabel = {
  args: {
    id: 'switch-with-label',
    defaultChecked: false,
    label: 'Enable web access for real-time, up-to-date responses. When off, the assistant’s knowledge is current through June 2024.',
  },
};

export const Sizes = {
  render: (args) => (
    <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
      <Switch {...args} size='sm' defaultChecked aria-label='Small slider' />
      <Switch {...args} size='md' defaultChecked aria-label='Medium slider' />
      <Switch {...args} size='lg' defaultChecked aria-label='Large slider' />
    </div>
  ),
  args: {
    disabled: false,
  },
};

export const Disabled = {
  args: {
    disabled: true,
    defaultChecked: true,
  },
};