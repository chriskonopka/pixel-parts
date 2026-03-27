import UploadedFilesList from '.';

export default {
  title: 'Chat/UploadedFilesList',
  component: UploadedFilesList,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'The <b>UploadedFilesList</b> component displays a list of uploaded files within the chat interface.'
      },
    },
  },
};

const files = [
  new File(["Sample PowerPoint content"], "presentation.pptx", { type: "application/vnd.openxmlformats-officedocument.presentationml.presentation" }),
  new File(["Sample Word document content"], "document_with_really_long_name.docx", { type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document" }),
  new File(["Sample Excel spreadsheet content"], "spreadsheet.xlsx", { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" }),
  new File(["Hello, this is a text file."], "notes.txt", { type: "text/plain" })
];

export const Default = {
  args: {
    text: 'Uploaded files—added through the chat—are used to inform the assistant\'s responses with relevant context. Removing a file will clear it from the current session. Uploaded files will be converted to PDF format for compatibility purposes.',
    noFilesText: 'No Files have been uploaded to the chat.',
    items: [{ files, key: 'abc-123' }],
    onRemove: (key, fileName) => console.log(`Remove file ${fileName} from group ${key}`),
  },
};