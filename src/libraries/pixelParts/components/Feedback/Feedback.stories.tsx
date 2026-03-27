import Feedback from '.';

export default {
  title: 'Controls/Feedback',
  component: Feedback,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'The <b>Feedback</b> component allows users to provide feedback.'
      },
    },
  },
  
};

export const Default = {
  args: {
    onClick: (state) => {
      console.log('Feedback state changed to:', state);
    }
  },
};