import FileIcon from '.';

export default {
  title: 'Content/FileIcon',
  component: FileIcon,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'The <b>FileIcon</b> component renders a file icon with a corresponsing color nased on the file type.'
      },
    },
  },
};

export const Default = {
  args: {
    fileName: 'MyDocument.pdf'
  },
};