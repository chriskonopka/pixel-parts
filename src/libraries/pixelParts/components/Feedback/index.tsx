import * as React from 'react';
import classname from 'classnames';

import styles from './Feedback.module.scss';

export interface FeedbackProps {
    /**
     * Callback when the feedback state changes. True for helpful, false for unhelpful, undefined for neutral.
     */
    onClick: (state: boolean | undefined) => void;
    /**
     * Icon size in pixels
     */
    iconSize?: number;
    /**
     * Spacing between buttons in pixels.
     */
    buttonSpacing?: number;
    /**
     * Whether the feedback has been submitted.
     */
    isSubmitted?: boolean;
}

const Feedback = (props: FeedbackProps): React.ReactElement => {
    const { onClick, iconSize = 20, buttonSpacing = 16, isSubmitted = false } = props;
    const [state, setState] = React.useState<boolean | undefined>();

    const handlClick = (value: boolean) => {
        const nextState = state === value ? undefined : value;
        onClick(nextState);
        setState(nextState);
    };

    return (
        <div 
            className={styles.feeback}
            style={{ '--button-spacing': `${buttonSpacing}px` } as React.CSSProperties}
        >
            {!isSubmitted && (
                <button 
                    onClick={() => handlClick(true)} 
                    aria-label="Like" 
                    className={classname(styles.button, { 
                        [styles.active]: state === true 
                    })}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={iconSize}
                        height={iconSize}
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    >
                        <path d="M14 9V5a3 3 0 0 0-3-3l-1 6" />
                        <path d="M5 9h4v12H5z" />
                        <path d="M9 21h7a3 3 0 0 0 3-3l1-6a2 2 0 0 0-2-3h-6" />
                    </svg>
                </button>
            )}
            {state !== true && (
                <button 
                    disabled={isSubmitted}
                    onClick={() => handlClick(false)} 
                    aria-label="Dislike" 
                    className={classname(styles.button, { 
                        [styles.active]: state === false 
                    })}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={iconSize}
                        height={iconSize}
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    >
                        <path d="M10 15v4a3 3 0 0 0 3 3l1-6" />
                        <path d="M19 15h-4V3h4z" />
                        <path d="M15 3H8a3 3 0 0 0-3 3l-1 6a2 2 0 0 0 2 3h6" />
                    </svg>
                </button>
            )}
        </div>
    );
};

export default Feedback;