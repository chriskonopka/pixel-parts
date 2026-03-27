import * as React from 'react';

export interface TextElementProps {
  /** The HTML element type to render (e.g., 'span', 'div', 'p'). */
  as?: React.ElementType;
  /** The content to be rendered inside the text element. */
  children: React.ReactNode;
  /** The CSS display property. */
  display?: 'flex'| 'inline-flex' | 'block' | 'inline-block' | 'inline' | 'none';
  /** The font size of the text. */
  size?: number;
  /** The color of the text. */
  color?: string;
  /** The text alignment (e.g., 'left', 'center', 'right'). */
  alignment?: string;
  /**  The font family of the text. */
  font?: string;
  /** The font weight of the text. */
  weight?: number | string;
  /** The line height of the text. */
  lineHeight?: number | string;
  /** The margin around the text element. */
  margin?: string;
  /** The padding inside the text element. */
  padding?: string;
  /** Additional props to pass to the text element. */
  [key: string]: any;
}

const getDisplayType = (element: React.ElementType): string => {
  switch (element) {
    case 'h1':
    case 'h2':
    case 'h3':
    case 'h4':
    case 'h5':
    case 'h6':
    case 'div':
    case 'section':
    case 'article':
    case 'header':
    case 'footer':
    case 'p':
      return '';
    case 'span':
    case 'a':
    case 'strong':
    case 'em':
      return 'inline';
    default:
      return 'inline';
  }
};

const TextElement: React.FC<TextElementProps> = ({
  as: Component = 'span',
  children,
  display,
  font,
  weight,
  lineHeight,
  size,
  color,
  alignment,
  margin,
  padding,
  style,
  ...props
}) => {
  const displayStyle = display || getDisplayType(Component);

  const styles = {
    display: displayStyle,
    color: color,
    fontSize: size,
    fontWeight: weight,
    lineHeight,
    textAlign: alignment,
    margin: margin,
    padding: padding,
    ...style
  };

  return (
    <Component style={styles} {...props}>
      {children}
    </Component>
  );
};

export default TextElement;
