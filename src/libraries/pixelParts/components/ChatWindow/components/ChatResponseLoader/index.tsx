import * as React from 'react';

import Image from '../../../Image';
import Timer from '../../../Timer';
import TextElement from '../../../TextElement';

import styles from './ChatResponseLoader.module.scss';

export interface ChatResponseLoaderProps {
    /**
     * Optional icon to display while loading. If not provided, a fallback icon will be used.
     */
    icon?: React.ReactNode;
    /**
     * Fallback icon URL to use if no icon is provided.
     */
    fallbackIcon: string;
    /**
     * Optional text to display alongside the loader.
     */
    text?: string;
    /**
     * Whether to show the timer next to the loading text. Defaults to true.
     * @default true
     */
    showTimer?: boolean;
}

const ChatResponseLoader = (props: ChatResponseLoaderProps) => {
    const { 
        icon, 
        fallbackIcon,
        text, 
        showTimer = true
    } = props;

    return (
        <div className={styles.loader}>
            {icon ?? (
                <Image
                    src={fallbackIcon}
                    alt=""
                    aria-hidden="true"
                    width={32}
                />
            )}
            <div className={styles.loadingBeacon} aria-label="loading" />
            <span>
                <TextElement size={16} weight={600} lineHeight={1}>
                    {text} {showTimer && (
                        <>
                            <Timer isLoading={true} /><span className={styles.ellipses} />
                        </>
                    )}
                </TextElement>
            </span>
        </div>
    );
}

export default ChatResponseLoader;