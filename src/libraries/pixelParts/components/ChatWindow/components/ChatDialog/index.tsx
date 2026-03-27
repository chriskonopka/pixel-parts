import * as React from 'react';
import classnames from 'classnames';

import ChatHeader from '../ChatHeader';
import ChatResponseLoader from '../ChatResponseLoader';
import TextElement from '../../../TextElement';

import responseFallbackIcon from '../../../../../../assets/images/chat-ai-icon.svg';
import scrollButton from '../../../../../../assets/images/scroll-button.svg';

import styles from './ChatDialog.module.scss';

export interface ChatDialogProps {
    /**
     * Optional preview content shown when there are no messages.
     */
    chatPreview?: React.ReactNode;
    /**
     * Ref for the chat window dialog content.
     */
    chatWindowRef?: React.RefObject<HTMLDivElement>;
    /**
     * Ref for the search box input field.
     */
    searchBoxRef?: React.RefObject<HTMLDivElement>;
    /**
     * Additional class names for styling.
     */
    classNames?: string;
    /**
     * Optional error component to display for API errors.
     */
    errorComponent?: React.ReactNode | string;
    /**
     * Whether the modal is open.
     */
    isOpen?: boolean;
    /**
     * Whether the chat is loading.
     */
    isLoading?: boolean;
    /**
     * Optional icon to display with the loading beacon when loading.
     */
    icon?: React.ReactNode;
    /**
     * Chat window prompt input component.
     */
    promptInputComponent?: React.ReactNode;
    /**
     * Centers the prompt input field when there are no messages.
     */
    centerPromptInput?: boolean;
    /**
     * Title text for the prompt input field. Visible when there are no messages.
     */
    promptInputHeaderText?: string | React.ReactNode;
    /**
     * Error message for the input field.
     */
    promptInputError?: string;
    /**
     * Header text for the modal.
     */
    chatWindowTitle?: string | React.ReactNode;
    /**
     * Callback fired when the modal is closed.
     */
    onCloseWindow?: () => void;
    /**
     * Children nodes to render inside the chat window.
     */
    children?: React.ReactNode;
    /**
     * Array of Action buttons to render inside the chat window.
     */
    actionButtons?: React.ReactElement[];
    /**
     * Icon to display when loading if no icon prop is provided.
     */
    actionButtonType?: 'toggle' | 'open';
    /**
     * Variant of the chat window.
     */
    variant?: 'inline' | 'modal';
    /**
     * Maximum height of the chat window in pixels.
     * @default 500px
     */
    minHeight?: string;
    /**
     * Whether the drawer is open (for modal variant).
     * @default false
     */
    drawerOpen?: boolean;
    /**
     * Optional disclaimer text or element to display.
     */
    disclaimer?: React.ReactNode | string;
    /**
     * If true, displays guardrails notification in the chat header.
     */
    hasGuardrails?: boolean;
}

const ChatDialog = (props: ChatDialogProps): React.ReactElement => {
  const {
    children,
    actionButtons,
    actionButtonType = 'open',
    chatPreview,
    chatWindowRef,
    searchBoxRef,
    classNames,
    errorComponent,
    isOpen,
    isLoading,
    icon,
    promptInputError,
    promptInputComponent,
    promptInputHeaderText,
    chatWindowTitle,
    onCloseWindow,
    variant = 'inline',
    minHeight = '500px',
    drawerOpen = false,
    centerPromptInput = false,
    hasGuardrails = false,
    disclaimer,
  } = props;

  const isModal = variant === 'modal';
  const showHeader = actionButtons || chatWindowTitle || onCloseWindow;

  const chatWindowContainerRef = React.useRef<HTMLDivElement>(null);

  const internalContentRef = React.useRef<HTMLDivElement>(null);
  const contentRef = chatWindowRef ?? internalContentRef;

  const [showScrollBtn, setShowScrollBtn] = React.useState(false);

  const updateScrollVisibility = React.useCallback(() => {
        const element = contentRef.current;
        if (!element) return;

        const { scrollTop, scrollHeight, clientHeight } = element;
        const overflowing = scrollHeight > clientHeight + 1;
        const atBottom = Math.abs(scrollHeight - (scrollTop + clientHeight)) <= 2;
        setShowScrollBtn(overflowing && !atBottom);
  }, [contentRef]);

  const handleScrollToBottom = React.useCallback(() => {
        const element = contentRef.current;
        if (!element) return;
        element.scrollTo({ top: element.scrollHeight, behavior: 'smooth' });
  }, [contentRef]);

  React.useEffect(() => {
        const element = contentRef.current;
        if (!element) return;

        updateScrollVisibility();

        const onScroll = () => updateScrollVisibility();
        element.addEventListener('scroll', onScroll, { passive: true });

        const onResize = () => updateScrollVisibility();
        window.addEventListener('resize', onResize);

        const resizeObserver = new ResizeObserver(() => updateScrollVisibility());
        resizeObserver.observe(element);

        const mutationObserver = new MutationObserver(() => updateScrollVisibility());
        mutationObserver.observe(element, { childList: true, subtree: true, characterData: true });

        return () => {
        element.removeEventListener('scroll', onScroll);
        window.removeEventListener('resize', onResize);
        resizeObserver.disconnect();
        mutationObserver.disconnect();
        };
  }, [contentRef, updateScrollVisibility]);

  React.useEffect(() => {
        updateScrollVisibility();
  }, [isLoading, children, updateScrollVisibility]);

  const chatHeader = (
    <ChatHeader
        isDark={isModal}
        title={chatWindowTitle}
        actionButtons={actionButtons}
        actionButtonType={actionButtonType}
        onClose={onCloseWindow}
        drawerOpen={drawerOpen}
        hasGuardrails={hasGuardrails}
    />
  );

  const hasChildren = React.Children.toArray(children).filter(Boolean).length > 0;
  const hasCenteredPromptInput = centerPromptInput && !hasChildren && !chatPreview;

  return (
    <div
      ref={chatWindowContainerRef}
      className={classnames(classNames, {
        [styles.chatInnerContainer]: !isModal,
        [styles.chatModal]: isModal,
        [styles.isOpen]: isOpen,
      })}
    >
      {errorComponent}
      <div
        className={classnames(styles.chatWindow, classNames)}
        style={{ '--minHeight': minHeight } as React.CSSProperties}
      >
        {showHeader && chatHeader}
        <div className={styles.chatWindowDialogBox}>
          <div ref={contentRef} className={styles.chatWindowDialogBoxContainer}>
                {!isLoading && !hasChildren && chatPreview}
                <div className={styles.chatWindowDialogBoxContent}>
                {children}
                {isLoading && (
                    <ChatResponseLoader
                        icon={icon}
                        fallbackIcon={responseFallbackIcon}
                        text="Thinking for"
                    />
                )}
            </div>
          </div>
          {(showScrollBtn && hasChildren) && (
            <button
                className={styles.scrollButton}
                onClick={handleScrollToBottom}
                aria-label="Scroll to bottom"
                type="button"
            >
                <img src={scrollButton} alt="Scroll to bottom" />
            </button>
          )}
        </div> 

        {promptInputComponent && (
            <div ref={searchBoxRef} className={classnames(styles.promptField, {
                [styles.centered]: hasCenteredPromptInput
            })}>
                {promptInputHeaderText && (
                    <TextElement className={styles.promptFieldTitle} as="h3">
                        {promptInputHeaderText}
                    </TextElement>
                )}
                {promptInputError && (
                    <div className={styles.promptInputError}>
                        {promptInputError}
                    </div>
                )}
                {promptInputComponent}
                {disclaimer && (
                    <div className={styles.disclaimer}>
                        {disclaimer}
                    </div>
                )}
            </div>
        )}
      </div>
    </div>
  );
};

export default ChatDialog;