import * as React from 'react';
import PageBanner from '.';
import PageBannerTitle from '../PageBannerTitle';

import Favorite from '../Favorite';
import Image from '../Image';

export default {
  title: 'Containers/PageBanner',
  component: PageBanner,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'The <b>PageBanner</b> can be used to display various content related to a page such as a title, links, actions or text. Content can be arranged on the left or right side. <br /><br />Can be used with the <a href="http://localhost:6006/?path=/docs/content-pagebannertitle--docs">PageBannerTitle</a> or any other HTML element.',
      },
    },
  },
};

export const Default = {
  args: {
    breadcrumbs: ['Resources','ChatGPT Enterprise'],
    leftContent: (
      <PageBannerTitle 
        title="McDermott AI Chat" 
        subtitle="Ut faucibus justo elit, vitae consequat lectus auctor et. Suspendisse potenti. Nulla rhoncus elementum metus vel porta."
        icon={
          <Image 
            src="https://mcdermottwillemery.sharepoint.com/sites/AI-Staging/SiteAssets/Images/mai-chat-logo.png?csf=1&web=1&e=jbWgSn&CID=e3fd921e-10ad-4965-bcd0-c36c43c89fbb" 
            width="44" 
            alt="logo"
            isRound
          /> 
        }
      />
    ),
    rightContent: (
      <Favorite 
        onClick={() => {}} 
        favorited={{
          iconName: 'FavoriteStarFill',
          iconColor: '#F6C31E',
          text: 'Favorite',
        }}
        unFavorited={{
          iconName: 'FavoriteStarFill',
          iconColor: '#d9d9d9',
          text: 'Add Favorite',
        }}
      />
    ),
  },
};