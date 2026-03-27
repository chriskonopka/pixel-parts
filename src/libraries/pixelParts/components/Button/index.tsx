import * as React from 'react';
import classNames from 'classnames';
import styles from './Button.module.scss';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * The icon prop is the icon displayed inside the button.
   */
  icon?: React.ReactElement;

    /**
   * The icon prop is the icon displayed to the right of the button.
   */
  rightIcon?: React.ReactElement;

  /**
   * The text prop is the text displayed inside the button.
   */
  text?: string | React.ReactNode;

  /**
   * The onClick prop is the function called when the button is clicked.
   */
  onClick?: (e: React.SyntheticEvent) => void;

  /**
   * The variant prop determines the style variant of the button.
   */
  variant?: 'white' | 'lightGray' | 'green' | 'dark' | 'darkMuted' | 'transparent' | 'alert' | 'alertOutline' | 'link' | 'navy' | 'tabNavy';

  /**
   * The className prop allows for additional custom styling.
   */
  className?: string;

  /**
   * The fullWidth prop determines if the button should take the full width of its container.
   */
  fullWidth?: boolean;
  /**
   * The isActive prop determines if the button is active.
   */
  isActive?: boolean;
  /**
   * The textColor prop determines the color of the text inside the button. 
   */
  textColor?: string;
  /**
   * Adds extraa padding to the button
   */
  isLarge?: boolean;
}

const Button = (props: ButtonProps): React.ReactElement => {
  const { 
    icon,
    rightIcon,
    text, 
    onClick, 
    textColor,
    variant = 'dark', 
    className = '', 
    isActive = false, 
    fullWidth = false, 
    disabled = false,
    isLarge = false,
    ...rest 
  } = props;
  
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={classNames(styles.button, styles[variant], className, { 
        [styles.fullWidth]: fullWidth,
        [styles.isActive]: isActive,
        [styles.disabled]: disabled,
        [styles.isLarge]: isLarge
      })}
      {...rest}
    >
      {icon && (
        <span className={styles[variant]}>
          {icon}
        </span>
      )}
      {text && (
        <span className={styles[variant]} style={{ color: textColor }}>
          {text}
        </span>
      )}
       {rightIcon && (
        <span className={styles[variant]}>
          {rightIcon}
        </span>
      )}
    </button>
  );
};

export default Button;