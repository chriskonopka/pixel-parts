import * as React from 'react';
import classnames from 'classnames';

import Button from '../../../Button';
import { colors } from '../../../../styles/colors';
import styles from './ActionButton.module.scss';


export interface ActionButtonProps {
  /**
   * Custom CSS class for the button.
   */
  className?: string;
  /**
   * Whether the button uses a dark theme.
   * @default false
   */
  isDark?: boolean;
  /**
   * Source URL for the button icon.
   */
  buttonIconSrc?: string;
  /**
   * Optional dimensions for the button icon.
   */
  buttonImgDimensions?: {
    width?: number;
    height?: number;
  };
  /**
   * Whether the button is disabled.
   * @default false
   */
  disabled?: boolean;
  /**
   * Optional drawer panel content to display when the button is clicked.
   */
  drawerPanel?: React.ReactElement;
  /**
   * Callback fired when the button is clicked.
   */
  onClick?: () => void;
  /**
   * Text to display on the button.
   */
  ariaLabel?: string;
  /**
   * Optional text to display on the button.
   */
  buttonText?: string;
  /**
   * Whether the button is in an active state.
   * @default false
   */
  isActive?: boolean;
}

const ActionButton = (props: ActionButtonProps): React.ReactElement => {
  const {
    ariaLabel,
    className,
    isDark = false,
    disabled = false,
    isActive = false,
    buttonText,
    buttonIconSrc,
    buttonImgDimensions = { width: 24 },
    onClick
  } = props;

  return (
    <Button
      isActive={isActive}
      aria-label={ariaLabel}
      data-tooltip={!disabled ? ariaLabel : undefined}
      className={classnames(styles.actionButton, className, {
        [styles.isDark]: isDark
      })}
      variant="transparent"
      text={buttonText}
      onClick={onClick}
      disabled={disabled}
      {...(buttonIconSrc && {
        icon: (
          <img
            className={styles.actionButtonIcon}
            src={buttonIconSrc}
            alt=""
            aria-hidden="true"
            width={buttonImgDimensions?.width || 'auto'}
            height={buttonImgDimensions?.height || 'auto'}
          />
        ),
      })}
      {...(isDark && { textColor: colors.white })}
    />
  );
};

export default ActionButton;