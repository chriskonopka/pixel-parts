import DefinitionList from '.';

export default {
    title: 'Data Display/DefinitionList',
    component: DefinitionList,
    tags: ['autodocs'],
    parameters: {
    docs: {
      description: {
        component: 'The <b>DefinitionList</b> component is used to display a list of key-value pairs.',
      },
    },
  },
};

export const Default = {
  args: {
    data: {
        Name: 'John Doe',
        Title: 'Partner',
        Practice: 'Healthcare',
        Office: 'New York',
    }
  },
};