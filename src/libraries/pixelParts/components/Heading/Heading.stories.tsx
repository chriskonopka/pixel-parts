import Heading from '.';

export default {
    title: 'Content/Heading',
    component: Heading,
    tags: ['autodocs'],
    parameters: {
        docs: {
            description: {
                component: 'The <b>Heading</b> component is used to render a heading element with optional bottom border.'
            },
        },
    },
};

export const Default = {
  args: {
    children: 'This is a Heading'
  },
};

export const HeadingWithBorder = {
  args: {
    children: 'This is a Heading',
    hasBottomBorder: true
  },
};