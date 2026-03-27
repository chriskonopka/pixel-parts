import * as React from 'react';
import classnames from 'classnames';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './Drawer.module.scss';

export interface DrawerProps {
  /**
   * Whether the drawer is open or closed
   */
  isOpen?: boolean;
  /**
    * Content to display inside the drawer
   */
  children?: React.ReactNode;
  /**
   * Offset from the top of the screen (useful when you have a fixed header)
   */
  topOffset?: string;
  /**
   * Position of the drawer
   */
  position?: 'left' | 'right' | 'top' | 'bottom';
  /**
   * Width of the drawer when positioned left or right
   */
  paneWidth?: string;
  /**
   * Height of the drawer when positioned top or bottom
   */
  panelHeight?: string;
  /**
   * Max height of the drawer panel (when positioned top or bottom)
   * @default '100%'
   */
  panelMaxHeight?: string;
  /**
   * Whether the drawer should be fixed position or not
   */
  isFixedPosition?: boolean;
  /**
   * Reference to the panel element (used for detecting outside clicks)
   */
  panelRef?: React.RefObject<HTMLDivElement>;
  /**
   * Whether to show an overlay when the drawer is open
   * @default true
   */
  //
  hasOverlay?: boolean;
}

const Drawer = ({
  panelRef,
  children,
  isOpen = false,
  topOffset = '0px',
  position = 'top',
  paneWidth = '350px',
  panelHeight = 'auto',
  panelMaxHeight = '100%',
  isFixedPosition = false,
  hasOverlay = true,
}: DrawerProps): React.ReactElement => {
  const [hasOverflow, setHasOverflow] = React.useState(false);

  let property;

  if (position === 'left') {
    property = 'left';
  } else if (position === 'right') {
    property = 'right';
  } else {
    property = 'height';
  }
    
  const animationProps = {
    vertical: {
      initial: { [property]: 0, maxHeight: panelMaxHeight },
      animate: { [property]: panelHeight, maxHeight: panelMaxHeight },
      exit: { [property]: 0, maxHeight: panelMaxHeight },
    },
    ...((position === 'left' || position === 'right') && {
      horizontal: {
        initial: { [property]: `-${paneWidth}`, width: paneWidth },
        animate: { [property]: 0 },
        exit: { [property]: `-${paneWidth}` },
      }
    })
  };

  const isVertical = position === 'top' || position === 'bottom';

  return (
    <div
      style={{ 
        '--topOffset': topOffset,
        '--position': isFixedPosition ? 'fixed' : 'absolute',
      } as React.CSSProperties}
      className={classnames(styles.drawer, styles[position], { 
        [styles.isOpen]: isOpen,
        [styles.hasOverlay]: hasOverlay,
      })}
    >
      <AnimatePresence initial={false} mode="wait">
        {isOpen && (
          <motion.div
            ref={panelRef}
            {...animationProps[isVertical ? 'vertical' : 'horizontal']}
            transition={{ duration: 0.5, ease: [0.25, 0.8, 0.25, 1] }}
            onAnimationStart={() => setHasOverflow(false)}
            onAnimationComplete={() => setHasOverflow(true)}
          >
            {React.Children.map(children, (child) => (
              React.cloneElement(child as React.ReactElement<any>, { position, hasOverflow })
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Drawer;