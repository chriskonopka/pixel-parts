import React, { useState, useRef, useEffect, ReactNode } from 'react';
import classnames from 'classnames';
import {
  ErrorCircleRegular,
  CalendarRegular,
  DismissRegular,
  ChevronDownRegular,
  ChevronLeftRegular,
  ChevronRightRegular,
  CopyRegular,
  FilterRegular,
  ArrowSortUpRegular,
  ArrowSortDownRegular,
  StarFilled,
  DocumentPdfRegular,
  DocumentTableRegular,
  DocumentTextRegular,
  SlideLayoutRegular,
  ImageRegular,
  DocumentRegular,
  CheckmarkRegular,
} from '@fluentui/react-icons';
import styles from './ButtonGroup.module.scss';
import { colors } from '../../styles/colors';

export interface OptionObject { 
    text: string;
    icon?: string | ReactNode;
    iconColor?: string;
}

export interface ButtonGroupProps {
  /**
   * The index of the button selected by default.
   * @default 0
   */
  defaultSelected?: number;
  /**
   * The background color of the button group container.
   */
  backgroundColor?: string;
  /**
   * The color of the inner box shadow of the button group.
   */
  borderColor?: string;
  /**
   * The width of the border around the button group.
   */
  borderWidth?: number;
  /**
   * The color of the active button background.
   */
  buttonColor?: string;
  /**
   * The font size of the button text.
   * @default 16px
   */
  buttonFontSize?: string;
  /**
   * The text color of the active button.
   */
  activeTextColor?: string;
  /**
   * The text color of inactive buttons.
   */
  inactiveTextColor?: string;
  /**
   * The background color of a button on hover.
   */
  hoverBackgroundColor?: string;
  /**
   * The list of button labels to display.
   */
  options: string[] | OptionObject[];
  /**
   * Whether the button group should take the full width of its container.
   * @default false
   */
  isFullWidth?: boolean;
  /**
   * The variant of the button group, which can be 'light' or 'dark'.
   * @default 'light'
   */
  variant?: 'light' | 'dark';
  /**
   * The color variant for the icon in the button. Options are 'muted' (gray when inactive), 'none' (no icon color change).
   * @default 'muted'
   */
  iconColorVariant?: 'muted' | 'none';
  /**
   * Callback fired when a button is selected. The "inverted" variant displays the icon in white in the active state. The "muted" variant displays the icon in gray in the inactive state.
   */
  onChange: (selected: string) => void;
  /**
   * Whether the button group is disabled, preventing any interaction.
   */
  isDisabled?: boolean;
}

const ICON_MAP: Record<string, React.ComponentType<{ className?: string; style?: React.CSSProperties; 'aria-hidden'?: boolean | 'true' | 'false'; focusable?: boolean | string }>> = {
  AlertSolid: ErrorCircleRegular,
  Calendar: CalendarRegular,
  Cancel: DismissRegular,
  ChromeClose: DismissRegular,
  ChevronDownMed: ChevronDownRegular,
  ChevronLeft: ChevronLeftRegular,
  ChevronRight: ChevronRightRegular,
  Copy: CopyRegular,
  Filter: FilterRegular,
  SortUp: ArrowSortUpRegular,
  SortDown: ArrowSortDownRegular,
  FavoriteStarFill: StarFilled,
  PDF: DocumentPdfRegular,
  WordDocument: DocumentTextRegular,
  PowerPointDocument: SlideLayoutRegular,
  ExcelDocument: DocumentTableRegular,
  TextDocument: DocumentTextRegular,
  Photo2: ImageRegular,
  Document: DocumentRegular,
  CheckMark: CheckmarkRegular,
};

const buttonGroupStyles = {
  light: {
    backgroundColor: colors.gray5,
    borderWidth: 1,
    borderColor: colors.cardBorderLight,
    buttonColor: colors.mweGreen,
    activeTextColor: colors.white,
    inactiveTextColor: colors.mwsNavy,
    hoverBackgroundColor: colors.buttonHoverDark
  }, 
  dark: {
    backgroundColor: colors.globalNav,
    borderWidth: 2,
    borderColor: colors.cardBackgroundDark,
    buttonColor: colors.cardBackgroundDark,
    activeTextColor: colors.white,
    inactiveTextColor: colors.gray6,
    hoverBackgroundColor: colors.globalNav
  }
}

const ButtonGroup = (props: ButtonGroupProps) => {
  const { 
    defaultSelected = 0,
    options, 
    onChange, 
    backgroundColor, 
    borderColor,
    borderWidth,
    buttonFontSize = '16px',
    buttonColor,
    activeTextColor,
    inactiveTextColor,
    hoverBackgroundColor,
    isFullWidth = false,
    variant = 'light',
    iconColorVariant = 'muted',
    isDisabled = false
  } = props;

  const [selected, setSelected] = useState(defaultSelected);
  const [bgStyle, setBgStyle] = useState({});

  const containerRef = useRef<HTMLDivElement>(null);
  const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const hasOptionsAsObjects = typeof options[0] === 'object';

  const normalizedOptions: OptionObject[] = hasOptionsAsObjects
    ? (options as OptionObject[])
    : (options as string[]).map(text => ({ text }));

  useEffect(() => {
    const updateBackground = () => {
      const currentButton = buttonRefs.current[selected];
      if (currentButton && containerRef.current) {
        const rect = currentButton.getBoundingClientRect();
        const containerRect = containerRef.current.getBoundingClientRect();
        setBgStyle({
          width: rect.width,
          transform: `translateX(${
            (rect.left - containerRect.left) - (borderWidth ?? buttonGroupStyles[variant].borderWidth)
          }px)`
        });
      }
    };

    updateBackground();

    const resizeObserver = new ResizeObserver(() => {
      updateBackground();
    });

    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    window.addEventListener('resize', updateBackground);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener('resize', updateBackground);
    };
  }, [selected, borderWidth, variant]);

  const handleClick = (index: number) => {
    setSelected(index);
    onChange?.(normalizedOptions[index].text);
  };

  React.useEffect(() => {
    setSelected(defaultSelected);
  }, [defaultSelected]);

  return (
    <div 
      className={classnames(styles.buttonGroup, {
        [styles.isFullWidth]: isFullWidth,
        [styles.disabled]: isDisabled
      })} 
      ref={containerRef}
      style={{ 
        backgroundColor: backgroundColor ?? buttonGroupStyles[variant].backgroundColor, 
        '--borderColor': borderColor ?? buttonGroupStyles[variant].borderColor,
        '--borderWidth': `${borderWidth ?? buttonGroupStyles[variant].borderWidth}px`,
      } as React.CSSProperties & Record<string, string>}
    >
      <div 
        className={styles.background} 
        style={{ 
          ...bgStyle, 
          backgroundColor: buttonColor ?? buttonGroupStyles[variant].buttonColor
        }} 
      />
      {normalizedOptions.map(({ text, icon, iconColor }, index) => (
        <button
          key={text}
          ref={(el) => { buttonRefs.current[index] = el; }}
          disabled={isDisabled}
          className={classnames(styles.button, {
            [styles.active]: selected === index,
            [styles[iconColorVariant]]: iconColorVariant !== 'none'
          })}
          onClick={() => handleClick(index)}
          style={{
            '--buttonFontSize': buttonFontSize,
            '--inactiveTextColor': inactiveTextColor ?? buttonGroupStyles[variant].inactiveTextColor,
            '--activeTextColor': activeTextColor ?? buttonGroupStyles[variant].activeTextColor,
            '--hoverBackgroundColor': hoverBackgroundColor ?? buttonGroupStyles[variant].hoverBackgroundColor,
            '--iconColor': iconColor
          } as React.CSSProperties & Record<string, string>}
        >
          {icon && (typeof icon === 'string' ? (() => { const IconComp = ICON_MAP[icon]; return IconComp ? <IconComp aria-hidden="true" focusable={false} /> : null; })() : icon)}
          <span>{text}</span>
        </button>
      ))}
    </div>
  );
};

export default ButtonGroup;