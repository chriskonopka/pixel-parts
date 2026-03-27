import * as React from 'react';
import ShimmerPanel from '../ShimmerPanel';
import TextHighlight from './TextHighlight';
import { createHighlightsFromCoordinates, scrollToHighlight } from './helpers';

import { configurePdfJsWorker } from "./pdfWorker";

import styles from './PDFViewer.module.scss';


import {
  AreaHighlight,
  PdfHighlighter,
  PdfLoader,
  Tip,
  Content,
  IHighlight,
  NewHighlight,
  ScaledPosition,
} from 'react-pdf-highlighter';

export interface Rect {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  width: number;
  height: number;
  pageNumber?: number;
}

export interface HighlightCoordinatesMap {
  [id: string]: Rect[];
}

export interface PDFViewerProps {
  /** URL of the PDF document to be displayed */
  documentUrl: string;
  /** Object mapping highlight IDs to arrays of coordinates @default {} */
  highlightCoordinates?: HighlightCoordinatesMap;
  /** Callback function triggered when the scroll position changes @default () => {} */
  onScrollChange?: () => void;
  /** Optional prop to hide the tooltip @default false */
  hideTooltip?: boolean;
  /**
   * When present, the viewer will READ/CLEAR the highlight id from the hash query param
   * (e.g. "#/route?hl=<id>"). If omitted, legacy hash ("#highlight-<id>") is used.
   */
  highlightParamKey?: string; // e.g. "hl"
}

const getNextId = () => String(Math.random()).slice(2);
const parseIdFromLegacyHash = (): string => (document.location.hash || '').slice('#highlight-'.length);

function getHighlightFromLocation(highlightParamKey?: string): string | undefined {
  if (highlightParamKey) {
    const raw = (window.location.hash || '').slice(1);
    const queryIndex = raw.indexOf('?');
    if (queryIndex !== -1) {
      const params = new URLSearchParams(raw.slice(queryIndex + 1));
      const highlight = params.get(highlightParamKey);
      if (highlight) return highlight;
    }
  }
  // fallback to legacy
  const hash = window.location.hash || '';
  if (hash.startsWith('#highlight-')) return parseIdFromLegacyHash();
  return undefined;
}

function clearHighlightInLocation(highlightParamKey?: string): void {
  if (highlightParamKey) {
    const raw = (window.location.hash || '').slice(1);
    const queryIndex = raw.indexOf('?');
    if (queryIndex === -1) return;
    const route = raw.slice(0, queryIndex);
    const queryString = raw.slice(queryIndex + 1);
    const params = new URLSearchParams(queryString);
    if (params.has(highlightParamKey)) {
      params.delete(highlightParamKey);
      const newHash = params.toString() ? `${route}?${params.toString()}` : route;
      history.replaceState(null, '', `#${newHash}`);
    }
    return;
  }
  // legacy clear
  document.location.hash = '';
}

const PDFViewer = (props: PDFViewerProps) => {
  const {
    documentUrl,
    highlightCoordinates = {},
    onScrollChange = () => {},
    hideTooltip = false,
    highlightParamKey,
  } = props;

  const [highlights, setHighlights] = React.useState<IHighlight[]>(
    createHighlightsFromCoordinates(highlightCoordinates)
  );

  const scrollViewerTo = React.useRef<(h: IHighlight) => void>(() => {});

  const getHighlightById = (id: string) => highlights.find((h) => h.id === id);

  const scrollToHighlightFromHash = React.useCallback(() => {
    if (!highlights.length) return;
    const id = getHighlightFromLocation(highlightParamKey);
    if (!id) return;
    const highlight = getHighlightById(id);
    if (highlight) scrollViewerTo.current(highlight);
  }, [highlights, highlightParamKey]);

  React.useEffect(() => {
    window.addEventListener('hashchange', scrollToHighlightFromHash, false);
    return () => window.removeEventListener('hashchange', scrollToHighlightFromHash);
  }, [scrollToHighlightFromHash]);

  const addHighlight = (highlight: NewHighlight) => {
    setHighlights((prev) => [{ ...highlight, id: getNextId() }, ...prev]);
  };

  const updateHighlight = (
    highlightId: string,
    position: Partial<ScaledPosition>,
    content: Partial<Content>
  ) => {
    setHighlights((prev) => prev.map((h) => {
      const { id, position: originalPosition, content: originalContent, ...rest } = h;
      return id === highlightId
        ? { id, position: { ...originalPosition, ...position }, content: { ...originalContent, ...content }, ...rest }
        : h;
    }));
  };

  React.useEffect(() => {
    configurePdfJsWorker();
  }, []);

  React.useEffect(() => {
    setHighlights(createHighlightsFromCoordinates(highlightCoordinates));
  }, [highlightCoordinates]);

  React.useEffect(() => {
    scrollToHighlightFromHash();
  }, [highlights, scrollToHighlightFromHash]);

  return (
    <div className={styles.pdfViewer}>
      <PdfLoader url={documentUrl} beforeLoad={<ShimmerPanel variant="gray" /> }>
        {(pdfDocument) => (
          <PdfHighlighter
            pdfDocument={pdfDocument}
            enableAreaSelection={(event) => event.altKey}
            onScrollChange={() => {
              // if highlightParamKey is present → remove only that param; else clear the whole hash
              clearHighlightInLocation(highlightParamKey);
              onScrollChange();
            }}
            scrollRef={(scrollTo) => {
              scrollViewerTo.current = scrollTo;
              scrollToHighlightFromHash();
            }}
            onSelectionFinished={(position, content, hideTipAndSelection, transformSelection) => (
              hideTooltip ? null : (
                <Tip
                  onOpen={transformSelection}
                  onConfirm={(comment) => { addHighlight({ content, position, comment }); hideTipAndSelection(); }}
                />
              )
            )}
            highlightTransform={(highlight, index, setTip, hideTip, viewportToScaled, screenshot, isScrolledTo) => {
              const isTextHighlight = !highlight.content?.image;
              return isTextHighlight ? (
                <TextHighlight key={index} position={highlight.position} />
              ) : (
                <AreaHighlight
                  isScrolledTo={isScrolledTo}
                  highlight={highlight}
                  onChange={(boundingRect) => {
                    updateHighlight(
                      highlight.id,
                      { boundingRect: viewportToScaled(boundingRect) },
                      { image: screenshot(boundingRect) },
                    );
                  }}
                />
              );
            }}
            highlights={highlights}
          />
        )}
      </PdfLoader>
    </div>
  );
};

(PDFViewer as any).scrollToHighlight = scrollToHighlight;

export default PDFViewer;
