import * as React from "react";
import SliderSwitch from ".";

export default {
  title: "Input/SliderSwitch",
  component: SliderSwitch,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "The <b>SliderSwitch</b> component allows users to toggle between two states.",
      },
    },
  },
};

export const WithButtonText = {
  render: (args) => {
    const [showSummary, setShowSummary] = React.useState(true);
    const [showDocuments, setShowDocuments] = React.useState(false);
    const [showChat, setShowChat] = React.useState(false);

    return (
      <div style={{ display: "flex", gap: "10px", marginBottom: 30 }}>
        <SliderSwitch
          {...args}
          buttonIconSrc="https://cdn.prod.website-files.com/67642ec2aab22deb663ccb28/687fe0a550ad347662fe6079_Paragraph%20Black.svg"
          onChange={() => setShowSummary(!showSummary)}
          text="Summary"
          checked={showSummary}
          accessibilityLabel="Generated Summary"
        />
        <SliderSwitch
          {...args}
          buttonIconSrc="https://cdn.prod.website-files.com/67642ec2aab22deb663ccb28/687fc7d504e34790068a1a0d_Document.svg"
          onChange={() => setShowDocuments(!showDocuments)}
          text="Document"
          checked={showDocuments}
          accessibilityLabel="Uploaded Document"
        />
        <SliderSwitch
          {...args}
          buttonIconSrc="https://cdn.prod.website-files.com/67642ec2aab22deb663ccb28/687fdfb4b67a4189584c80a3_AI_Black.svg"
          onChange={() => setShowChat(!showChat)}
          text="Chat"
          checked={showChat}
          accessibilityLabel="AI Chat"
        />
      </div>
    );
  },
  args: {
    buttonIconSrc:
      "https://cdn.prod.website-files.com/67642ec2aab22deb663ccb28/687fe0a550ad347662fe6079_Paragraph%20Black.svg",
    text: "Summary",
    checked: true,
    accessibilityLabel: "Generated Summary",
    onChange: (checked: boolean) => {
      console.log("Switch changed to:", checked);
    },
  },
};

export const WithNoButtonText = {
  render: (args) => {
    const [showSummary, setShowSummary] = React.useState(true);
    const [showDocuments, setShowDocuments] = React.useState(false);
    const [showChat, setShowChat] = React.useState(false);

    return (
      <div style={{ display: "flex", gap: "10px", marginBottom: 30 }}>
        <SliderSwitch
          {...args}
          buttonIconSrc="https://cdn.prod.website-files.com/67642ec2aab22deb663ccb28/687fe0a550ad347662fe6079_Paragraph%20Black.svg"
          onChange={() => setShowSummary(!showSummary)}
          checked={showSummary}
          accessibilityLabel="Generated Summary"
        />
        <SliderSwitch
          {...args}
          buttonIconSrc="https://cdn.prod.website-files.com/67642ec2aab22deb663ccb28/687fc7d504e34790068a1a0d_Document.svg"
          onChange={() => setShowDocuments(!showDocuments)}
          checked={showDocuments}
          accessibilityLabel="Uploaded Document"
        />
        <SliderSwitch
          {...args}
          buttonIconSrc="https://cdn.prod.website-files.com/67642ec2aab22deb663ccb28/687fdfb4b67a4189584c80a3_AI_Black.svg"
          onChange={() => setShowChat(!showChat)}
          checked={showChat}
          accessibilityLabel="AI Chat"
        />
      </div>
    );
  },
};

export const Disabled = {
  args: {
    disabled: true,
    buttonIconSrc:
      "https://cdn.prod.website-files.com/67642ec2aab22deb663ccb28/687fe0a550ad347662fe6079_Paragraph%20Black.svg",
    text: "Summary",
    checked: false,
    accessibilityLabel: "Generated Summary",
    onChange: () => {},
  },
};
