import * as React from 'react';
import Favorite from '.';

export default {
  title: 'Controls/Favorite',
  component: Favorite,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'The <b>Favorite</b> component allows users to mark items as favorites or liked.'
      },
    },
  },
  
};

export const Default = {
  decorators: [
    (Story: any) => (
      <div>
        <Story args={{
          onClick: () => { /* no-op */ },
          favorited: {
            iconName: 'FavoriteStarFill',
            iconColor: '#F6C31E',
            text: 'Favorite'
          },
          unFavorited: {
            iconName: 'FavoriteStarFill',
            iconColor: '#d9d9d9',
            text: 'Add Favorite'
          },
        }} />
        <br />
        <Story args={{
          onClick: () => { /* no-op */ },
          isFavorited: true,
          favorited: {
            iconName: 'FavoriteStarFill',
            iconColor: '#F6C31E',
            text: 'Favorited'
          },
          unFavorited: {
            iconName: 'FavoriteStarFill',
            iconColor: '#F6C31E',
            text: 'Add Favorite'
          },
        }} />
      </div>
    ),
  ],
  args: {},
};