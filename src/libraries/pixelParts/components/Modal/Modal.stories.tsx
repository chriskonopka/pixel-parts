import React from 'react';
import Modal from '.';
import Button from '../Button';

export default {
    title: 'Disclosure/Modal',
    component: Modal,
    tags: ['autodocs'],
    parameters: {
      docs: {
        description: {
          component: 'The <b>Modal</b> component displays content in a layer above the app. It can be used to capture user input or display information without navigating away from the current page.'
        },
      },
    },
    decorators: [
        (Story: any) => (
          <div style={{ height: 500 }}>
            <Story />
          </div>
        ),
    ],
};

export const Default = {
  args: {
    title: 'Modal Title',
    footer: <Button text="Close" variant="lightGray" onClick={() => {}} />,
    children: <>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. <a href="https://google.com">Learn more</a></>
  },
};

export const WithCloseButton = {
  args: {
    ...Default.args,
    showCloseButton: true,
    leftAlignTitle: true,
    onClose: () => { /* hook this up in app; for Storybook a no-op is fine */ },
  },
};