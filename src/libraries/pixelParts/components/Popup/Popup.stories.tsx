import * as React from 'react';
import Popup from '.';

import DataList from '../DefinitionList';
import Button from '../Button';

export default {
  title: 'Disclosure/Popup',
  component: Popup,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: '<p>The <b>Popup</b> component provides a popup interface for displaying content in a dialog.</p>'
      },
    },
  }
};

export const Default = {
  decorators: [
    (Story: any) => (
      <div style={{ paddingTop: 160 }}>
        <Story />
      </div>
    ),
  ],
  args: {
    icon: 'https://cdn.prod.website-files.com/67642ec2aab22deb663ccb28/6915e8563bd1f2d3933258d0_User%20-%20White.svg',
    title: 'My Profile',
    triggerElement: <Button variant="white" text="Toggle Popup" />,
    children: (
      <div style={{ padding: '12px 20px' }}>
        <DataList
          data={{
            Name: 'John Doe',
            Title: 'Partner', 
            Practice: 'Healthcare',
            Office: 'New York',
          }}
        />
      </div>
    ),
  }
};