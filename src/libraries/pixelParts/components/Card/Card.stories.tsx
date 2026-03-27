import * as React from 'react';
import { CalendarRegular } from '@fluentui/react-icons';
import Card from '.';

const Button = ({ onClick }: { onClick: () => void }): React.ReactElement => {
  return (
    <button onClick={onClick} style={{
      backgroundColor: '#292929',
      cursor: 'pointer',
      border: '1px solid #00a68e',
      display: 'block',
      color: '#fff',
      width: '100%',
      height: 40,
      padding: '0 20px',
      borderRadius: 6,
      fontSize: 15
    }}>
      Explore Resources
    </button>
  );
};

export default {
  title: 'Containers/Card',
  component: Card,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'The <b>Card</b> component is a versatile UI element used to display content in a structured and visually appealing manner.'
      },
    },
  },
};

export const LightCard = {
  args: {
    onClick: null,
    onClickTarget: undefined,
    icon: <CalendarRegular style={{ fontSize: 40, color: '#00a68e' }} aria-hidden="true" focusable={false} />,
    cardTitle: 'Card Title',
    children: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum ornare blandit leo et bibendum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae.'
  },
};

export const LightCardWithShadow = {
  args: {
    hasShadow: true,
    onClick: null,
    onClickTarget: undefined,
    icon: <CalendarRegular style={{ fontSize: 40, color: '#00a68e' }} aria-hidden="true" focusable={false} />,
    cardTitle: 'Card Title',
    children: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum ornare blandit leo et bibendum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae.'
  },
};

export const GrayCard = {
  args: {
    onClick: null,
    onClickTarget: undefined,
    isGray: true,
    icon: <CalendarRegular style={{ fontSize: 40, color: '#00a68e' }} aria-hidden="true" focusable={false} />,
    cardTitle: 'Card Title',
    children: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum ornare blandit leo et bibendum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae.'
  },
};

export const DarkCard = {
  decorators: [
    (Story: any) => (
      <div style={{ padding: 30, backgroundColor: '#292929' }}>
        <Story />
      </div>
    ),
  ],
  args: {
    onClick: null,
    onClickTarget: undefined,
    isDark: true,
    icon: <CalendarRegular style={{ fontSize: 40, color: '#00a68e' }} aria-hidden="true" focusable={false} />,
    cardTitle: 'Card Title',
    children: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum ornare blandit leo et bibendum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae.'
  },
};

export const ClickableLightCardAsLink = {
  args: {
      onClick: () => {},
      onClickTarget: undefined,
      icon: <CalendarRegular style={{ fontSize: 40, color: '#00a68e' }} aria-hidden="true" focusable={false} />,
      cardTitle: 'Card Title',
      children: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum ornare blandit leo et bibendum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae.'
  },
};

export const ClickableLightCardAsButton = {
  args: {
      isLink: false,
      onClick: () => {},
      onClickTarget: undefined,
      icon: <CalendarRegular style={{ fontSize: 40, color: '#00a68e' }} aria-hidden="true" focusable={false} />,
      cardTitle: 'Card Title',
      children: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum ornare blandit leo et bibendum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae.'
  },
};

export const ClickableDarkCardAsLink = {
  decorators: [
    (Story: any) => (
      <div style={{ padding: 30, backgroundColor: '#292929' }}>
        <Story />
      </div>
    ),
  ],
  args: {
      onClick: () => {},
      onClickTarget: undefined,
      isDark: true,
      icon: <CalendarRegular style={{ fontSize: 40, color: '#00a68e' }} aria-hidden="true" focusable={false} />,
      cardTitle: 'Card Title',
      children: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum ornare blandit leo et bibendum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae.'
  },
};

export const ClickableDarkCardAsButton = {
  decorators: [
    (Story: any) => (
      <div style={{ padding: 30, backgroundColor: '#292929' }}>
        <Story />
      </div>
    ),
  ],
  args: {
      isLink: false,
      onClick: () => {},
      onClickTarget: undefined,
      isDark: true,
      icon: <CalendarRegular style={{ fontSize: 40, color: '#00a68e' }} aria-hidden="true" focusable={false} />,
      cardTitle: 'Card Title',
      children: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum ornare blandit leo et bibendum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae.'
  },
};

export const LightCardWithFooter = {
  args: {
      onClick: () => {},
      onClickTarget: undefined,
      footer: 'Footer content',
      icon: <CalendarRegular style={{ fontSize: 40, color: '#00a68e' }} aria-hidden="true" focusable={false} />,
      cardTitle: 'Card Title',
      children: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum ornare blandit leo et bibendum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae.'
  },
};

export const DarkCardWithFooter = {
  decorators: [
    (Story: any) => (
      <div style={{ padding: 30, backgroundColor: '#292929' }}>
        <Story />
      </div>
    ),
  ],
  args: {
      onClick: null,
      onClickTarget: undefined,
      isDark: true,
      footer: 'Footer content',
      icon: <CalendarRegular style={{ fontSize: 40, color: '#00a68e' }} aria-hidden="true" focusable={false} />,
      cardTitle: 'Card Title',
      children: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum ornare blandit leo et bibendum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae.'
  },
};

export const DarkCardWithClickableBody = {
  decorators: [
    (Story: any) => (
      <div style={{ padding: 30, backgroundColor: '#292929' }}>
        <Story />
      </div>
    ),
  ],
  args: {
      onClick: () => {},
      onClickTarget: 'CardBody',
      isDark: true,
      footer: 'Footer content',
      icon: <CalendarRegular style={{ fontSize: 40, color: '#00a68e' }} aria-hidden="true" focusable={false} />,
      cardTitle: 'Card Title',
      children: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum ornare blandit leo et bibendum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae.'
  },
};

export const LightCardWithClickableBody = {
  args: {
      onClick: () => {},
      onClickTarget: 'CardBody',
      isDark: false,
      footer: 'Footer content',
      icon: <CalendarRegular style={{ fontSize: 40, color: '#00a68e' }} aria-hidden="true" focusable={false} />,
      cardTitle: 'Card Title',
      children: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum ornare blandit leo et bibendum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae.'
  },
};

export const CustomCardWithHero = {
  decorators: [
    (Story: any) => (
      <div style={{ padding: 30, backgroundColor: '#292929' }}>
        <div style={{ width: 432, margin: '0 auto' }}>
          <Story />
        </div>
      </div>
    ),
  ],
  args: {
      hasCardHero: true,
      heroBackgroundImage: 'https://cdn.prod.website-files.com/65b17c65c1181a327c7b9a74/6734052d9776c55a373bc2aa_Productivity.png',
      heroBorderColor: '#7379b9',
      isBorderless: true,
      fontColor: '#fff',
      backgroundColor: '#181818',
      cardTitle: 'Resources',
      cardPadding: 0,
      footerPadding: 10,
      children: <p style={{ marginBottom: 20 }}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sed pretium nisi, at vehicula sem. Curabitur at dictum turpis, sit amet convallis ipsum.</p>,
      footer: <Button onClick={() => {}} />
  },
};