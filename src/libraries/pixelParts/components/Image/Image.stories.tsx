import Image from '.';

export default {
    title: 'Media/Image',
    component: Image,
    tags: ['autodocs'],
    parameters: {
    docs: {
      description: {
        component: 'The <b>Image</b> component is used to display images with optional styling such as rounded or beveled corners.',
      },
    },
  },
};

export const Default = {
  args: {
    width: 50,
    alt: 'assistant image',
    src: 'https://cdn.prod.website-files.com/67642ec2aab22deb663ccb54/676447b388631deee5de1773_Drafting%20-%20Discovery%20Responses%20.webp'
  },
};

export const Round = {
  args: {
    isRound: true,
    width: 50,
    alt: 'assistant image',
    src: 'https://cdn.prod.website-files.com/67642ec2aab22deb663ccb54/676447b388631deee5de1773_Drafting%20-%20Discovery%20Responses%20.webp'
  },
};

export const Beveled = {
  args: {
    isBeveled: true,
    width: 50,
    alt: 'assistant image',
    src: 'https://cdn.prod.website-files.com/67642ec2aab22deb663ccb54/676447b388631deee5de1773_Drafting%20-%20Discovery%20Responses%20.webp'
  },
};