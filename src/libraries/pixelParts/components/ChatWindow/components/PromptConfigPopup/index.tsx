import * as React from 'react';
import classnames from 'classnames'
;
import Popup, { PopupProps } from '../../../Popup';
import { PopupHandle } from '../../../Popup';
import { usePromptConfigPopupContext } from './PromptConfigPopupProvider';


import { colors } from '../../../../styles/colors';

import styles from './PromptConfigPopup.module.scss';

export { default as PromptConfigPopupProvider } from './PromptConfigPopupProvider';

export interface PromptConfigPopupProps extends Pick<PopupProps, 'inset' | 'width' | 'isRelativeToTrigger'> {
    /**
     * Parent ref to measure width for responsiveness.
     */
    parentRef?: React.RefObject<HTMLElement>;   
    /**
     * Content to display inside the popup.
     */
    children: React.ReactNode;
    /**
     * Text for the button that triggers the popup.
     */
    buttonText: string;
    /**
     * Colors for the button text in default and active states.
     * @default [#000000, #3898ec]
     */
    buttonTextColors?: [string, string],
    /**
     * Title for the popup.
     */
    popupTitle: string;
    /**
     * Whether the popup is active.
     * @default false
     */
    isActive?: boolean;
    /**
     * Icon(s) for the button that triggers the popup. Can be a single icon or an array of two icons for default and active states.
     */
    buttonIcon?: string | [string, string];
    /**
     * Icon for the popup.
     */
    popupIcon?: string;
    /**
     * Width of the popup.
     */
    width?: PopupProps['width'];
    /**
     * Inset for the popup.
     */
    inset?: PopupProps['inset'];
    /**
     * Whether the popup is positioned relative to the trigger element.
     */
    isRelativeToTrigger?: PopupProps['isRelativeToTrigger'];
    /**
     * Whether the button is disabled.
     */
    disabled?: boolean;
}

const PromptConfigPopup = ({
  ref,
  buttonText,
  buttonTextColors = [colors.black, colors.blue],
  popupTitle,
  buttonIcon,
  popupIcon,
  width,
  inset,
  isRelativeToTrigger,
  children,
  isActive = false,
  disabled = false,
}: PromptConfigPopupProps & { ref?: React.Ref<PopupHandle> }) => {

  const { parentRef } = usePromptConfigPopupContext();

  const iconIndex = isActive ? 1 : 0;
  const triggerElementIcon = Array.isArray(buttonIcon) ? buttonIcon[iconIndex] : buttonIcon;

  const buttonStyles = {
    '--defaultButtonTextColor': buttonTextColors[0],
    '--activeButtonTextColor': buttonTextColors[1],
  } as React.CSSProperties;

  const [parentWidth, setParentWidth] = React.useState<number | null>(null);

  const isSmall = parentWidth ? parentWidth < 768 : false;

  const triggerElement = (
    <button 
      disabled={disabled}
      style={{ ...buttonStyles }}
      className={classnames(styles.promptConfigButton, { 
        [styles.isActive]: isActive,
      })} 
      {...(isSmall && { 'aria-label': buttonText })}
    >
      <img 
        className={styles.promptConfigIcon}
        src={triggerElementIcon} 
        alt={`${buttonText} icon`} 
      />
      {!isSmall && buttonText}
    </button>
  );

  const popupProps = isSmall 
    ? { inset: 'auto auto 100% 0', width: '100%' } 
    : { inset, width };

  React.useEffect(() => {
    const el = parentRef?.current;
    if (!el) return;

    const getWidth = () => el.getBoundingClientRect().width;

    setParentWidth(getWidth());

    let ro: ResizeObserver | null = null;

    if (typeof ResizeObserver !== 'undefined') {
      ro = new ResizeObserver((entries) => {
        for (const entry of entries) {
          setParentWidth(entry.contentRect.width);
        }
      });
      ro.observe(el);
    } else {
      const onWinResize = () => setParentWidth(getWidth());
      window.addEventListener('resize', onWinResize);

      return () => window.removeEventListener('resize', onWinResize);
    }

    return () => {
      ro?.disconnect();
    };
  }, [parentRef]);

  return (
    <Popup 
      ref={ref}
      icon={popupIcon} 
      title={popupTitle} 
      triggerElement={triggerElement}
      isRelativeToTrigger={isRelativeToTrigger}
      {...popupProps}
    >
      {children}
    </Popup>
  );
};

export default PromptConfigPopup;