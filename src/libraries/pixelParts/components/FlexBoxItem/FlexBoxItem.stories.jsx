import FlexBoxItem from '.';

export default {
  title: 'Layout/FlexBoxItem',
  component: FlexBoxItem,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'The <b>FlexBoxItem</b> component is a sub-component of the <a href="http://localhost:6006/?path=/docs/layout-maiflexbox--docs">FlexBox</a> component and is used is used to create flexible items within a FlexBox container, allowing for individual control over flex properties such as growth, shrinkage, basis, alignment, and order.'
      },
    },
  },
};

export const Default = {
  args: {
    children: 'FlexBoxItem Content',
    flexGrow: 1,
    alignSelf: 'center'
  },
};