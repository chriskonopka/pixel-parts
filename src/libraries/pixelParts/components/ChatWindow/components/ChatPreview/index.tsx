import * as React from 'react';

import Card from '../../../Card';

import styles from './ChatPreview.module.scss';

export interface ChatPreviewProps {
    /**
     * Optional description text displayed in the preview.
     */
    description?: string;
    /**
     * Icon to display in the preview.
     */
    icon: React.ReactNode;
    /**
     * Optional title text for the preview.
     */
    title?: string;
    /**
     * Callback fired when a question or prompt is clicked.
     */
    onSeedPromptClick?: (prompt: string) => void;
    /**
     * Optional prompt text to display or use in the preview.
     */
    seedPrompt?: string;
    /**
     * Child elements to render inside the preview.
     */
    children?: React.ReactNode;
    /**
     * Maximum width of the instructions container in pixels.
     * @default 800
     */
    maxWidth?: number;
}

const ChatPreview = (props: ChatPreviewProps): React.ReactElement => {
    const { 
        description, 
        icon, 
        title, 
        onSeedPromptClick = () => {}, 
        seedPrompt,
        children,
        maxWidth = 800
    } = props;

    const handleQuestionClick = (): void => {
        if (seedPrompt) {
            onSeedPromptClick(seedPrompt);
        }
    };

    return (
        <div className={styles.chatPreview} style={{
            '--maxWidth': `${maxWidth}px`
        } as React.CSSProperties}>
            <div className={styles.chatPreviewContent}>
                <div className={styles.chatPreviewContent__icon}>
                    {icon}
                </div>
                {title && (
                    <h3 className={styles.chatPreviewContent__title}>
                        {title}
                    </h3>
                )}
                {description && (
                    <div className={styles.chatPreviewContent__description}>
                        {description}
                    </div>
                )}
                {children}
                {seedPrompt && (
                    <Card 
                        onClick={handleQuestionClick} 
                        classNames={styles.chatPreviewContent__promptCard}
                    >
                        {seedPrompt}
                    </Card>
                )}
            </div>
        </div>
    );
};

export default ChatPreview;