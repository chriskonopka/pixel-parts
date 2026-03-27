import MyProfileSettings from '.';

export default {
  title: 'Chat/MyProfileSettings',
  component: MyProfileSettings,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'The <b>MyProfileSettings</b> component allows enable the use of the profile data in chat prompts.',
      },
    },
  },
};

export const Default = {
    args: {
      userProfile: {
        'Title': 'Partner',
        'Practice Group': 'Healthcare'
      },
      disclaimer: 'Nothing is shared while this is off.'
    }
};