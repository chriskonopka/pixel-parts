import React, { useState } from 'react';
import { Meta, StoryFn, StoryContext } from '@storybook/react';
import SearchBox, { SearchBoxProps } from './';

export default {
  title: 'Input/SearchBox',
  component: SearchBox,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'The SearchBox component allows users to search for content with a modern interface and various customization options.',
      },
    },
  },
} as Meta<typeof SearchBox>;

const Template: StoryFn<SearchBoxProps> = (args) => {
  const [searchValue, setSearchValue] = useState<string>(args.value || '');

  const handleSearchBoxChange = (newVal: string): void => {
    setSearchValue(newVal);
  };

  const handleSearchBoxClear = (): void => {
    setSearchValue('');
  };

  return (
    <SearchBox
      {...args}
      value={searchValue}
      onChange={handleSearchBoxChange}
      onClear={handleSearchBoxClear}
      onSearch={() => console.log('onSearch', searchValue)}
      placeholder="Search"
    />
  );
};

export const Dark = Template.bind({});
Dark.args = {
  value: '',
  showIcon: true,
  styleType: 'dark',
  autoComplete: 'off',
};

Dark.decorators = [
  (
    Story: StoryFn<SearchBoxProps>,
    context: StoryContext<SearchBoxProps>
  ): JSX.Element => (
    <div style={{ padding: 20, backgroundColor: '#000' }}>
      {Story(context.args, context)}
    </div>
  ),
];

export const Light = Template.bind({});
Light.args = {
  value: '',
  showIcon: true,
  styleType: 'main',
  autoComplete: 'off',
};

export const LightWithShadow = Template.bind({});
LightWithShadow.args = {
  value: '',
  showIcon: true,
  autoComplete: 'off',
  hasShadow: true,
  hasFileAttachment: true,
  hasImageAttachment: true,
  onFileSelect: (file: File | FileList, isSameFileType?: boolean) => {
    console.log(file, isSameFileType);
  },
};

export const LightWithAttachments = Template.bind({});
LightWithAttachments.args = {
  value: '',
  styleType: 'main',
  showIcon: false,
  hasFileAttachment: true,
  hasImageAttachment: true,
  onFileSelect: (file: File | FileList, isSameFileType?: boolean) => {
    console.log(file, isSameFileType);
  },
  autoComplete: 'off',
};

export const Multiline = Template.bind({});
Multiline.args = {
  value: '',
  showIcon: true,
  isMultiline: true,
  autoComplete: 'off',
};

export const Disabled = Template.bind({});
Disabled.args = {
  value: '',
  showIcon: false,
  hasFileAttachment: true,
  hasImageAttachment: true,
  styleType: 'main',
  disabled: true,
  onFileSelect: (file: File | FileList, isSameFileType?: boolean) => {
    console.log(file, isSameFileType);
  },
  autoComplete: 'off',
};

export const WithCancelButton = Template.bind({});
WithCancelButton.args = {
  value: 'Summarize the content of the document',
  showIcon: false,
  hasFileAttachment: true,
  hasImageAttachment: true,
  styleType: 'main',
  isLoading: true,
  disabled: true,
  autoComplete: 'off',
  onFileSelect: (file: File | FileList, isSameFileType?: boolean) => {
    console.log(file, isSameFileType);
  },
  onCancel: () => {
    console.log('Cancel button clicked');
  },
};