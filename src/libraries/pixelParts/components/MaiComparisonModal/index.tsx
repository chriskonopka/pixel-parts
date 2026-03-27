import * as React from 'react';
import { useMediaQuery } from 'react-responsive';

import Modal from '../Modal';

import maiChatIcon from '../../../../assets/images/mai-chat-logo.png';
import chatgptIcon from '../../../../assets/images/chatgpt-logo.png';
import copilotIcon from '../../../../assets/images/copilot-logo.png';
import checkmarkIcon from '../../../../assets/images/check-mark-round.png';

import styles from './MaiComparisonModal.module.scss';

export interface MaiComparisonModalProps {
  /**
   * Data to populate the comparison table
   */
  data: {
    Title: string;
    McDermottAI: string;
    ChatGPT: string;
    Copilot: string;
  }[];
  /**
   * Controls the open state of the modal
   * @default false
   */
  isOpen?: boolean;
  /**
   * Loading state for data fetching
   * @default false
   */
  loading?: boolean;
  /**
   * Error state for data fetching
   */
  error?: Error | null;
  /**
   * Text for the button that opens the modal
   * @default When to use McDermott AI Chat
   */
  triggerText?: string;
  /** Font size for the trigger text
   * @default 14px
   */
  triggerFontSize?: string;
  /**
   * Title for the modal
   * @default When to use McDermott AI Chat
   */
  modalTitle?: string;
}

const MaiComparisonModal = (props: MaiComparisonModalProps): React.ReactElement => {
  const { 
    data, 
    error, 
    triggerText = 'When to use McDermott AI Chat',
    triggerFontSize = '14px',
    modalTitle = 'When to use McDermott AI Chat',
    loading = false, 
    isOpen = false 
  } = props;

  const [showModal, setShowModal] = React.useState(isOpen);

  const isBigScreen = useMediaQuery({ query: '(min-width: 769px)' });

  const setValue = (value: string): string | React.ReactNode => {
    switch (value) {
      case 'Yes':
        return <img src={checkmarkIcon} alt="check icon" className={styles.checkIcon} /> ;
      case 'No':
        return <span className={styles.dash}>-</span>;
      default:
        return value;
    }
  };

  const tableData = data ? data.map(item => ({
    title: item.Title,
    mai: setValue(item.McDermottAI),
    chatgpt: setValue(item.ChatGPT),
    copilot: setValue(item.Copilot),
  })) : [];

  React.useEffect(() => {
    setShowModal(isOpen);
  }, [isOpen]);

  return (
    <>
      <button 
        className={styles.modalTrigger} 
        onClick={() => setShowModal(true)}
        style={{ '--trigger-font-size': triggerFontSize } as React.CSSProperties}>
        {triggerText}
      </button>

      {showModal && (
        <Modal 
          title={modalTitle}
          onClose={() => setShowModal(false)}
          classNames={styles.modal} 
          zIndex={15}
          showCloseButton={true}
        >
            <div className={styles.modalBody}>
              {loading && <div>Loading...</div>}
              {error && <div>Error: {error.message}</div>}
              {tableData && (
                <>
                  <div className={styles.row}>
                    <div>Best Option For...</div>
                    <div>
                      {isBigScreen 
                        ? <img src={maiChatIcon} alt="mcdermott ai chat logo" height={26} /> 
                        : <>McDermott AI</>}
                    </div>
                    <div>
                      {isBigScreen 
                        ? <img src={chatgptIcon} alt="chatgpt logo" height={32} /> 
                        : 'ChatGPT'}
                    </div>
                    <div>
                      {isBigScreen 
                        ? <img src={copilotIcon} alt="copilot logo" height={22} /> 
                        : 'Copilot'}
                    </div>
                  </div>
                  <div className={styles.grid}>
                    {tableData.map(item => (
                      <div key={item.title} className={styles.row}>
                        <div>{item.title}</div>
                        <div>{item.mai}</div>
                        <div>{item.chatgpt}</div>
                        <div>{item.copilot}</div>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
        </Modal>
      )}
    </>
  );
};

export default MaiComparisonModal;