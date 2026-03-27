import * as React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import Video, { VideoProps } from './';

export default {
  title: 'Media/Video',
  component: Video,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'The <b>Video</b> component is used to embed video content with a preview thumbnail before playback.',
      },
    },
  },
  decorators: [
    (Story: StoryFn<VideoProps>, context) => (
      <div style={{ width: 300 }}>
        {Story(context.args, context)}
      </div>
    ),
  ],
} as Meta<VideoProps>;

export const Default = {
  args: {
    videoUrl: 'https://mcdermottwillemery.sharepoint.com/sites/home/Firmwide%20videos/Marketing/Days%20of%20Service%202024%20Recap.mp4',
    previewThumbnail: 'https://mcdermottwillemery.sharepoint.com/sites/home/SiteAssets/Lists/b702bc08-6fb1-4357-91fb-d7f58c1cf262/Days%20of%20Service_Video%20Preview.png'
  },
};
