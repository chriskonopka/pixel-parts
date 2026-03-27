import * as React from 'react';

import DrawerPanel from '.';

export default {
  title: 'Disclosure/DrawerPanel',
  component: DrawerPanel,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'The <b>DrawerPanel</b> component is used to display additional content or options in a panel that slides out from the side of the screen. It is typically used for settings, configurations, or supplementary information that complements the main content without navigating away from the current view. The drawer can be opened and closed by user interaction, providing a seamless way to access extra functionality while maintaining context within the application.',
      },
    },
  },
};

export const Default = {
    decorators: [
      (Story) => (
        <div style={{ padding: 30, backgroundColor: '#0006' }}>
          <Story />
        </div>
      ),
    ],
    args: {
        title: 'Drawer Panel Title',
        description: 'This is a description for the drawer panel, providing context or instructions related to the content within the panel.',
        children: (
          <p>This is the content of the drawer panel.</p>
        ),
    },
};