import * as React from 'react';
import { ErrorCircleRegular } from '@fluentui/react-icons';
import styles from './AccessWarning.module.scss';

export interface AccessWarningProps {
  platformTitle: string;
  requestAccessUrl?: string;
}

const AccessWarning: React.FC<AccessWarningProps> = ({ platformTitle, requestAccessUrl }) => {
  return (
    <div className={styles.accessWarning}>
      <ErrorCircleRegular className={styles.alertIcon} aria-hidden="true" focusable={false} />
      <span>
        You do not have a {platformTitle} license and will not be able to access the platform.{' '}
        <a 
          href={requestAccessUrl || "#"} 
          className={styles.requestAccess} 
          target="_blank" 
          rel="noopener noreferrer"
        >
          Request Access
        </a>
      </span>
    </div>
  );
};

export default AccessWarning;
