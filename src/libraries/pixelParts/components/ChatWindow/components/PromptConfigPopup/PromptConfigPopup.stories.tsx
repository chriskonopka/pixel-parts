import * as React from 'react';
import PromptConfigPopup from '.';

import profileBlackIcon from '../../../../../../assets/images/profileBlack.svg';
import profileBlueIcon from '../../../../../../assets/images/profileBlue.svg';
import profileWhiteIcon from '../../../../../../assets/images/profileWhite.svg';

export default {
  title: 'Chat/PromptConfigPopup',
  component: PromptConfigPopup,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'The <b>PromptConfigPopup</b> component can be used to configure various chat settings within the chat interface.'
      },
    },
  },
};

export const Inactive = {
    decorators: [
      (Story: any) => (
        <div style={{ paddingTop: 150 }}>
          <Story />
        </div>
      ),
    ],
    args: {
        buttonText: 'Profile',
        popupTitle: 'My Data',
        isActive: false,
        buttonIcon: [profileBlackIcon, profileBlueIcon],
        popupIcon: profileWhiteIcon,
        children: <div style={{ padding: 20 }}>content...</div>,
    },
};

export const Active = {
    decorators: [
      (Story: any) => (
        <div style={{ height: 150, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
          <Story />
        </div>
      ),
    ],
    args: {
        buttonText: 'Profile',
        popupTitle: 'My Data',
        isActive: true,
        buttonIcon: [profileBlackIcon, profileBlueIcon],
        popupIcon: profileWhiteIcon,
        children: <div style={{ padding: 20 }}>content...</div>,
    },
};