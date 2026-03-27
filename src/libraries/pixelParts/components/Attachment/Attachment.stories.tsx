import * as React from 'react';
import Attachment from '.';

export default {
  title: 'File Upload/Attachment',
  component: Attachment,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'The <b>Attachment</b> component displays a file attachment with its name, icon, and type.'
      },
    },
  },
};

export const Document = {
    parameters: {
        docs: {
            description: {
                story: 'Non-image file types are displayed in a color coded manner.'
            },
        },
    },
    decorators: [
        (Story: any) => (
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                <Attachment
                    attachment={{
                        fileName: 'Word Document.docx',
                        type: 'DOCX',
                    }}
                />
                <Attachment
                    attachment={{
                        fileName: 'PDF Document.pdf',
                        type: 'PDF',
                    }}
                />
                <Attachment
                    attachment={{
                        fileName: 'Text Document.txt',
                        type: 'TXT',
                    }}
                />
                <Attachment
                    attachment={{
                        fileName: 'Spreadsheet.xlsx',
                        type: 'XLSX',
                    }}
                />
                <Attachment
                    attachment={{
                        fileName: 'PowerPoint.pptx',
                        type: 'PPTX',
                    }}
                />
                <Attachment
                    attachment={{
                        fileName: 'Zoom.vtt',
                        type: 'VTT',
                    }}
                />
            </div>
        ),
    ],
    args: {
        onRemove: () => console.log('Remove clicked')
    },
};

export const Image = {
    parameters: {
        docs: {
            description: {
                story: 'Image file types display a thumbnail preview of the image.'
            },
        },
    },
    args: {
        attachment: {
          fileName: 'example.png',
          iconName: 'Image',
          type: 'image/png',
          previewUrl: 'https://mcdermottwillemery.sharepoint.com/sites/home/News%20Images/1%20-%20Homepage%20Images%20-%20McDermott%20Will%20&%20Schulte%208-2025/Deal%20announcements%203.jpg'
        },
    },
};

export const WithRemoveButton = {
    parameters: {
        docs: {
            description: {
                story: 'The Attachment can include an optional remove button that triggers a callback when clicked.'
            },
        },
    },
    decorators: [
        () => (
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                <Attachment
                    onRemove={() => {}}
                    attachment={{
                        fileName: 'PDF Document.pdf',
                        type: 'PDF',
                    }}
                />
                <Attachment
                    onRemove={() => {}}
                    attachment={{
                        fileName: 'Screenshow.png',
                        type: 'PNG',
                        previewUrl: 'https://mcdermottwillemery.sharepoint.com/sites/home/News%20Images/1%20-%20Homepage%20Images%20-%20McDermott%20Will%20&%20Schulte%208-2025/Deal%20announcements%203.jpg'
                    }}
                />
            </div>
        ),
    ],
    args: {
        onRemove: () => console.log('Remove clicked')
    },
};

export const Loading = {
    parameters: {
        docs: {
            description: {
                story: 'The Attachment component can display a loading state, indicating that the attachment is being processed or uploaded.'
            },
        },
    },
    decorators: [
        () => (
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                <Attachment
                    isLoading={true}
                    onRemove={() => {}}
                    attachment={{
                        fileName: 'PDF Document.pdf',
                        type: 'PDF',
                    }}
                />
                <Attachment
                    isLoading={true}
                    onRemove={() => {}}
                    attachment={{
                        fileName: 'Screenshow.png',
                        type: 'PNG',
                        previewUrl: 'https://mcdermottwillemery.sharepoint.com/sites/home/News%20Images/1%20-%20Homepage%20Images%20-%20McDermott%20Will%20&%20Schulte%208-2025/Deal%20announcements%203.jpg'
                    }}
                />
            </div>
        ),
    ],
    args: {},
};