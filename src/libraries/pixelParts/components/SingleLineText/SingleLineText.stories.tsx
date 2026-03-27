import SingleLineText from './';

export default {
  title: 'Content/SingleLineText',
  component: SingleLineText,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'The <b>SingleLineText</b> component is used to display a single line of text with ellipsis functionality when the text overflows its container.',
      },
    },
  },
};

export const Default = {
  args: {
    text: 'Ut faucibus justo elit, vitae consequat lectus auctor et. Suspendisse potenti. Nulla rhoncus elementum metus vel porta. Maecenas efficitur odio lectus, sed blandit lacus suscipit sit amet.'
  },
};