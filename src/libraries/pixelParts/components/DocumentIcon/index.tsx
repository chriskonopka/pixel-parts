import * as React from 'react';
import classnames from 'classnames';

import { colors } from '../../styles/colors';

import styles from './DocumentIcon.module.scss';

export interface DocumentIconProps {
    /**
     * Color of the document icon.
     */
    color?: string;
    /**
     * Size of the document icon.
     */
    size?: number;
    /**
     * Source URL for the document icon image.
     */
    src?: string;
}   
    
const DocumentIcon = (props: DocumentIconProps): React.ReactElement => {
    const { src, color = 'transparent', size = 36 } = props;

    return (
        <div
            className={classnames(styles.documentIcon, styles[color])}
            style={{
                '--iconSize': `${size}px`,
                '--backgroundImage': src ? `url(${src})` : 'none',
                '--borderColor': src ? colors.cardBorderLight : 'transparent',
            } as React.CSSProperties}
        >
            {!src && (
                <svg className={styles.documentIconSvg} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" aria-hidden="true" role="presentation">
                    <rect width="256" height="256" fill="none"></rect>
                    <path d="M200,224H56a8,8,0,0,1-8-8V40a8,8,0,0,1,8-8h96l56,56V216A8,8,0,0,1,200,224Z" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></path>
                    <polyline points="152 32 152 88 208 88" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></polyline>
                </svg>
            )}
        </div>
    );
}

export default DocumentIcon;