import React from 'react';
import GridItem from '.';

export default {
  title: 'Layout/GridItem',
  component: GridItem,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'The <b>GridItem</b> component is used within a Grid layout to define individual grid items.',
      },
    },
  },
};

export const Default = {
  args: {
    columns: ['small12', 'medium6', 'large4', 'xlarge4'],
    children: <div className="box">Column 1</div>
  },
};