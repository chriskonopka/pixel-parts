import * as React from 'react';
import classnames from 'classnames';
import DomPurify from "dompurify";

import CopyButton from '../../../CopyButton';
import Image from '../../../Image';
import FlexBox from '../../../FlexBox';
import FlexBoxItem from '../../../FlexBoxItem';
import Attachment from '../../../Attachment';
import Feedback from '../../../Feedback';
import FeedbackPanel from '../../../FeedbackPanel';
import ChatResponseView from './components/ChatResponseView';

import responseFallbackIcon from '../../../../../../assets/images/chat-ai-icon.svg';

import { HighlightCoordinatesMap } from '../../helpers/citationHelpers';

import {
  insertCitations,
  removeCoordinates,
  createCitationTooltip,
  removeCitationsCoordinatesFromResponse,
  syncHighlightInUrl,
  makeHighlightHref,
  type HighlightUrlMode
} from '../../helpers/citationHelpers';

import styles from './ChatResponse.module.scss';

export interface ChatResponseProps {
  /**
   * The sender of the message, either 'user' or 'assistant'.
   */
  sender: 'user' | 'assistant' | 'system';
  /**
   * Array of file objects attached to the message.
   */
  files?: {
      fileName: string;
      iconName?: string;
      type: string;
      previewUrl?: string;
  }[];
  /**
   * Optional icon to display with the response.
   */
  icon?: React.ReactNode;
  /**
   * Status code for the response (e.g., 200 for success).
   * @default 200
   */
  status?: number;
  /**
   * The main text content of the response.
   */
  text?: string;
  /**
   * The message content for system messages.
   */
  message?: React.ReactNode | string;
  /**
   * Ref for citation coordinates used in PDF highlighting.
   */
  citationCoordsRef?: any;
  /**
   * Document dimensions for PDF highlighting.
   */
  docDimensions?: any;
  /**
   * Whether the response is related to a PDF document.
   * @default false
   */
  hasCitations?: boolean;
  /**
   * Index of the chat message in the conversation.
   */
  chatIndex?: number;
  /**
   * Mapping of file names to prompt keys for citations.
   */
  flattendFileNamesPromptKeyMapping?: any[];
  /**
   * Highlight coordinates for summary citations.
   */
  summaryHighlightCoordinates?: HighlightCoordinatesMap;
  /**
   * Function to set highlight coordinates in the parent component.
   */
  setHighlightCoordinates?: (coords: HighlightCoordinatesMap) => void;
  /**
   * Function to set the highlight ID for scrolling.
   */
  setHighlightId?: (id: string | undefined) => void;
  /**
   * Callback fired when a citation is clicked.
   */
  onCitationClick?: (fileName: string) => void;
  /**
   * Array of vector file names associated with the response.
   */
  vectorFileNames?: string[];
  /**
   * When provided, enables query-param routing inside the current hash route.
   * Example: "#/page?hl=<id>" where highlightParamKey="hl".
   * If omitted, component defaults to LEGACY hash-reset behavior.
   */
  highlightParamKey?: string;
  /**
   * Force legacy hash-reset mode on/off. Defaults to true (legacy).
   * If false AND highlightParamKey is provided, query-param mode is used.
   */
  legacyRouting?: boolean;

    /**
   * Optional URL to the document library source for vector store assistants.
   */
  sourceDocLibUrl?: string;
  /**
   * Callback fired when feedback is submitted.
   */
  onFeedbackSubmit?: (feedback: string | boolean) => void;
  pdfViewer?: any
}

const ChatResponse = (props: ChatResponseProps): React.ReactElement => {
  const {
    icon,
    text,
    message,
    sender,
    files,
    citationCoordsRef,
    docDimensions,
    hasCitations = false,
    chatIndex,
    flattendFileNamesPromptKeyMapping,
    summaryHighlightCoordinates,
    vectorFileNames,
    status = 200,
    setHighlightCoordinates = () => {},
    setHighlightId = () => {},
    onCitationClick = () => {},
    highlightParamKey,
    legacyRouting = true,
    sourceDocLibUrl,
    onFeedbackSubmit,
    pdfViewer
  } = props;

  const [feedback, setFeedback] = React.useState<boolean | undefined>();
  const [showFeedbackPanel, setShowFeedbackPanel] = React.useState<boolean>(false);
  const [customFeedbackSubmitted, setCustomFeedbackSubmitted] = React.useState<boolean>(false);

  const chatResponseRef = React.useRef<HTMLDivElement>(null);
  const feedbackPanelRef = React.useRef<HTMLDivElement>(null);

  const urlMode: HighlightUrlMode = legacyRouting ? 'legacy' : (highlightParamKey ? 'query' : 'none');

  const responseText = text ?? '';

  const imageFiles = files?.filter(file => file.type.toLowerCase().match(/png|jpe?g|gif|bmp|webp|image/g));
  const docFiles = files?.filter(file => file.type.toLowerCase().match(/pdf|docx|xlsx|pptx|txt/g));
  
  let htmlText = '';
  if (hasCitations && responseText && citationCoordsRef?.current && docDimensions) {
    const { html, coords } = insertCitations(
      responseText,
      docDimensions,
      'chat',
      chatIndex,
      flattendFileNamesPromptKeyMapping
    );
    htmlText = html;
    citationCoordsRef.current = { ...citationCoordsRef.current, ...coords };
  } else {
    htmlText = removeCoordinates(responseText);
  }

  const showCopyOrFeedbackButtons = [200, 505].includes(status);

  const scrollToFeedbackPanel = () => {
    if (feedbackPanelRef.current) {
      setTimeout(() => {
        feedbackPanelRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
      }, 50);
    }
  }

  React.useEffect(() => {
    if (onFeedbackSubmit && feedback === true) {
      setShowFeedbackPanel(false);
    } else if (onFeedbackSubmit && feedback === false) {
      setShowFeedbackPanel(true);
      scrollToFeedbackPanel();
    } else {
      setShowFeedbackPanel(false);
    }
  }, [feedback, onFeedbackSubmit, feedbackPanelRef]);

  // After we inject HTML, ensure each citation link has a stable, shareable href
  React.useEffect(() => {
    const container = chatResponseRef.current;
    if (!container) return;

    const anchors = container.querySelectorAll<HTMLAnchorElement>('a.citation[data-cite]');
    anchors.forEach(a => {
      const id = a.getAttribute('data-cite');
      if (!id) return;
      const norm = id.replace(/^highlight-/, '');
      a.setAttribute('href', makeHighlightHref(urlMode, norm, { key: highlightParamKey }));
      a.setAttribute('role', 'button');
      a.setAttribute('tabindex', '0');
    });
  }, [htmlText, urlMode, highlightParamKey]);

  React.useEffect(() => {
    const container = chatResponseRef.current;
    if (!container) return;

    const handleActivate = (anchor: HTMLAnchorElement) => {
      const idRaw = anchor.getAttribute('data-cite');
      if (!idRaw) return;
      const id = idRaw.replace(/^highlight-/, '');

      const tooltipText = anchor.getAttribute('data-tooltip');
      if (!tooltipText) return;

      const fileKey = anchor.getAttribute('data-file') || undefined;
      const [fileName] = tooltipText.split('|');

      const currentCoords = citationCoordsRef.current[id];
      if (!currentCoords && summaryHighlightCoordinates) {
        citationCoordsRef.current = {
          ...citationCoordsRef.current,
          ...summaryHighlightCoordinates
        };
      }

      // Push rects to PDF viewer
      setHighlightCoordinates({ [id]: citationCoordsRef.current[id] });

      // Drive scroll behavior in viewer
      setHighlightId(`highlight-${id}`);

      // Update URL according to routing mode
      syncHighlightInUrl(urlMode, id, { key: highlightParamKey });

      // Notify host
      onCitationClick(fileKey || fileName);
    };

    const handleClick = (e: MouseEvent): void => {
      const anchor = (e.target as HTMLElement).closest<HTMLAnchorElement>('a[data-cite]');
      if (!anchor) return;
      e.preventDefault();
      handleActivate(anchor);
    };

    const handleKeyDown = (e: KeyboardEvent): void => {
      const anchor = (e.target as HTMLElement).closest<HTMLAnchorElement>('a[data-cite]');
      if (!anchor) return;
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        handleActivate(anchor);
      }
    };

    const showTooltip = (e: MouseEvent): void => {
      const anchor = (e.target as HTMLElement).closest<HTMLAnchorElement>('a[data-tooltip]');
      const tooltipText = anchor && anchor.getAttribute('data-tooltip');
      const isUnknownFile = tooltipText && tooltipText.includes('Unknown file');
      if (!anchor || isUnknownFile) return;
      createCitationTooltip(anchor);
    };

    container.addEventListener('click', handleClick);
    container.addEventListener('keydown', handleKeyDown);
    container.addEventListener('mouseover', showTooltip);

    return () => {
      container.removeEventListener('click', handleClick);
      container.removeEventListener('keydown', handleKeyDown);
      container.removeEventListener('mouseover', showTooltip);
    };
  }, [
    chatResponseRef, 
    citationCoordsRef, 
    summaryHighlightCoordinates, 
    setHighlightCoordinates, 
    setHighlightId, 
    onCitationClick, 
    urlMode, 
    highlightParamKey
  ]);

  const handleNegativeFeedback = (feedback: string, isCustomFeedback?: boolean) => {
    onFeedbackSubmit?.(feedback);

    if (isCustomFeedback) {
      setCustomFeedbackSubmitted(true);
    }
  };

  const handleHelpfulFeedback = (value) => {
    setFeedback(value);
    if (value === true) {
      onFeedbackSubmit?.(value as string);
    }
  };

  const handleSourceDocClick = (fileName): void => {
    const fullUrl = `${sourceDocLibUrl}?q=FileName:"${fileName}"`;
    window.open(fullUrl, '_blank', 'noopener,noreferrer');
  }

  function renderSourceDocLink(fileName) {
    return (
      <div onClick={() => handleSourceDocClick(fileName)}>
      {fileName}
    </div>
    );
  }

  const responseTextWithoutCoordinates = removeCitationsCoordinatesFromResponse(responseText);

  if (sender === 'user') {
    return (
      <div>
        {docFiles && (
          <div className={styles.files}>
            {docFiles.map(file => (
              <Attachment key={file.fileName} attachment={file} />
            ))}
          </div>
        )}
        {imageFiles && (
          <div className={styles.files}>
            {imageFiles.map(file => (
              <Attachment key={file.fileName} attachment={file} />
            ))}
          </div>
        )}
        {text && (
          <div className={styles.questionContainer} ref={chatResponseRef}>
            <div
              className={styles.questionContainerText}
              dangerouslySetInnerHTML={{ __html: DomPurify.sanitize(htmlText) }}
            />
          </div>
        )}
      </div>
    );
  } else if (sender === 'assistant') {
    return (
      <div ref={feedbackPanelRef}>
        <div className={styles.answerContainer}>
          {icon ?? (
            <Image
              src={responseFallbackIcon}
              alt=""
              aria-hidden="true"
              width={32}
            />
          )}
          <div 
            ref={chatResponseRef} 
            className={styles.answerContainerText} 
          >
            <ChatResponseView html={htmlText} pdfViewer={pdfViewer} />
          </div>
        </div>
        <FlexBox className={styles.responseFooter} wrap="wrap" alignItems="flex-start">
          {showCopyOrFeedbackButtons && (
            <FlexBoxItem>
              <FlexBox spacing={16} alignItems="center">
                <CopyButton
                  content={responseTextWithoutCoordinates}
                  confirmation={{ duration: 1000, message: 'Copied', type: 'basic' }}
                />
                {(onFeedbackSubmit) && (
                  <Feedback 
                    onClick={handleHelpfulFeedback}
                    isSubmitted={customFeedbackSubmitted}
                  />
                )}
              </FlexBox>
            </FlexBoxItem>
          )}
          {vectorFileNames && (
            <FlexBoxItem 
              className={classnames({
                [styles.vectorFiles]: showCopyOrFeedbackButtons,
              })} 
              flexGrow={1}
            >
              <FlexBox spacing={10} wrap="wrap">
                {vectorFileNames.map((fileName) => (
                  <FlexBoxItem key={fileName}>
                    {
                      sourceDocLibUrl 
                      ? (
                        <div className={styles.clickableVectorStoreFileName}>
                        {renderSourceDocLink(fileName)}
                      </div>
                      )
                      : <div className={styles.vectorFileName}>{fileName}</div>
                    }
                  </FlexBoxItem>
                ))}
              </FlexBox>
            </FlexBoxItem>
          )}
          {showFeedbackPanel && (
            <FlexBoxItem classNames={styles.feedbackPanel} flexGrow={1}>
              <FeedbackPanel
                onSubmit={(feedback) => handleNegativeFeedback(feedback, true)}
                onShowUserCommentBox={scrollToFeedbackPanel}
              />
            </FlexBoxItem>
          )}
        </FlexBox>
      </div>
    );
  } else if (sender === 'system') {
    return (
      <div className={styles.systemMessage}>
        <div className={styles.systemMessageText}>
          {message}
        </div>
      </div>
    );
  } else {
    return <></>;
  }
};

export default ChatResponse;