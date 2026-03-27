import * as React from 'react';
import DocumentIcon from '.';

export default {
  title: 'File Upload/DocumentIcon',
  component: DocumentIcon,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'The <b>DocumentIcon</b> component displays an icon representing a document file type.'
      },
    },
  },
};

export const Colors = {
    decorators: [
        () => (
            <div style={{ display: 'flex', gap: '10px' }}>
                <DocumentIcon color="blue" />
                <DocumentIcon color="green" />
                <DocumentIcon color="red" />
                <DocumentIcon color="gold" />
                <DocumentIcon color="purple" />
                <DocumentIcon color="black" /> 
            </div>
        ),
    ],
    args: {},
};

export const Image = {
    args: {
      src: 'https://mcdermottwillemery.sharepoint.com/sites/home/News%20Images/1%20-%20Homepage%20Images%20-%20McDermott%20Will%20&%20Schulte%208-2025/Deal%20announcements%203.jpg'  
    },
};

export const Sizing = {
  decorators: [
    () => (
        <div style={{ display: 'flex', gap: '10px' }}>
            <DocumentIcon color="red" size={60} />
            <DocumentIcon src="https://mcdermottwillemery.sharepoint.com/sites/home/News%20Images/1%20-%20Homepage%20Images%20-%20McDermott%20Will%20&%20Schulte%208-2025/Deal%20announcements%203.jpg" size={60} />
        </div>
    ),
  ],
  args: {}
};