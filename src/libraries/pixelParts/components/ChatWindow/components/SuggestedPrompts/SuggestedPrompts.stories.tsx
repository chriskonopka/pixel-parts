import SuggestedPrompts from '.';

export default {
  title: 'Chat/SuggestedPrompts',
  component: SuggestedPrompts,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'The <b>SuggestedPrompts</b> component displays a list of suggested prompts for the user to choose from.'
      },
    },
  },
};

const suggestedPrompts = [
  { Title: 'Prompt Title', Prompt: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vel eros ante.' },
  { Title: 'Prompt Title',  Prompt: 'Quisque ac diam dictum, malesuada tellus ut, interdum orci. Nullam non orci ut justo dictum sodales ut nec ipsum. In iaculis nec ligula eu scelerisque.' },
  { Title: 'Prompt Title',  Prompt: 'Aliquam iaculis sollicitudin felis, vitae iaculis libero faucibus non.' },
  { Title: 'Prompt Title',  Prompt: 'Nullam non orci ut justo dictum sodales ut nec ipsum. In iaculis nec ligula eu scelerisque.' }
];

export const Default = {
    args: {
        prompts: suggestedPrompts,
        onSelect: (prompt) => console.log(prompt)
    }
};