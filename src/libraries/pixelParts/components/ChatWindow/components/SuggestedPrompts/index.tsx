import * as React from 'react';
import classnames from 'classnames';

import Button from '../../../Button';

import { trunctateString } from '../../../../../../helpers/stringHelpers';

import styles from './SuggestedPrompts.module.scss';

export interface SuggestedPromptsProps {
    /**
     * If true, all prompt buttons will be disabled.
     * @default false
     */
    isDisabled?: boolean;
    /**
     * Array of prompt objects to display.
     * @default []
     */
    prompts: {
        Title?: string;
        Prompt: string;
    }[];
    /**
     * Callback fired when a prompt is selected.
     * @default () => { }
     */
    onSelect: (prompt: string) => void;
    /**
     * If true, prompts will have an entrance animation.
     * @default false
     */
    isAnimated?: boolean;
    /**
     * Optional limit on the number of prompts to display.
     */
    itemLimit?: number;
    /**
     * Optional character limit for each prompt.
     */
    characterLimit?: number;
    /**
     * Optional font size for prompt text.
     */
    fontSize?: number;
}

const SuggestedPrompts = (props: SuggestedPromptsProps): React.ReactElement => {
    const { 
        isDisabled = false,
        prompts = [], 
        onSelect = () => {},
        isAnimated = false,
        itemLimit = props.prompts.length,
        fontSize = 16,
        characterLimit
    } = props;

    return (
        <div
            style={{
                '--promptTextFontSize': `${fontSize}px`
            } as React.CSSProperties}
            className={classnames(styles.suggestedPrompts, {
                [styles.isAnimated]: isAnimated
            })}
        >
            {prompts.slice(0, itemLimit).map(({ Title, Prompt }) => (
                <Button 
                    className={styles.promptButton}
                    text={
                        <>
                            {Title && <span className={styles.promptInputHeaderText}>{Title}</span>}
                            <span>{trunctateString(Prompt, characterLimit)}</span>
                        </>
                    }
                    aria-label={Prompt}
                    variant="lightGray"
                    onClick={() => onSelect(Prompt)}
                    disabled={isDisabled}
                    fullWidth
                />
            ))}
        </div>
    );
};  

export default SuggestedPrompts;