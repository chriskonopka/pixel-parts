import * as React from 'react';
import classnames from 'classnames';
import styles from './Grid.module.scss';

export interface GridProps extends React.HTMLAttributes<HTMLDivElement> {
    /** The content to be rendered within the grid layout. */
    children: React.ReactNode;
    /** Additional class names to apply to the grid layout for custom styling. */
    classNames?: string;
    /** The gap between columns in the grid layout, specified in pixels. */
    gridColumnGap?: number;
    /** The gap between rows in the grid layout, specified in pixels. */
    gridRowGap?: number;
}
const Grid = (props: GridProps): React.ReactElement => {
    const {
        children,
        classNames,
        gridColumnGap = 16,
        gridRowGap = 16,
        ...otherProps
    } = props;

    const { style, ...restOfProps } = otherProps;
    
    return (
        <div 
            className={classnames(styles.grid, classNames)} 
            style={{ gridColumnGap, gridRowGap, ...style }}
            {...restOfProps}
        >
            {children}
        </div>
    );
}

export default Grid;