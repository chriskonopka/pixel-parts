import React from 'react';
import PageBanner from '../PageBanner';
import PageBannerTitle from '.';

import Image from '../Image';

export default {
  title: 'Content/PageBannerTitle',
  component: PageBannerTitle,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'The <b>PageBannerTitle</b> can be used with the <a href="http://localhost:6006/?path=/docs/containers-maipagebanner--docs">PageBannerTitle</a> component to display a title with an optional icon.',
      },
    },
  },
};

export const Default = {
  decorators: [
    (Story: any) => (
      <PageBanner  leftContent={<Story />} />
    ),
  ],
  args: {
    title: 'McDermott AI Chat',
    children: <a href="#">Advantages McDermott AI Chat</a>,
    subtitle: 'Support a wide range of work by answering questions, drafting content, and guiding you to the right resources — all within approved firm guardrails.',
    icon: <Image src="https://cdn.prod.website-files.com/67642ec2aab22deb663ccb54/6904a43bdabb058030d1cf64_MAI%20Chat.png" alt="logo" width="44" isRound />,
  },
};