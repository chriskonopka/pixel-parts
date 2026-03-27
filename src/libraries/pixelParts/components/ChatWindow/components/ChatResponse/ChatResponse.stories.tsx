import * as React from 'react';
import ChatResponse from '.';
import Image from '../../../Image';

export default {
  title: 'Chat/ChatResponse',
  component: ChatResponse,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: '<p>The <b>ChatResponse</b> component displays a response message from the user or assistant.</p>'
      },
    },
  },
  args: {
    onFeedbackSubmit: undefined
  }
};

const responseIcon = (
  <Image
    src="https://mcdermottwillemery.sharepoint.com/sites/AI/SiteAssets/Images/Developer_Chat.png?csf=1&web=1&e=lw9rDI&CID=42c68e71-c42b-488d-b7d1-82bc86b99ace"
    alt=""
    aria-hidden="true"
    width={32}
    isRound
  />
);

const mockResponseText = "<p>Below is a summary of key findings based on the reviewed materials. The tables highlight notable points and supporting details.</p><br /><h3>Key Testimony Overview</h3><table><thead><tr><th>Lorem</th><th>Ipsum</th><th>Dolor</th><th>Sit</th></tr></thead><tbody><tr><td>Lorem ipsum</td><td>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</td><td>Lorem ipsum</td><td>Lorem ipsum</td></tr><tr><td>Lorem ipsum</td><td>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</td><td>Lorem ipsum</td><td>Lorem ipsum</td></tr></tbody></table><p>The following table focuses on internal management and operational considerations discussed during testimony.</p><br /><h3>Operational &amp; Management Details</h3><table><thead><tr><th>Lorem</th><th>Ipsum</th><th>Dolor</th><th>Sit</th></tr></thead><tbody><tr><td>Lorem ipsum</td><td>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.</td><td>Lorem ipsum</td><td>Lorem ipsum</td></tr><tr><td>Lorem ipsum</td><td>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</td><td>Lorem ipsum</td><td>Lorem ipsum</td></tr><tr><td>Lorem ipsum</td><td>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis aute irure dolor in reprehenderit in voluptate velit esse.</td><td>Lorem ipsum</td><td>Lorem ipsum</td></tr></tbody></table><p>Additional context:</p><ul><li>Statements were made under oath.</li><li>Citations reference deposition transcript pages.</li><li>Summaries reflect direct testimony where possible.</li></ul>";

export const AssistantResponse = {
  parameters: {
    docs: {
      description: {
        story: 'The assistant response displays a message from the assistant.'
      },
    },
  },
  args: {
    key: 1,
    chatIndex: 0,
    files: [],
    vectorFileNames: ['example1', 'example2'],
    sender: 'assistant',
    text: mockResponseText,
    status: 200,
    icon: responseIcon,
    onFeedbackSubmit: (feedback) => console.log('Feedback submitted:', feedback),
  }
};

export const SenderMessage = {
  parameters: {
    docs: {
      description: {
        story: 'The user message displays a message from the user.'
      },
    },
  },
  args: {
    key: 1,
    chatIndex: 0,
    files: [
      { fileName: 'Deposition Transcript.pdf', type: 'PDF' },
      { fileName: 'screenshot.png', type: 'PNG', previewUrl: 'https://mcdermottwillemery.sharepoint.com/sites/home/News%20Images/1%20-%20Homepage%20Images%20-%20McDermott%20Will%20&%20Schulte%208-2025/Deal%20announcements%203.jpg' },
      { fileName: 'screenshot-2.png', type: 'PNG', previewUrl: 'https://mcdermottwillemery.sharepoint.com/sites/home/News%20Images/1%20-%20Homepage%20Images%20-%20McDermott%20Will%20&%20Schulte%208-2025/Deal%20announcements%201.jpg' },
      { fileName: 'Complaint.docx', type: 'DOCX' },
    ],
    sender: 'user',
    text: 'Please Summarize this document.',
    status: 200,
    icon: responseIcon
  }
};

export const SystemMessage = {
  parameters: {
    docs: {
      description: {
        story: 'The system message displays a message from the system.'
      },
    },  
  },
  args: {
    key: 1,
    chatIndex: 0,
    sender: 'system',
    message: (
      <>
        Citation mode is now set to <b>Exact Citations</b>.<br />
        Only future citations will be impacted by this change.
      </>
    )
  }
};