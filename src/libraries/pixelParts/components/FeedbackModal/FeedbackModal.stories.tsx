import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import FeedbackModal, { IFeedbackModalProps } from '.';

export default {
  title: 'Disclosure/FeedbackModal',
  component: FeedbackModal,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'The <b>FeedbackModal</b> component displays a modal dialog for collecting user feedback, optionally allowing selection of feedback types.',
      },
    },
  },
  argTypes: {
    onClose: { action: 'onClose' },
    onSubmit: { action: 'onSubmit' },
  },
  decorators: [
    (Story) => (
      <div style={{ width: 700, height: 500 }}>
        <Story />
      </div>
    ),
  ],
} as Meta<IFeedbackModalProps>;

const Template: StoryFn<IFeedbackModalProps> = args => <FeedbackModal {...args} />;

export const Default = Template.bind({});
Default.args = {
  title: 'Send Us Feedback',
  // both follow-up & anonymous enabled by default
};

export const WithInputType = Template.bind({});
WithInputType.args = {
  title: 'Report an Issue or Request',
  inputOptions: [
    { key: 'bug', text: 'Bug Report' },
    { key: 'enhancement', text: 'Enhancement Request' },
    { key: 'other', text: 'Other' },
  ],
  // only show follow-up, hide the anonymous option for this variant
  showAnonymousOption: false,
  showFollowUpOptions: false
};
