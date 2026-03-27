import * as React from 'react';

import Button from '../../../Button';

import styles from './ClearChat.module.scss';

export interface ClearChatProps {
  /**
   * Callback function to be called when the clear chat button is clicked.
   */
  onClear: () => void;
  /**
   * Callback function when the cancel button is clicked.
   * @default () => {}
   */
  onCancel?: () => void;
  /**
   * Text for the download section.
   */
  text?: string;
}

const ClearChat = (props: ClearChatProps): React.ReactElement => {
  const { 
    onClear = () => {}, 
    onCancel, 
    text = 'Reset the conversation and start fresh—this cannot be undone.'
  } = props;

  return (
    <>
      {text && <div className={styles.text}>{text}</div>}
      <div className={styles.clearChatButtons}>
        {onCancel && (
          <Button 
            variant="lightGray" 
            text="Cancel" 
            onClick={onCancel}
            fullWidth
          />
        )}
        <Button
          onClick={onClear}
          variant="alert"
          text="Clear Chat"
          fullWidth
        />
      </div>
    </>
  );
};

export default ClearChat;