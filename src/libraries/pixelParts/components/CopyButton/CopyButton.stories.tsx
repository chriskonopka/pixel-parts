import CopyButton from '.';

export default {
    title: 'Controls/CopyButton',
    component: CopyButton,
    tags: ['autodocs'],
    parameters: {
    docs: {
      description: {
        component: 'The <b>CopyButton</b> component is used to copy text to the clipboard.',
      },
    },
  },
};

export const WithBasicConfirmation = {
  args: {
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce aliquam volutpat nunc vitae vehicula. Aenean maximus elementum mauris, ut tincidunt lacus vehicula a. Nullam sodales, felis eu maximus malesuada, nibh tortor bibendum nunc, et rhoncus justo nibh a orci.',
    confirmation: {
      type: 'basic',
      message: 'Copied!',
      duration: 1500
    }
  },
};

export const WithToastConfirmation = {
  args: {
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce aliquam volutpat nunc vitae vehicula. Aenean maximus elementum mauris, ut tincidunt lacus vehicula a. Nullam sodales, felis eu maximus malesuada, nibh tortor bibendum nunc, et rhoncus justo nibh a orci.',
    confirmation: {
      type: 'toast',
      message: 'Copied to clipboard!',
      duration: 2000,
      topOffset: 100,
      position: 'top-center'
    }
  },
};