import * as React from 'react';
import FlexBox from '.';
import FlexBoxItem from '../FlexBoxItem';

export default {
  title: 'Layout/FlexBox',
  component: FlexBox,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'The <b>FlexBox</b> component is used to create flexible and responsive layouts by utilizing CSS flexbox properties, allowing for easy alignment, spacing, and distribution of child elements within a container. <br /><br />Uses <a href="http://localhost:6006/?path=/docs/layout-flexboxitem--docs">FlexBoxItem</a>.'
      },
    },
  },
};

export const Default = {
  args: {
    spacing: 16,
    children: [
      <FlexBoxItem>child</FlexBoxItem>,
      <FlexBoxItem>child</FlexBoxItem>,
      <FlexBoxItem>child</FlexBoxItem>,
      <FlexBoxItem>child</FlexBoxItem>
    ]
  },
};