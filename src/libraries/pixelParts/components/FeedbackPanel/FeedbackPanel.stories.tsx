import FeedbackPanel from '.';

export default {
  title: 'Disclosure/FeedbackPanel',
  component: FeedbackPanel,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'The <b>FeedbackPanel</b> component allows users to provide feedback.'
      },
    },
  },
  
};

export const Default = {
  args: {
    onSubmit: (value: string) => console.log(`Feedback submitted: ${value}`),
  },
};