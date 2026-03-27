 import TextElement from '.';

export default {
  title: 'Content/TextElement',
  component: TextElement,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: "The <b>TextElement</b> component renders a customizable text element. It allows you to specify the HTML element type (e.g., 'span', 'div', 'p') and apply various styles such as font size, color, alignment, font family, font weight, line height, margin, and padding. Additional props can also be passed to further customize the text element.",
      },
    },
  },
};

export const Default = {
  args: {
    as: 'div',
    children: 'Text Element',
    size: 36,
    weight: 600,
    color: '#333333'
  },
};