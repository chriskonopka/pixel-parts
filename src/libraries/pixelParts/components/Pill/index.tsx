import * as React from 'react';
import classNames from 'classnames';
import styles from './Pill.module.scss';

export interface PillProps extends React.HTMLProps<HTMLDivElement> {
  /**
   * The color prop determines the background color of the pill.
   */
  color: 'blue' | 'green' | 'purple' | 'orange';
  
  /**
   * The darkMode prop sets the text color to white if true, black if false.
   */
  darkMode: boolean;
  
  /**
   * The text prop is the text displayed on the pill.
   */
  text: string;
  
  /**
   * The link prop is the URL to navigate to when the pill is clicked.
   */
  link?: string;
  
  /**
   * The clickable prop determines if the pill is a button or a div.
   */
  clickable?: boolean;
  
  /**
   * The isLarge prop determines if the pill should have the large class.
   */
  isLarge?: boolean;

  /**
   * The endIcon prop is an optional element to be displayed at the right side of the text.
   */
  endIcon?: React.ReactNode;

  /**
   * The styles prop allows for custom styles to be added.
   */
  style?: React.CSSProperties;
}

const Pill = ({
  color,
  darkMode,
  text,
  link,
  clickable = true,
  isLarge = false,
  endIcon,
  style: customStyles,
  ...rest
}: PillProps): React.ReactElement => {
  const textColor = darkMode ? 'white' : 'black';
  const pillClass = classNames(styles.pill, styles[color], {
    [styles.clickable]: clickable,
    [styles.large]: isLarge,
  });

  // Unified click handler that works for both div and button
  const handleClick: React.MouseEventHandler<HTMLElement> = (): void => {
    if (link) {
      window.location.href = link;
    }
  };

  const content = (
    <>
      <span>{text}</span>
      {endIcon && <span className={styles.endIcon}>{endIcon}</span>}
    </>
  );

  if (clickable) {
    return (
      <button
        className={pillClass}
        style={{ color: textColor, ...customStyles }}
        onClick={handleClick}
        {...(rest as unknown as React.ButtonHTMLAttributes<HTMLButtonElement>)}
      >
        {content}
      </button>
    );
  } else {
    return (
      <div
        className={pillClass}
        style={{ color: textColor, ...customStyles }}
        {...rest}
      >
        {content}
      </div>
    );
  }
};

export default Pill;