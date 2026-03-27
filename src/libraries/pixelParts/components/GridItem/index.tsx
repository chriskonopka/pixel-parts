import * as React from 'react';
import classnames from 'classnames';
import styles from './GridItem.module.scss';

export interface GridItemProps extends React.HTMLAttributes<HTMLDivElement> {
    /** The content to be rendered within the grid layout. */
    children: React.ReactNode;
    /** Additional class names to apply to the grid layout for custom styling. */
    classNames?: string; 
    /** Object specify the column widths for each breakpoint. */
    columns?: GridColumns;
}

export interface GridColumns {
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
}

const GridItem = (props: GridItemProps): React.ReactElement => {
    const {
        children,
        classNames,
        columns = { sm: 12, md: 12, lg: 12, xl: 12 },
        ...otherProps
    } = props;

    const columnClasses = Object.entries(columns as GridColumns).map(([size, value]) => {
        const key = `column--${size}-${value}` as keyof typeof styles;
        return styles[key];
    });

    return (
        <div className={classnames(classNames, ...columnClasses)} {...otherProps}>
            {children}
        </div>
    );
}

export default GridItem;