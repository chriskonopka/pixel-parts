import ClearChat from '.';

export default {
  title: 'Chat/ClearChat',
  component: ClearChat,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'The <b>ClearChat</b> component allows users to clear the chat history.',
      },
    },
  },
};

export const Default = {
    args: {
        onClear: () => console.log('Clear chat clicked'),
        onCancel: () => console.log('Cancel clicked'),
    }
};