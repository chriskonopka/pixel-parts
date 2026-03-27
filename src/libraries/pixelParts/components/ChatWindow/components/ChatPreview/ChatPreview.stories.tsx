import * as React from 'react';
import ChatPreview from '.';

import Image from '../../../Image';

import chatIcon from '../../../../../../assets/images/chat-ai-icon.svg';

export default {
  title: 'Chat/ChatPreview',
  component: ChatPreview,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'The <b>ChatPreview</b> component displays preview content to the user before an initial prompt is sent.'
      },
    },
  },
};

export const Default = {
    args: {
        description: 'This is a description for the chat preview.',
        icon: (
            <Image
                src={chatIcon}
                alt=""
                aria-hidden="true"
                width={100}
            />
        ),
        title: 'Chat Preview Title',
        children: <>Child content goes here...</>
    },
};