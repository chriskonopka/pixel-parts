import * as React from 'react';

import Card from '../Card';
import Button from '../Button';
import FlexBox from '../FlexBox';

import styles from './FeedbackPanel.module.scss';

export interface FeedbackPanelProps {
    /**
     * Title text displayed at the top of the panel
     * @default Tell us more:
     */
    title?: string;
    /**
     * Callback fired when a feedback option is selected or submitted
     */
    onSubmit: (value: string) => void;
    /**
     * Optional callback fired when the user comment box is shown
     */
    onShowUserCommentBox?: () => void;
}

const FeedbackPanel = (props: FeedbackPanelProps): React.ReactElement => {
    const { 
        title = 'Tell us more:', 
        onShowUserCommentBox = () => {},
        onSubmit
    } = props;

    const [selectedIndex, setSelectedIndex] = React.useState<number | null>(null);
    const [isSubmitted, setIsSubmitted] = React.useState(false);

    const inputRef = React.useRef<HTMLInputElement>(null);

    const handleClick = (e: React.SyntheticEvent<HTMLButtonElement>, index: number) => {
        const newValue = e.currentTarget.innerText;
        setSelectedIndex(index);

        if (newValue !== 'Other') {
            onSubmit(newValue);
            setIsSubmitted(true);
        }
    }

    const handleSubmit = () => {
        if (inputRef.current) {
            const inputValue = inputRef.current.value || 'Other';
            onSubmit(inputValue);
            setIsSubmitted(true);
        }
    }

    React.useEffect(() => {
        if (selectedIndex === 3) {
            onShowUserCommentBox();
        }
    }, [selectedIndex]);

    return isSubmitted ? (
        <FlexBox justifyContent="center" alignItems="center">
            <Card>
                Thanks for your feedback!
            </Card>
        </FlexBox>
    ) : (
        <Card cardPadding={10}>
            <h4 className={styles.title}>{title}</h4>
            <FlexBox spacing={20} direction="column">
                <div className={styles.buttonGroup}>
                    <Button 
                        variant="white" 
                        text="Didn't answer my question"
                        onClick={(e: React.SyntheticEvent<HTMLButtonElement>) => handleClick(e, 0)}
                        isActive={selectedIndex === 0}
                    />
                    <Button 
                        variant="white" 
                        text="Not factually correct"
                        onClick={(e: React.SyntheticEvent<HTMLButtonElement>) => handleClick(e, 1)}
                        isActive={selectedIndex === 1}
                    />
                    <Button 
                        variant="white" 
                        text="Not helpful enough"
                        onClick={(e: React.SyntheticEvent<HTMLButtonElement>) => handleClick(e, 2)}
                        isActive={selectedIndex === 2}
                    />
                    <Button 
                        variant="white" 
                        text="Other" 
                        onClick={(e: React.SyntheticEvent<HTMLButtonElement>) => handleClick(e, 3)}
                        isActive={selectedIndex === 3}
                    />
                </div>
                {selectedIndex === 3 && (
                    <div className={styles.inputGroup}>
                        <input 
                            className={styles.textbox} 
                            type="text" 
                            placeholder="(Optional) Feel free to add specific details"
                            ref={inputRef}
                        />
                        <Button 
                            text="Submit" 
                            variant="lightGray"
                            onClick={handleSubmit}
                        />
                    </div>
                )}
            </FlexBox>
        </Card>
    );
};

export default FeedbackPanel;