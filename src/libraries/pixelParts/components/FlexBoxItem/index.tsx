import * as React from 'react';

interface MWFlexBoxItemProps extends React.HTMLAttributes<HTMLDivElement> {
    /** The content of the FlexBoxItem. */
    children: React.ReactNode;
    /** Additional class names to apply to the flex item for custom styling. */ 
    classNames?: string;
    /** Defines the ability for a flex item to grow if necessary. */
    flexGrow?: number;
    /** Defines the ability for a flex item to shrink if necessary. */
    flexShrink?: number;
    /**  Defines the default size of an element before the remaining space is distributed. */
    flexBasis?: string | number;
    /** Allows the default alignment to be overridden for individual flex items. */
    alignSelf?: 'auto' | 'flex-start' | 'flex-end' | 'center' | 'baseline' | 'stretch';
    /** Controls the order in which flex items appear within the flex container. */
    order?: number;
    /** Additional styles to apply to the flex item. */
    style?: object;
}

const FlexBoxItem = (props: MWFlexBoxItemProps): React.ReactElement => {
    const {
        children,
        classNames,
        flexGrow,
        flexShrink,
        flexBasis,
        alignSelf,
        order,
        style = {},
        ...others
    } = props;
    
    const itemStyle = {
        flexGrow,
        flexShrink,
        flexBasis,
        alignSelf,
        order,
        ...style
    };

    return (
        <div className={classNames} style={itemStyle} {...others}>
            {children}
        </div>
    );
};

export default FlexBoxItem;