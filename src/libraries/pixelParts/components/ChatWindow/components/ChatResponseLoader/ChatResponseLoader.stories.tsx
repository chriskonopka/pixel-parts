import * as React from 'react';
import ChatResponseLoader from '.';

import Image from '../../../Image';

import fallbackIcon from '../../../../../../assets/images/chat-ai-icon.svg';
import developerChatIcon from '../../../../../../assets/images/developer-chat-icon.png';

export default {
  title: 'Chat/ChatResponseLoader',
  component: ChatResponseLoader,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: '<p>The <b>ChatResponseLoader</b> component displays a loading indicator while waiting for a response from the chat API.</p>'
      },
    },
  },
  args: {
    
  }
};

const icon = (
  <Image
    src={developerChatIcon}
    alt=""
    aria-hidden="true"
    width={32}
    isRound
  />
);

export const Default = {
  args: {
    text: 'Thinking for',
    icon,
    fallbackIcon
  }
};
