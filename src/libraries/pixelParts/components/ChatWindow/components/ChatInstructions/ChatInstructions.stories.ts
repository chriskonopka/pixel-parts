import ChatInstructions from '.';

export default {
  title: 'Chat/ChatInstructions',
  component: ChatInstructions,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'The <b>ChatInstructions</b> component displays a list of instructions on how to use the chat feature.'
      },
    },
  },
};

export const Default = {
    args: {
      instructions: [
        'Upload example input documents.',
        'Provide context and a prompt in the chat window to run against your attachment or content.',
        'Chat freely to explore the results and dig deeper.'
      ],
      instructionNumberAlignment: 'center'
    },
};

export const InstructionsWithTitle = {
    args: {
      instructions: [
        {
          "title": "Upload example input documents",
          "text": "DOCX, PDF, TXT, or XLS to begin analysis"
        },
        {
          "title": "Provide context and a prompt in the chat window to run against your attachment or content",
          "text": "Example: “Do you see any vague terms in the indemnity clause?"
        },
        {
          "title": "Chat freely to explore the results and dig deeper",
          "text": "If we commit $3 million to the joint venture, is this allowed?"
        }
      ],
    },
};