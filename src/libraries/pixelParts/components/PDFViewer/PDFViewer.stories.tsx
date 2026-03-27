import * as React from 'react';
import { createHighlightsFromCoordinates } from './helpers';

import Button from '../Button';

import PDFViewer from '.';
import { highlightCoordinates } from './example-highlights';

const styles = {
  list: {
    marginBottom: 35,
    borderBottom: '1px solid #ccc',
    paddingBottom: 20,
    paddingLeft: 0,
    display: 'flex',
    gap: 20,
    listStyleType: 'none' as const,
  },
  text: { flex: 1 },
  button: { cursor: 'pointer' },
};

export default {
  title: 'Media/PDFViewer',
  component: PDFViewer,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'The <b>PDFViewer</b> embeds a PDF document on the page. Features include highlighting and scrolling text.'
      }
    }
  }
};

/** Legacy buttons: drive #highlight-<id> via static helper */
const legacyButtonsDecorator = (Story: any) => (
  <>
    <ul style={styles.list as React.CSSProperties}>
      {createHighlightsFromCoordinates(highlightCoordinates).map((highlight, index) => (
        <li key={index}>
          <Button
            text={`Go to highlight ${index + 1}`}
            variant="lightGray"
            onClick={() => (PDFViewer as any).scrollToHighlight(highlight.id)}
          />
        </li>
      ))}
    </ul>
    <Story />
  </>
);

/** Router-safe helper: set ?hl=<id> inside the hash, then fire a hashchange so the viewer reacts */
function setHashQueryHighlight(id: string, key = 'hl') {
  const raw = (window.location.hash || '').slice(1); // e.g. "/route?hl=x"
  const qi = raw.indexOf('?');
  const route = qi === -1 ? raw : raw.slice(0, qi);
  const params = new URLSearchParams(qi === -1 ? '' : raw.slice(qi + 1));
  params.set(key, id);
  const newHash = params.toString() ? `${route}?${params.toString()}` : route;
  history.replaceState(null, '', `#${newHash}`); // no navigation
  window.dispatchEvent(new HashChangeEvent('hashchange')); // notify the viewer
}

/** Query buttons: drive #/route?hl=<id> so viewer reads highlightParamKey */
const hashQueryButtonsDecorator = (Story: any) => (
  <>
    <ul style={styles.list as React.CSSProperties}>
      {createHighlightsFromCoordinates(highlightCoordinates).map((highlight, index) => (
        <li key={index}>
          <Button
            text={`Go to highlight ${index + 1} (hl)`}
            variant="lightGray"
            onClick={() => setHashQueryHighlight(highlight.id, 'hl')}
          />
        </li>
      ))}
    </ul>
    <Story />
  </>
);

export const Legacy = {
  name: 'Legacy (#highlight-<id>)',
  decorators: [legacyButtonsDecorator],
  args: {
    documentUrl: 'https://arxiv.org/pdf/1708.08021',
    highlightCoordinates,
  },
};

export const Query = {
  name: 'Query Param (#/route?hl=<id>)',
  decorators: [hashQueryButtonsDecorator],
  args: {
    documentUrl: 'https://arxiv.org/pdf/1708.08021',
    highlightCoordinates,
    highlightParamKey: 'hl',
  },
};