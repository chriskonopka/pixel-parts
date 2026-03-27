// src/components/ShimmerPanel/index.tsx
import React, { FC } from 'react';
import classname from 'classnames';
import styles from './ShimmerPanel.module.scss';

export interface ShimmerPanelProps {
  /** The color variant of the ShimmerPanel. */
  variant?: 'white' | 'gray' | 'dark';
}

export const ShimmerPanel: FC<ShimmerPanelProps> = ({
  variant = 'dark',
}) => {
  return (
    <div role="progressbar" className={classname(styles.shimmerPanel, styles[variant])}>
      <div className={styles.shimmerLine} style={{ width: '25%' }} />
      <div className={styles.shimmerLine} style={{ width: '50%' }} />
      <div className={styles.shimmerLine} />
      <div className={styles.shimmerLine} style={{ width: '75%' }} />
    </div>
  );
};

export default ShimmerPanel;
