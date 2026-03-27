import * as React from 'react';

import ChatDialog from '.';

import DrawerPanel from '../../../DrawerPanel';
import ChatResponse from '../ChatResponse';
import ChatPreview from '../ChatPreview';
import ChatInstructions from '../ChatInstructions';
import SuggestedPrompts from '../SuggestedPrompts'; 
import CitationSettings from '../CitationSettings';
import ClearChat from '../ClearChat';
import DownloadDocuments from '../DownloadDocuments';
import PromptConfigPopup, { PromptConfigPopupProvider } from '../PromptConfigPopup';
import ActionButton from '../ActionButton';
import MyProfileSettings from '../MyProfileSettings';
import UploadedFilesList from '../UploadedFilesList';

import Image from '../../../Image';
import SearchBox from '../../../SearchBox';
import Switch from '../../../Switch';

import broomImg from '../../../../../../assets/images/broom.svg';
import downloadImg from '../../../../../../assets/images/download.svg';
import expandImg from '../../../../../../assets/images/expand.svg';
import profileBlackIcon from '../../../../../../assets/images/profileBlack.svg';
import profileBlueIcon from '../../../../../../assets/images/profileBlue.svg';
import webSearchBlackIcon from '../../../../../../assets/images/webSearchBlack.svg';
import webSearchBlueIcon from '../../../../../../assets/images/webSearchBlue.svg';
import citationsBlackIcon from '../../../../../../assets/images/citationsBlack.svg';
import citationsBlueIcon from '../../../../../../assets/images/citationsBlue.svg';
import uploadedFilesBlackIcon from '../../../../../../assets/images/uploadedFilesBlack.svg';
import uploadedFilesBlueIcon from '../../../../../../assets/images/uploadedFilesBlue.svg';

interface ChatMessage {
    sender: 'user' | 'assistant' | 'system';
    text?: string
    message?: React.ReactNode | string;
    status?: number;
    files?: {
        fileName: string;
        iconName?: string;
        type: string;
        previewUrl?: string;
    }[] | undefined;
}

export default {
  title: 'Chat/ChatDialog',
  component: ChatDialog,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: '<p>The <b>ChatDialog</b> component renders a chat window interface. This is a presentation component and does not manage any state or behavior.</p>'
      },
    },
  },
};

const icon = (
  <Image
    src="https://mcdermottwillemery.sharepoint.com/sites/AI/SiteAssets/Images/Developer_Chat.png?csf=1&web=1&e=lw9rDI&CID=42c68e71-c42b-488d-b7d1-82bc86b99ace"
    alt=""
    aria-hidden="true"
    width={32}
    isRound
  />
);

const citationSettings = [
  {
    "title": "Exact Citations",
    "description": "Opens document with content highlighted. Slowest, but most precise.",
    "type": "Exact",
    "instructions": `
      ### Citation instructions
      ## 1. When to include citations
      - Strictly include coordinate tags only when the source document originates from a PDF (i.e., the filename ends with .pdf).
      - For all other file types (e.g., .docx, .txt, .xlsx), do not include coordinate tags under any circumstances. Ignore all citation-related instructions listed below if the document is not a PDF file.
      - IMPORTANT: Include all coordinate tags for PDF content — no omissions.

      ## 2. How to structure coordinate tags
      - Every sentence from the source PDF content is delivered to you in this pattern: SENTENCE_TEXT [Page#<N>~{minX:F2}, {minY:F2}, {maxX:F2}, {maxY:F2}]
      - The four x- and y-numbers are the coordinates in PDF points.
      - Every output citation coordinate tag must include all four coordinates, in the format: [Page#<N>~minX:F2, minY:F2, maxX:F2, maxY:F2]
    `
  },
  {
    "title": "Reference Page & Paragraph",
    "description": "Displays Page Number. Faster, but less precise.",
    "type": "Summary",
    "instructions": `
      ### Citation instructions
      When retrieving information from the document, always include the exact page number and paragraph number where the information appears. If the answer comes from multiple sections, list all corresponding page and paragraph numbers.
    `
  },
  {
    "title": "No Citations",
    "description": "Fastest, but no source verification.",
    "type": "None",
    "instructions": ""
  }
];

const chatResponse: ChatMessage[] = [
  {
    sender: 'user',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed quis risus nibh. Vestibulum ante ipsum primis in faucibus luctus.',
    files: [
      { fileName: 'John Doe Deposition Transcript.pdf', type: 'PDF' },
      { fileName: 'screenshot.png', type: 'Image', previewUrl: 'https://mcdermottwillemery.sharepoint.com/sites/home/News%20Images/1%20-%20Homepage%20Images%20-%20McDermott%20Will%20&%20Schulte%208-2025/Deal%20announcements%203.jpg' },
      { fileName: 'screenshot-2.png', type: 'Image', previewUrl: 'https://mcdermottwillemery.sharepoint.com/sites/home/News%20Images/1%20-%20Homepage%20Images%20-%20McDermott%20Will%20&%20Schulte%208-2025/Deal%20announcements%201.jpg' },
      { fileName: 'Complaint.docx', type: 'DOCX' },
    ],
  },
  {
    sender: 'assistant',
    text: '<p>Sure! Here is a summary of the document.</p><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed quis risus nibh. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Integer sagittis imperdiet tortor at euismod. Cras dignissim eleifend lectus, at condimentum risus consequat a. Ut rutrum dui ac massa molestie commodo. Cras porttitor sapien ac placerat imperdiet. Fusce efficitur orci eu odio fermentum, eu convallis metus pharetra. Morbi fringilla nulla felis, eu efficitur neque blandit auctor. Donec et turpis erat. Morbi commodo tempus sem id tristique. Donec eu venenatis erat, a sollicitudin purus. Nulla diam mi, laoreet in dolor a, rutrum efficitur ligula. Nulla consectetur pharetra blandit. Mauris ultrices dapibus sapien, non scelerisque enim. Mauris commodo fringilla ultricies.</p>',
  },
  {
    sender: 'system',
    message: (
      <>
        Citation mode is now set to <b>Exact Citations</b>.<br />
        Only future citations will be impacted by this change.
      </>
    )
  }
];

const suggestedPrompts = [
  { Title: 'Summarize Document', Prompt: 'Summarize this document in plain language, highlighting the key points, decisions, and any action items.' },
  { Title: 'Explain a Legal Concept', Prompt: 'Summarize this document in plain language, highlighting the key points, decisions, and any action items.' },
  { Title: 'Draft a Response or Outline', Prompt: 'Draft a professional response or outline for [type of task—e.g., client email, motion summary, or meeting recap], ensuring clarity...' },
  { Title: 'Generate Key Insights', Prompt: 'Identify the main issues, risks, or trends in this matter based on available data.' },
  { Title: 'Find Precedents or References', Prompt: 'Find relevant precedents, authorities, or internal documents related to [topic].' },
  { Title: 'Prepare for a Meeting or Call', Prompt: 'Create a quick briefing for my upcoming [meeting/call] based on recent updates, documents, and matter activity.' }
];

const files = [
  new File(["Sample PowerPoint content"], "presentation.pptx", { type: "application/vnd.openxmlformats-officedocument.presentationml.presentation" }),
  new File(["Sample Word document content"], "document_with_really_long_name.docx", { type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document" }),
  new File(["Sample Excel spreadsheet content"], "spreadsheet.xlsx", { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" }),
  new File(["Hello, this is a text file."], "notes.txt", { type: "text/plain" })
];

const PromptInputComponent = () => {
  const parentRef = React.useRef<HTMLDivElement>(null);
  return (
    <PromptConfigPopupProvider parentRef={parentRef}>
      <SearchBox
        placeholder="Send Message to Assistant"
        onSearch={() => {}}
        onChange={() => {}}
        showIcon={false}
        hasShadow
        hasImageAttachment
        hasFileAttachment
        actionButtons={[
          <PromptConfigPopup 
            key="popup1"
            buttonText="My Profile"
            popupTitle="Use My Profile"
            buttonIcon={[profileBlackIcon, profileBlueIcon]}
            isRelativeToTrigger={false}
            isActive
          >
            <MyProfileSettings
              checked={true}
              onChange={() => {}}
              userProfile={{
                Name: 'John Doe',
                Office: 'New York',
                Practice: 'Healthcare',
                Title: 'Partner'
              }}
            />
          </PromptConfigPopup>,
          <PromptConfigPopup 
            key="popup2"
            buttonText="Web Search"
            popupTitle="Web Search"
            buttonIcon={[webSearchBlackIcon, webSearchBlueIcon]}
            isRelativeToTrigger={false}
            isActive
          >
            <div style={{ padding: '12px 20px', display: 'flex', gap: '10px' }}>
              <label htmlFor="web-search-switch">Enable web access for real-time, up-to-date responses. When off, the assistant's knowledge is current through June 2024.</label>
              <Switch id="web-search-switch" onChange={() => {}} checked={true} />
            </div>
          </PromptConfigPopup>,
          <PromptConfigPopup 
            key="popup3"
            buttonText="Citations"
            popupTitle="Citations"
            buttonIcon={[citationsBlackIcon, citationsBlueIcon]}
            isRelativeToTrigger={false}
          >
            <CitationSettings 
              text={<>Citations are supported for <b>Word</b> and <b>PDF</b> documents only.</>}
              selectedOption="None"
              settings={citationSettings} 
              onClick={(setting, index) => console.log(setting, index)}
            />
          </PromptConfigPopup>,
          <PromptConfigPopup  
            key="popup4"
            buttonText={`${files.length} Uploaded Files`}
            popupTitle="Uploaded Files"
            buttonIcon={[uploadedFilesBlackIcon, uploadedFilesBlueIcon]}
            inset="auto auto 100% 0"
            width="100%"
            isRelativeToTrigger={false}
          >
            <UploadedFilesList 
              items={[{ id: '123', fileName: 'deposition.pdf', iconName: 'PDF', type: 'PDF', previewUrl: undefined }]} 
              onRemove={(id, fileName) => console.log('Remove file:', id, fileName)}
            />
          </PromptConfigPopup>
        ]}
      />
    </PromptConfigPopupProvider>
  )
};

export const WithActionButtons = {
  decorators: [
    (Story: any) => (
      <div style={{ height: 550 }}>
        <Story />
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story: 'Action buttons can be added to the ChatWindow for enhanced interactivity. They will be displayed inline ath the top right of the chat window.'
      },
    },
  },
  render: (args) => {
    const [drawerOpen, setDrawerOpen] = React.useState(false);

    return (
      <ChatDialog 
        {...args} 
        drawerOpen={drawerOpen}
        actionButtons={[
          <ActionButton 
            ariaLabel="Expand Canvas"
            buttonIconSrc={expandImg} 
            buttonImgDimensions={{
              width: 24
            }}
            onClick={() => {}}
          />,
          <ActionButton 
            ariaLabel="Download Chat"
            buttonIconSrc={downloadImg} 
            buttonImgDimensions={{
              width: 20
            }}
            onClick={() => setDrawerOpen(true)}
            drawerPanel={
              <DrawerPanel
                key="5"
                title="Download"
                description="Download the full chat as a Word or PDF file."
              >
                <DownloadDocuments 
                  onCancel={() => console.log('Cancel clicked')}
                  onClick={(docType) => {
                    console.log('Download document:', docType);
                    setDrawerOpen(false);
                  }} 
                />
              </DrawerPanel>
            }
          />,
          <ActionButton 
            ariaLabel="Clear Chat"
            buttonIconSrc={broomImg} 
            buttonImgDimensions={{
              width: 22
            }}
            onClick={() => setDrawerOpen(true)}
            drawerPanel={
              <DrawerPanel
                key="4"
                title="Clear Chat"
                description="Reset the conversation and start fresh—this cannot be undone."
              >
                <ClearChat 
                  onClear={() => {
                  console.log('Chat cleared');
                    setDrawerOpen(false);
                  }} 
                  onCancel={() => setDrawerOpen(false)}
                />
              </DrawerPanel>
            }
          />,
        ]}
      />
    );
  },
  args: {
    icon,
    hasGuardrails: true,
    promptInputComponent: <PromptInputComponent />,
    chatWindowTitle: "McDermott AI Chat",
    children: (
      <>
        {chatResponse.map((message, index) => (
          <ChatResponse
              key={index}
              chatIndex={index}
              files={message.files}
              sender={message.sender}
              text={message.text}
              message={message.message}
              status={message.status}
              vectorFileNames={['example1', 'example2', 'example3', 'example4', 'example5', 'example6', 'example7', 'example8', 'example9']}
              icon={icon}
              onFeedbackSubmit={(feedback) => console.log('Feedback submitted:', feedback)}
          />
      ))}
      </>
    ),
    onCloseWindow: null,
  },
};

export const CenteredPromptInput = {
  parameters: {
    docs: {
      description: {
        story: 'The ChatWindow can display a centered prompt input when there are no messages.'
      },
    },
  },
  args: {
    icon,
    centerPromptInput: true,
    promptInputHeaderText: 'What can I help you with?',
    disclaimer: <>Generative AI may be inaccurate — review outputs and comply with the firm's <a href="">Generative AI Policy</a>.</>,
    promptInputComponent: <PromptInputComponent />,
    onCloseWindow: null
  }
};

export const ChatPreviewWithInstructions = {
  parameters: {
    docs: {
      description: {
        story: 'The ChatWindow can display a preview content along with chat instructions.'
      },
    },
  },
  args: {
    icon,
    promptInputComponent: <PromptInputComponent />,
    chatPreview: (
      <ChatPreview
        description="This is a description for the chat preview."
        icon={<Image alt="" aria-hidden="true" src="static/media/../src/assets/images/chat-ai-icon.svg" width={100}/>}
        title="Chat Preview Title"
      >
        <ChatInstructions
          instructions={[
            {
              text: 'DOCX, PDF, TXT, or XLS to begin analysis',
              title: 'Upload example input documents'
            },
            {
              text: 'Example: “Do you see any vague terms in the indemnity clause?',
              title: 'Provide context and a prompt in the chat window to run against your attachment or content'
            },
            {
              text: 'If we commit $3 million to the joint venture, is this allowed?',
              title: 'Chat freely to explore the results and dig deeper'
            }
          ]}
        />
      </ChatPreview>
    ),
    onCloseWindow: null
  }
};

export const ChatPreviewWithSuggestedPrompts = {
  parameters: {
    docs: {
      description: {
        story: 'The ChatWindow can display a preview content along with suggested prompts.'
      },
    },
  },
  args: {
    icon,
    promptInputComponent: <PromptInputComponent />,
    chatPreview: (
      <ChatPreview
        icon={
          <Image 
            alt="" 
            aria-hidden="true" 
            src="https://cdn.prod.website-files.com/67642ec2aab22deb663ccb54/6904a43bdabb058030d1cf64_MAI%20Chat.png" 
            width={80}
            isRound
          />
        }
      >
        <SuggestedPrompts 
          prompts={suggestedPrompts}
          characterLimit={130}
          onSelect={(prompt) => console.log(prompt)}
          isAnimated
        />
      </ChatPreview>
    ),
    onCloseWindow: null
  }
};

export const Loading = {
  parameters: {
    docs: {
      description: {
        story: 'The ChatWindow component displays a loading beacon when the assistant is processing a request. You can customize the color of the loading beacon using the `loadingBeaconColor` attribute in the `chatWindowStyles` prop.'
      },
    },
  },
  args: {
    icon,
    promptInputComponent: <PromptInputComponent />,
    children: (
      <>
        {[chatResponse[0]].map((message, index) => (
          <ChatResponse
              key={index}
              chatIndex={index}
              files={message.files}
              sender={message.sender}
              text={message.text}
              status={message.status}
              icon={icon}
          />
      ))}
      </>
    ),
    isLoading: true,
    onCloseWindow: null
  },
};

export const Modal = {
  parameters: {
    docs: {
      description: {
        story: 'The ChatWindow can be displayed as a modal dialog, providing a focused interface for user interactions.'
      },
    },
  },
  decorators: [
    (Story: any) => (
      <div style={{ height: 800 }}>
        <Story />
      </div>
    ),
  ],
  args: {
    variant: 'modal',
    onCloseWindow: () => console.log('Close button clicked'),
    chatWindowTitle: 'Chat with McDermott AI',
    actionButtons: [
      <ActionButton
        buttonText="Clear Chat"
        buttonIconSrc={broomImg}
        onClick={() => console.log('Clear chat clicked')}
        isDark={true}
      />
    ],
    promptInputComponent: <PromptInputComponent />,
  },
};