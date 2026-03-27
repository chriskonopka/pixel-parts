import * as React from 'react';
import type { Meta, StoryObj, StoryFn } from '@storybook/react';
import ShimmerPanel, { ShimmerPanelProps } from '.';

const meta: Meta<ShimmerPanelProps> = {
  title: 'Feedback/ShimmerPanel',
  component: ShimmerPanel,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'The <b>ShimmerPanel</b> is a UI component used to display a loading shimmer effect. It indicates that content is being loaded and can be used to improve the user experience by providing a visual cue during data fetching or processing. The component supports both light and dark backgrounds.',
      },
    },
  },
};
export default meta;

type ShimmerStory = StoryObj<ShimmerPanelProps>;

export const LightShimmerPanel: ShimmerStory = {
  args: {
    variant: 'white',
  },
};

export const GrayShimmerPanel: ShimmerStory = {
  args: {
    variant: 'gray',
  },
};

export const DarkShimmerPanel: ShimmerStory = {
  decorators: [
    (Story: StoryFn<ShimmerPanelProps>) => (
      <div style={{ padding: 30, backgroundColor: '#292929' }}>
        <Story />
      </div>
    ),
  ],
  args: {
    variant: 'dark',
  },
};
