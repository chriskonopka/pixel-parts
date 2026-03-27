import AccordionPanel from '.';

export default {
  title: 'Disclosure/AccordionPanel',
  component: AccordionPanel,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'The <b>AccordionPanel</b> component is a sub-component of an <a href="http://localhost:6006/?path=/docs/disclosure-accordion--docs">Accordion</a> that represents an individual section within the accordion.'
      },
    },
  },
};

export const Default = {
    args: {
      children: 'Accordion Content...',
      title: 'Draft Complaint or Answer',
      subtitle: 'Prepare the initial pleading to commence or respond to litigation.',
      labelText: 1
    },
};

export const Navy = {
  args: {
    children: 'Accordion Content...',
    title: 'Draft Complaint or Answer',
    subtitle: 'Prepare the initial pleading to commence or respond to litigation.',
    labelText: 1,
    variant: 'navy'
  },
};