import DownloadDocuments from '.';

export default {
  title: 'Chat/DownloadDocuments',
  component: DownloadDocuments,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'The <b>DownloadDocuments</b> component allows users to download documents in different formats. It provides buttons for downloading Word and PDF files.',
      },
    },
  },
};

export const Default = {
    args: {
      onCancel: () => console.log('Cancel clicked'),
      onClick: (docType) => console.log('Download clicked for:', docType),
    }
};