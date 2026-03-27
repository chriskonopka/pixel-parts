import React from 'react';
import Accordion from '.';
import AccordionPanel from '../AccordionPanel';

export default {
  title: 'Disclosure/Accordion',
  component: Accordion,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'An <b>Accordion</b> component can be used to expand and collapse sections of content. <br /><br />Uses <a href="http://localhost:6006/?path=/docs/disclosure-accordionpanel--docs">AccordionPanel</a>.'
      },
    },
  },
};

export const Default = {
    args: {
      children: [
        <AccordionPanel
          key={1}
          labelText="1"
          subtitle="Prepare the initial pleading to commence or respond to litigation."
          title="Draft Complaint or Answer"
        >
          Accordion Content...
        </AccordionPanel>,
        <AccordionPanel
          key={1}
          labelText="2"
          subtitle="Prepare the initial pleading to commence or respond to litigation."
          title="Draft Complaint or Answer"
        >
        Accordion Content...
      </AccordionPanel>,
      <AccordionPanel
        key={1}
        labelText="3"
        subtitle="Prepare the initial pleading to commence or respond to litigation."
        title="Draft Complaint or Answer"
      >
        Accordion Content...
      </AccordionPanel>
    ]
  },
};