import * as React from 'react';
import FileUpload from '.';

export default {
  title: 'File Upload/FileUpload',
  component: FileUpload,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'The <b>FileUpload</b> component renders a button that allows users to upload files.',
      },
    },
  },
};

export const Default = {
  args: {
    accept: '.doc, .docx, .pdf',
    onFileSelect: (file: File | FileList) => console.log(file),
  },
};

export const WithCustomIcon = {
  args: {
    icon: 'Attach',
    accept: '.doc, .docx, .pdf',
    onFileSelect: (file: File | FileList) => console.log(file),
  },
};

export const WithTooltip = {
  decorators: [
    (Story: any) => (
      <div style={{ paddingTop: 50 }}>
        <Story />
      </div>
    ),
  ],
  args: {
    triggerOnTooltipClick: true,
    accept: '.doc, .docx, .pdf',
    onFileSelect: (file: File | FileList) => console.log(file),
  },
};

export const Button = {
  args: {
    icon: 'CloudUpload',
    iconSize: 25,
    iconColor: '#000',
    accept: '.doc, .docx, .pdf',
    onFileSelect: (file: File | FileList) => console.log(file),
    variant: 'button' as const,
    buttonText: 'Upload Document'
  },
};

export const LargeButton = {
  args: {
    icon: 'CloudUpload',
    iconSize: 35,
    iconColor: '#000',
    accept: '.doc, .docx, .pdf',
    onFileSelect: (file: File | FileList) => console.log(file),
    variant: 'button' as const,
    buttonText: 'Upload Document',
    isLarge: true,
  },
};
