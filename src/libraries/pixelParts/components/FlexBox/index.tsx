import * as React from 'react';

interface FlexBoxProps extends React.HTMLAttributes<HTMLDivElement> {
    /** The CSS display property. */
    display?: 'flex' | 'inline-flex';
    /** Additional class names to apply to the button for custom styling */ 
    classNames?: string;
    /** The content of the FlexBox. */
    children: React.ReactNode;
    /** The spacing between the children elements in pixels */
    spacing?: number | string;
    /** The direction of the flex container's main axis. */
    direction?: 'row' | 'row-reverse' | 'column' | 'column-reverse';
    /** Defines how the browser distributes space between and around content items along the main axis. */
    justifyContent?: 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around' | 'space-evenly';
    /** Defines the default behavior for how flex items are laid out along the cross axis on the current line. */
    alignItems?: 'stretch' | 'flex-start' | 'flex-end' | 'center' | 'baseline';
    /** Whether the flex container is single-line or multi-line. */
    wrap?: 'nowrap' | 'wrap' | 'wrap-reverse';
    /** Aligns a flex container's lines within when there is extra space in the cross-axis. */
    alignContent?: 'stretch' | 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around';
    /** The margin of the flex container. */
    margin?: number | string;
    /** Additional styles to apply to the flex container. */
    style?: object;
}

const FlexBox = (props: FlexBoxProps): React.ReactElement => {
    const {
        children,
        classNames,
        display = 'flex',
        spacing,
        direction,
        justifyContent,
        alignItems,
        margin,
        wrap,
        alignContent,
        style = {},
        ...others
    } = props;

    const flexStyle = {
        display,
        gap: spacing ? (typeof spacing === 'number' ? `${spacing}px` : spacing) : undefined,
        flexDirection: direction,
        flexWrap: wrap,
        justifyContent,
        alignItems,
        alignContent,
        margin,
        width: '100%',
        ...style
    };

    return (
        <div className={classNames} style={flexStyle} {...others}>
            {children}
        </div>
    );
};

export default FlexBox;