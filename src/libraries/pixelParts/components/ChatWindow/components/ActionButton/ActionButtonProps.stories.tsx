import * as React from 'react';
import ActionButton from '.';

import { colors } from '../../../../styles/colors';

import clearChatImg from '../../../../../../assets/images/clear-chat-icon.svg';

export default {
  title: 'Chat/ActionButton',
  component: ActionButton,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'The <b>ActionButton</b> component can be used to trigger various actions within the chat interface.'
      },
    },
  },
};

export const Default = {
    args: {
        onClick: () => console.log('Clear chat button clicked'),
        buttonIconSrc: clearChatImg,
        buttonImgDimensions: { width: 24 },
        buttonText: 'Clear Chat'
    },
};

export const Disabled = {
    args: {
        onClick: () => console.log('Clear chat button clicked'),
        buttonIconSrc: clearChatImg,
        buttonImgDimensions: { width: 24 },
        buttonText: 'Clear Chat',
        disabled: true
    },
};

export const Dark = {
    decorators: [
      (Story: any) => (
        <div style={{ padding: 20, backgroundColor: colors.bodyBackgroundDark }}>
          <Story />
        </div>
      ),
    ],
    args: {
        onClick: () => console.log('Clear chat button clicked'),
        buttonIconSrc: clearChatImg,
        buttonImgDimensions: { width: 24 },
        buttonText: 'Clear Chat',
        isDark: true
    },
};