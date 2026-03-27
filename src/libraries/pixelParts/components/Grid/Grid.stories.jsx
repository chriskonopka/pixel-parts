import React from 'react';
import Grid from '.';
import GridItem from '../GridItem';

export default {
  title: 'Layout/Grid',
  component: Grid,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'The <b>Grid</b> component is a flexible layout component that arranges its children in a grid format. <br /><br />Uses <a href="http://localhost:6006/?path=/docs/layout-griditem--docs">GridItem</a>',
      },
    },
  },
};

const createArray = (num) => {
  return new Array(num).fill('');
};

const grids = [
  [createArray(1), { sm: 12, md: 12, lg: 12 }],
  [createArray(2), { sm: 6, md: 6, lg: 6 }],
  [createArray(3), { sm: 4, md: 4, lg: 4 }],
  [createArray(4), { sm: 3, md: 3, lg: 3 }],
  [createArray(6), { sm: 2, md: 2, lg: 2 }],
  [createArray(12), { sm: 1, md: 1, lg: 1 }]
];

export const DefaultGrid = {
  args: {
    children: grids.map(([cols, colProps]) => {
      return cols.map(() => (
        <GridItem columns={colProps}>
            <div className="box" style={{ margin: 0 }}>
                {12 / cols.length}
            </div>
        </GridItem>
    ));
  })
  },
};