import * as React from 'react';
import Checkbox from './';

export default {
  title: 'Input/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'The Checkbox component wraps the Fluent UI Checkbox component, providing a customizable checkbox with a label, checked state, onChange handler, and optional disabled state.',
      },
    },
  },
};

export const Default = () => {
  const [checked, setChecked] = React.useState(false);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    isChecked?: boolean
  ) => {
    setChecked(Boolean(isChecked));
  };

  return (
    <Checkbox
      id="test-checkbox"
      label="label"
      checked={checked}
      onChange={handleChange}
    />
  );
};