import * as React from 'react';

import Drawer from '.';
import useDrawer from './useDrawer';

import DrawerPanel from '../DrawerPanel';
import Button from '../Button';
import FlexBox from '../FlexBox';

import { colors } from '../../styles/colors';

export default {
  title: 'Disclosure/Drawer',
  component: Drawer,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'The <b>Drawer</b> component provides a sliding panel interface that is typically used for navigation menus, contextual options, filters, or additional content that complements the main view without fully navigating away.<br /><br />Uses <a href="http://localhost:6006/?path=/docs/disclosure-drawerpanel--docs">DrawerPanel</a>.'
      },
    },
  },
};

export const Default = {
    render: (Story: any) => {
      const parentRef = React.useRef<HTMLDivElement>(null);
      const panelRef = React.useRef<HTMLDivElement>(null);

      const { openDrawer, closeDrawer, isOpen } = useDrawer([panelRef]);

      const [position, setPosition] = React.useState<'top' | 'bottom' | 'left' | 'right'>('top');

      const onClose = () => {
        closeDrawer();
      }

      const onOpen = (position: 'top' | 'bottom' | 'left' | 'right') => {
        setPosition(position);
        openDrawer();
      }

      return (
        <div ref={parentRef} style={{ 
          height: '50vh', 
          minHeight: 300,
          border: `1px solid ${colors.cardBorderLight}`, 
          borderRadius: 8,
          overflow: 'hidden', 
          position: 'relative', 
          padding: 20 
        }}>
            <FlexBox spacing={10}>
              <Button
                onClick={() => onOpen('top')}
                text="Top"
                variant="white"
              />
              <Button
                onClick={() => onOpen('bottom')}
                text="Bottom"
                variant="white"
              />
              <Button
                onClick={() => onOpen('left')}
                text="Left"
                variant="white"
              />
              <Button
                onClick={() => onOpen('right')}
                text="Right"
                variant="white"
              />
            </FlexBox>
            <Drawer panelRef={panelRef} isOpen={isOpen} position={position}>
              <DrawerPanel
                title="Drawer Title"
                description="This drawer has a lot of content."
                onClose={onClose}
              >
                Integer augue magna, scelerisque ut est ut, aliquam ultrices magna. Sed congue diam id ligula ultrices sollicitudin. Pellentesque urna leo, scelerisque eget efficitur vel, ultrices sit amet urna. Quisque vel blandit nibh. Morbi rhoncus lectus non tortor gravida, in imperdiet metus suscipit. Vestibulum quis dapibus justo. Praesent metus sapien, ultricies eu urna ac, ullamcorper aliquam eros. Praesent dignissim sem metus, eget dictum libero ullamcorper nec. Nulla vitae odio eu odio aliquam semper eu eget diam. Quisque ex neque, ullamcorper non lacinia in, lobortis nec diam. Duis cursus, nisl at egestas condimentum, ante justo sodales nisl, ac fringilla nulla libero non ex. Aliquam blandit, turpis vel mattis euismod, sapien urna ornare orci, nec commodo nisi velit nec ex. Donec lacinia augue id nisl rutrum lacinia. Aenean eu sagittis ante. Maecenas nec nibh non tortor laoreet venenatis sit amet eget libero.
              </DrawerPanel>
            </Drawer>
        </div>
      );
    },
    args: {},
};