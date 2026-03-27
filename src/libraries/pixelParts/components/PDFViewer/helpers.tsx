import type { IHighlight } from 'react-pdf-highlighter';

export interface Rect {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  width: number;
  height: number;
  pageNumber?: number;
}

/**
 * Router-aware scroll trigger
 * - Defaults to LEGACY behavior (preserves existing callers):
 *     window.location.hash = "highlight-<id>"
 * - Opt-in query-param mode keeps the current hash *route* and writes ?hl=<id> (or a custom key).
 * - "auto" tries query-param first when a hash route exists, else falls back to legacy.
 * - Accepts either raw ids ("chat-2-1") or prefixed ("highlight-chat-2-1").
 */
export const scrollToHighlight = (
  highlightId: string,
  opts: { mode?: 'legacy' | 'query' | 'auto'; paramKey?: string } = {}
): void => {
  const mode = opts.mode ?? 'legacy'; // LEGACY DEFAULT
  const key = opts.paramKey ?? 'hl';
  const id = (highlightId || '').replace(/^highlight-/, '');

  if (mode === 'legacy') {
    window.location.hash = `highlight-${id}`;
    return;
  }

  const raw = (window.location.hash || '').slice(1); // "/route?x=y"
  const queryIndex = raw.indexOf('?');
  const route = queryIndex === -1 ? raw : raw.slice(0, queryIndex);
  const queryString = queryIndex === -1 ? '' : raw.slice(queryIndex + 1);

  const canQuery = !!route; // only write query when we have a route segment
  if (mode === 'query' || (mode === 'auto' && canQuery)) {
    const params = new URLSearchParams(queryString);
    params.set(key, id);
    const next = `#${route}${params.toString() ? `?${params.toString()}` : ''}`;

    // Replace so HashRouter doesn't navigate; also notify interested listeners.
    history.replaceState(null, '', next);
    window.dispatchEvent(new HashChangeEvent('hashchange'));
    return;
  }

  // Fallback: keep old behavior so something still happens
  window.location.hash = `highlight-${id}`;
};

export const getCommonPageNumber = (rects: Rect[]): number => {
  const countMap = new Map<number | undefined, number>();

  for (const rect of rects) {
    const page = rect.pageNumber;
    countMap.set(page, (countMap.get(page) || 0) + 1);
  }

  let mostCommon: number | null = null;
  let maxCount = -1;

  for (const [page, count] of countMap.entries()) {
    if (count > maxCount) {
      mostCommon = (page as number) ?? 1;
      maxCount = count;
    }
  }

  return mostCommon ?? 1;
};

export const getBoundingRect = (rects: Rect[]): Rect => {
  const boundingRect: Rect = {
    x1: Math.min(...rects.map(r => r.x1)),
    y1: Math.min(...rects.map(r => r.y1)),
    x2: Math.max(...rects.map(r => r.x2)),
    y2: Math.max(...rects.map(r => r.y2)),
    width: rects[0]?.width,
    height: rects[0]?.height,
    pageNumber: getCommonPageNumber(rects),
  };

  return boundingRect;
};

export const createHighlightsFromCoordinates = (
  coordinates: { [id: string]: Rect[] }
): IHighlight[] => {
  return Object.entries(coordinates).map(([id, rects]) => {
    const boundingRect = getBoundingRect(rects);
    return {
      content: { text: '' },
      position: {
        boundingRect,
        rects,
        pageNumber: boundingRect.pageNumber ?? 1,
      },
      comment: { text: '', emoji: '' },
      id,
    } as IHighlight;
  });
};
