import * as React from 'react';
import { CopyRegular } from '@fluentui/react-icons';

import styles from './CopyButton.module.scss';
import Toast from '../Toast';

import { colors } from '../../styles/colors';

export interface CopyButtonProps {
    /**
     * The content to copy to the clipboard.
     * This can be a string or a React node.
     * If a React node is provided, it will be converted to HTML.
     */
    content?: string;
    /**
     * The text to display on the button.
     * @default Copy
     */
    text?: string;
    /**
     * The font size of the button text.
     * @default 16
     */
    fontSize?: string;
    /**
     * Optional confirmation settings.
     * If provided, a confirmation message will be displayed after copying.
     * @default {
            type: 'basic',
            message: 'Copied',
            duration: 2000,
            topOffset: 0
        }
     */
    confirmation?: {
        /**
         * The type of confirmation to display.
         * Can be 'basic' for a simple confirmation or 'toast' for a toast notification.
         * @default toast
         */
        type: 'basic' | 'toast';
        /**
         * The message to display in the confirmation toast.
         * @default Copied
         */
        message: string;
        /**
         * The duration of the confirmation toast in milliseconds.
         * @default 2000
         */
        duration: number;
        /**
         * The position of the toast on the screen.
         * @default top-right
         */
        position?: 'top-left' | 'top-center' | 'top-right';
        /**
         * Top offset position.
         * @default 0
         */
        topOffset?: number;
    };
}

const CopyButton = (props: CopyButtonProps): React.ReactElement => {
    const { 
        content = '',
        text,
        fontSize = 14, 
        confirmation = {
            type: 'basic',
            message: 'Copied',
            duration: 2000,
            topOffset: 0
        }
    } = props;

    const [showConfirmation, setShowConfirmation] = React.useState(false);

    const stripHtml = (html: string): string => {
        const tmp = document.createElement('div');
        tmp.innerHTML = html;
        return tmp.textContent || tmp.innerText || '';
    }

    const copyToClipboard = async () => {
        try {
            const divWrapper = document.createElement('div');
            divWrapper.innerHTML = content;
            
            // Inline all styles including special handling for tables
            const inlineAllStyles = (element) => {
                const computedStyle = window.getComputedStyle(element);
                let styleString = '';

                for (const prop of computedStyle) {
                    styleString += `${prop}:${computedStyle.getPropertyValue(prop)};`;
                }

                element.setAttribute('style', styleString);

                // Special handling for table elements to ensure Word compatibility
                if (element.tagName === 'TABLE') {
                    element.setAttribute('border', '1');
                    element.style.borderCollapse = 'collapse';
                }

                if (['TH'].includes(element.tagName)) {
                    element.style.backgroundColor = colors.accessibleComponentsWhiteSmoke;
                }

                if (['TD', 'TH'].includes(element.tagName)) {
                    element.style.border = `1px solid ${colors.cardBorderLight}`;
                    element.style.padding = '10px';
                }

                for (const child of element.children) {
                    inlineAllStyles(child);
                }
            }

            inlineAllStyles(divWrapper);

            // Wrap and get HTML
            const htmlContent = divWrapper.innerHTML;
            const plainText = stripHtml(content);

            // ClipboardItem API with HTML MIME type
            const htmlBlob = new Blob([htmlContent], { type: 'text/html' });
            const textBlob = new Blob([plainText], { type: 'text/plain' });

            const item = new ClipboardItem({ 
                'text/html': htmlBlob,
                'text/plain': textBlob
            });

            await navigator.clipboard.write([item]);
        } catch (err) {
            console.error('Failed to copy content to clipboard:', err);
        } finally {
            setShowConfirmation(true);
        }
    };

    const setButtonText = (): string | undefined => {
        if (showConfirmation && confirmation.type === 'basic') {
            return confirmation.message || 'Copied';
        }

        return text;
    };
    
    React.useEffect(() => {
        if (showConfirmation && confirmation.type === 'basic') {
            const timer = setTimeout(() => {
                setShowConfirmation(false);
            }, confirmation.duration);

            return () => clearTimeout(timer);
        }
    }, [showConfirmation, confirmation]);

    return (
        <>
            <button 
                type='button' 
                className={styles.copyButton} 
                onClick={copyToClipboard}
                style={{
                    '--fontSize': `${fontSize}px`
                } as React.CSSProperties & Record<string, string>}
            >
                <CopyRegular aria-hidden="true" focusable={false} />
                <span>{setButtonText()}</span>
            </button>
            {confirmation.type === 'toast' && (
                <Toast
                    message='Copied to clipboard'
                    isVisible={showConfirmation}
                    icon='CheckMark'
                    iconColor='#0bad5e'
                    position={confirmation.position}
                    topOffset={confirmation.topOffset}
                    duration={{  
                        length: 2000, 
                        onEnd: () => setShowConfirmation(false) 
                    }}
                />
            )}
        </>
    );
};

export default CopyButton;