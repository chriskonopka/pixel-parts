import * as React from 'react';
import Toast from './';
import Button from '../Button';

export default {
  title: 'Feedback/Toast',
  component: Toast,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'A <b>Toast</b> component displays brief messages to inform users about app processes or actions.',
      },
    },
  },
};

export const darkTheme = {
  args: {},
  decorators: [
    (Story: any) => {
        const [showToast, setShowToast] = React.useState(false);

        return (
            <>
                <Button 
                    text="Show Toast" 
                    onClick={() => setShowToast(true)}
                    variant="green"
                />
                <Toast
                    message="This is a toast message."
                    isVisible={showToast}
                    icon="CheckMark"
                    iconColor="#0bad5e"
                    position="top-center"
                    topOffset={100}
                    duration={{  
                        length: 2000, 
                        onEnd: () => setShowToast(false) 
                    }}
                />
            </>
        );
    },
  ],
};