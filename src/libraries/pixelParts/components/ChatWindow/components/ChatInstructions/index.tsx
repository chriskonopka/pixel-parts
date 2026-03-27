import * as React from 'react';
import classnames from 'classnames';

import TextElement from '../../../TextElement';

import styles from './ChatInstructions.module.scss';

export interface ChatInstructionsProps {
    /**
     * Alignment for the instruction number (bullet).
     * Options: 'flex-start', 'center', 'flex-end'.
     * @default 'center'
     */
    instructionNumberAlignment?: 'flex-start' | 'center' | 'flex-end';
    /**
     * Array of instruction objects or strings to display.
     */
    instructions: { title?: string; text: string; }[] | string[];
    /**
     * Size of the bullet number in pixels.
     * @default 40
     */
    bulletSize?: number;
    /**
     * Spacing between instruction items in pixels.
     * @default 20
     */
    spacing?: number;
    /**
     * Maximum width of the instructions container in pixels.
     * @default 600
     */
    maxWidth?: number;
}

const ChatInstructions = (props: ChatInstructionsProps): React.ReactElement => {
    const { 
        instructionNumberAlignment = 'flex-start',
        instructions, 
        bulletSize = 40, 
        spacing = 20,
        maxWidth = 600
    } = props;

    const hasSingleInstruction = instructions.length === 1;

    return (
        <ol 
            className={styles.chatInstructions}
            style={{ 
                '--bulletNumberAlignment': instructionNumberAlignment,
                '--bulletSize': `${bulletSize}px`, 
                '--listItemSpacing': `${spacing}px`, 
                '--maxWidth': `${maxWidth}px`
            } as React.CSSProperties}
        >
            {instructions.map((instruction, index) => (
                <li 
                    className={classnames({
                        [styles.noStepIndicator]: hasSingleInstruction
                    })}
                    key={index} 
                    data-step={index + 1}
                >
                    {typeof instruction === 'string' ? (
                        <div>
                            <TextElement as="p" size={15} margin="0">
                                {instruction}
                            </TextElement>
                        </div>
                    ) : (
                        <div>
                            {instruction.title && (
                                <TextElement as="h4" weight={600} size={18} margin="0 0 4px">
                                    {instruction.title}
                                </TextElement>
                            )}
                            {instruction.text && (
                                <TextElement as="p" size={15} margin="0">
                                    {instruction.text}
                                </TextElement>
                            )}
                        </div>
                    )}
                </li>
            ))}
        </ol>
    );
}

export default ChatInstructions;