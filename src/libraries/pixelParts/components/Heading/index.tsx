import * as React from 'react';

export interface HeadingProps {
  /** The content to be displayed inside the heading. */
  children: React.ReactNode;
  /** Toggle the font color between black and white. */
  isDark?: boolean;
  /** Font sizeeight of the heading. */
  size?: number | string;
  /** Font weight of the heading. */
  weight?: 'normal' | 400 | 600;
  /** Text alignment of the heading. */
  align?: 'left' | 'center' | 'right';
  /** Whether the heading should have a bottom border. */
  hasBottomBorder?: boolean;
  /** Color of the bottom border. */
  bottomBorderColor?: string;
  /** Padding at the bottom of the heading. */
  bottomPadding?: number | string;
  /** Margin at the top of the heading. */
  marginTop?: number | string;
  /** Margin at the bottom of the heading. */
  marginBottom?: number | string;
  /** Additional class names for the heading. */
  classNames?: string;
  /** The HTML tag to be used for the heading. */
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}

const Heading = ({
  children,
  isDark = false,
  hasBottomBorder = false,
  bottomBorderColor,
  marginTop = 0,
  marginBottom = 0,
  bottomPadding = 0,
  classNames = '',
  size = 24,
  weight = 600,
  align = 'left',
  as: Tag = 'h1',
}: HeadingProps): React.ReactElement => {
  const color = isDark ? '#ffffff' : '#000042';
  const borderColor = bottomBorderColor || color;

  return (
    <Tag
      className={classNames}
      style={{
        color,
        fontSize: size,
        fontWeight: weight,
        textAlign: align,
        marginTop,
        marginBottom,
        paddingBottom: bottomPadding,
        borderBottom: hasBottomBorder ? `1px solid ${borderColor}` : 'none',
      }}
    >
      {children}
    </Tag>
  );
};

export default Heading;
