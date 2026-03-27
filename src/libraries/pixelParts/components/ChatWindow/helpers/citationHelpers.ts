import styles from '../components/ChatResponse/ChatResponse.module.scss';

export interface Rect {
    x1: number;
    y1: number;
    x2: number;
    y2: number;
    width: number;
    height: number;
    pageNumber?: number;
    fileName?: string;
}

export interface HighlightCoordinatesMap {
    [id: string]: Rect[];
}

export interface CitationParseResult {
    html: string;
    coords: HighlightCoordinatesMap;
}

export interface FileData {
    width: number;
    height: number;
}

/**
 * removeCitationsCoordinatesFromResponse
 * ------------------------------------------------------------------
 * Deletes every coordinate block from a string, covering:
 *   • [File.pdf~Page#N~x1, y1, x2, y2]      (real filename + tilde)
 *   • [f1~Page#N~x1, y1, x2, y2]            (placeholder label + tilde)
 *   • [Page#N~x1, y1, x2, y2]               (no prefix + tilde)
 *   • [Page#N - x1, y1, x2, y2]             (hyphen, en-dash, or em-dash)
 * Leading whitespace is removed so no stray spaces remain.
 */
export function removeCitationsCoordinatesFromResponse(rawHtml: string): string {
    /* tilde styles :  filename  OR  placeholder label  OR  nothing
       -- the prefix “[…]~” part is now optional and matches any chars
       except ‘]’ or ‘~’, so it covers “f1”, real filenames, or nothing. */
    const RX_TILDE =
        /\s*\[(?:[^\]~]+~)?Page#\d+~[^\]]+\]/gi;

    /* Page#… – or — or -  style (unchanged) */
    const RX_DASH =
        /\s*\[Page#\d+\s*[-–—]\s*[\d.]+\s*,\s*[\d.]+\s*,\s*[\d.]+\s*,\s*[\d.]+\s*\]/gi;

    return rawHtml.replace(RX_TILDE, "").replace(RX_DASH, "");
}

export const convertPdfRectToTopLeftOrigin = (coordinates): Rect => {
    const { x1, y1, x2, y2, height, width, pageNumber, fileName } = coordinates;
    return {
        x1,
        y1: height - y2,
        x2,
        y2: height - y1,
        height,
        width,
        ...(pageNumber !== undefined && { pageNumber }),
        ...(fileName && { fileName })
    };
};

/* -------------------------------------------------------------------------- */
/* Parse ONE coordinate block (now handles three styles)                      */
/* -------------------------------------------------------------------------- */
export const parsePdfCoordinateString = (
    input: string
): Omit<Rect, "height" | "width"> => {
    /* 1️⃣  Which style? (tilde or dash) ------------------------------------ */
    const isTilde = /Page#\d+~/i.test(input);

    /* 1️⃣  pageMatch guard ------------------------------------------ */
    const pageMatch = isTilde
        ? input.match(/Page#(\d+)~/i)                 /* tilde styles */
        : input.match(/\[Page#(\d+)\s*[-–—]/i);       /* dash style   */
    if (!pageMatch) {
        throw new Error("Page number not found.");
    }
    const pageNumber = parseInt(pageMatch[1], 10);

    /* 2️⃣  coordMatch guard ---------------------------------------- */
    const coordMatch = isTilde
        ? input.match(/Page#\d+~\s*([\d.,\s]+)\]/i)
        : input.match(/\[Page#\d+\s*[-–—]\s*([\d.,\s]+)\]/i);
    if (!coordMatch) {
        throw new Error("Coordinates not found.");
    }

    /* 3️⃣  file name extractor (only applies to filename-tilde variant) ----- */
    const fileMatch = input.match(/^\[([^\]~]+)~Page#/i);
    const fileName = fileMatch ? fileMatch[1].trim() : undefined;

    /* 4️⃣  parse numbers guard -------------------------------------- */
    const coords = coordMatch[1]
        .split(",")
        .map((s) => parseFloat(s.trim()));

    if (coords.length !== 4) {
        throw new Error("Expected exactly 4 coordinate values.");
    }

    const [x1, y1, x2, y2] = coords;
    return { x1, y1, x2, y2, pageNumber, fileName };
};

/* ========================================================================== */
/* Build map for each citation                                  */
/* ========================================================================== */
export const parseCitationsFromStrings = (
    coordsArray: string[][],
    width: number,
    height: number
): HighlightCoordinatesMap => {
    const highlightCordinates: HighlightCoordinatesMap = {};

    coordsArray.forEach((subArray) => {
        if (subArray.length === 0) return;

        const firstCoord = parsePdfCoordinateString(subArray[0]);
        // console.log(`${width}x${height} - ${firstCoord.x1}, ${firstCoord.y1}, ${firstCoord.x2}, ${firstCoord.y2}, ${firstCoord.pageNumber}`);
        const key = `${firstCoord.x1}-${firstCoord.y1}-${firstCoord.x2}-${firstCoord.y2}-${firstCoord.pageNumber}`.replace(
            /\./g,
            ""
        );

        highlightCordinates[key] = subArray.map((coordsString) => {
            const coords = {
                ...parsePdfCoordinateString(coordsString),
                height,
                width
            };
            return convertPdfRectToTopLeftOrigin(coords);
        });
    });

    return highlightCordinates;
};

/* ========================================================================== */
/* MAIN FUNCTION – insertCitations                                            */
/* ========================================================================== */
/**
 * Replace every valid coordinate block `[Page#N~x1, y1, x2, y2]` with a numbered
 * citation link, build a HighlightCoordinatesMap keyed by that number, and return
 * the modified HTML plus the map.
 *
 *  ✱  The “#” after **Page** is now **required**.
 *  ✱  Any block that fails validation is silently stripped from the output
 *     and logged to the console.  It contributes **no** citation.
 */
/**
 * MAIN FUNCTION
 * ------------------------------------------------------------------ */
/**
 * Replace every valid coordinate block `[Page#N - x1, y1, x2, y2]` with a numbered
 * citation link, build a HighlightCoordinatesMap keyed by that number, and return
 * the modified HTML plus the map.
 *
 *  ✱  The “#” after **Page** is now **required**.
 *  ✱  Any block that fails validation is silently stripped from the output
 *     and logged to the console.  It contributes **no** citation.
 *
 *  ✱  `fileLabelMap` (optional) converts placeholder labels
 *     like “f1”, “f2” into real file names for the tooltip.
 */
export function insertCitations(
    rawHtml: string,
    docDimensions: { width: number; height: number; } = { width: 612, height: 792 },
    responseType: "summary" | "chat" = "summary",
    chatIndex: number = 0,
    fileLabelMap: { label: string; fileName: string; key: string, fileData: FileData }[] = [],
): CitationParseResult {

    let pageWidth = docDimensions.width;
    let pageHeight = docDimensions.height;

    // const { width: pageWidth, height: pageHeight } = docDimensions;

    /* VALID block: filename~Page#…~,  Page#…~,  or Page#… - … */
    const COORD_RX =
        /\[(?:[^\]~]+~)?Page#\d+~\s*[\d.]+\s*,\s*[\d.]+\s*,\s*[\d.]+\s*,\s*[\d.]+\s*\]|\[Page#\d+\s*[-–—][^\]]+\]/i;

    /* ANY block: union of the three styles */
    const ANY_BLOCK_RX =
        /\[(?:[^\]~]+~)?Page#\d+~[^\]]+\]|\[Page#\d+\s*[-–—][^\]]+\]/gi;

    let citationCounter = 0;
    const citationMap: HighlightCoordinatesMap = {};

    const processedLines = rawHtml
        .split(/\r?\n/)
        .filter((line) => line.trim() !== "")
        .map((line) => {
            let newLine = line;
            const coordsInLine: string[] = [];

            (line.match(ANY_BLOCK_RX) || []).forEach((block) => {
                if (COORD_RX.test(block)) {
                    coordsInLine.push(block);
                } else {
                    console.warn(`✘ skipping malformed coordinate → ${block}`);
                    newLine = newLine.replace(block, "");
                }
            });

            if (coordsInLine.length === 0) return newLine;

            /* extractor works for all styles */
            const groups: Record<number, string[]> = {};
            coordsInLine.forEach((c) => {
                const pageMatch = c.match(/Page#(\d+)/i);
                const page = pageMatch ? Number(pageMatch[1]) : 0;
                (groups[page] ??= []).push(c);
            });

            Object.entries(groups).forEach(([_, blocks]) => {
                citationCounter += 1;
                const citationId = citationCounter;

                /* ------------------------------------------------------------------
               *  Resolve placeholder label (f1, f2 …) to real file name
               * ------------------------------------------------------------------ */
                const firstBlock = blocks[0];
                /* try to capture anything BEFORE “~Page#” (may be missing) */
                const labelMatch = firstBlock.match(/\[([^\]~]+)~Page#/i);
                let fileName = labelMatch ? labelMatch[1].trim() : undefined;

                /* if it looks like “f#”, consult the mapping array */
                if (fileName && /^f\d+$/i.test(fileName)) {
                    const entry = fileLabelMap.find(m => m.label === fileName);
                    if (entry) {
                        fileName = entry.fileName;
                        if (entry.fileData) {
                            pageWidth = entry.fileData.width;
                            pageHeight = entry.fileData.height;
                        }
                    }
                }

                const rects = parseCitationsFromStrings(
                    [blocks],
                    pageWidth,
                    pageHeight
                )[Object.keys(
                    parseCitationsFromStrings([blocks], pageWidth, pageHeight)
                )[0]];

                const citationIdWithType =
                    responseType === "chat"
                        ? `chat-${citationId}-${chatIndex}`
                        : `summary-${citationId}`;
                const resolvedName = fileName?.split(/[\\/]/).pop()?.trim();
                let rectsWithName = rects;
                if (resolvedName) {
                    rectsWithName = rects.map(r => ({ ...r, fileName: resolvedName }));
                }
                citationMap[citationIdWithType] = rectsWithName;

                /* fall-back if filename is still undefined */
                if (!fileName) fileName = 'Unknown file';

                /* derive page number for tooltip (already extracted) */
                const pg = rects[0]?.pageNumber ?? '';

                const linkMarkup =
                    ` <a href="#cite-${citationIdWithType}" data-cite="${citationIdWithType}" ` +
                    `data-tooltip="${fileName}|${pg}" class="${styles.citation}">${citationId}</a>`;

                let first = true;
                blocks.forEach((block) => {
                    newLine = newLine.replace(block, first ? linkMarkup : "");
                    first = false;
                });
            });

            return newLine;
        });

    return { html: processedLines.join("\n"), coords: citationMap };
}

/* ========================================================================== */
/* removeCoordinates – strip all three styles                                 */
/* ========================================================================== */
/**
 * removeCoordinates
 * ------------------------------------------------------------------
 * Deletes every coordinate block from a string, covering:
 *   • [File.pdf~Page#N~x1, y1, x2, y2]
 *   • [Page#N~x1, y1, x2, y2]
 *   • [Page#N - x1, y1, x2, y2]   (hyphen, en-dash, or em-dash)
 * Leading whitespace is removed so no stray spaces remain.
 */
export function removeCoordinates(rawHtml: string): string {
    /* tilde styles (filename optional) */
    const RX_TILDE =
        /\s*\[(?:[^\]~]+~)?Page#\d+~[^\]]+\]/gi;

    /* Page#… – or — or -  style */
    const RX_DASH =
        /\s*\[Page#\d+\s*[-–—]\s*[\d.]+\s*,\s*[\d.]+\s*,\s*[\d.]+\s*,\s*[\d.]+\s*\]/gi;

    return rawHtml.replace(RX_TILDE, "").replace(RX_DASH, "");
}

export const createCitationTooltip = (anchor: HTMLElement): void => {
    if (!anchor) return;

    const tooltipText = anchor.getAttribute('data-tooltip');
    if (!tooltipText) return;

    const [fileName, pageNumber] = tooltipText.split('|');

    // Remove any existing tooltip
    const existing = document.getElementById('pdf-citation-tooltip');
    if (existing) existing.remove();

    // Create tooltip element
    const tooltipDiv = document.createElement('div');
    tooltipDiv.id = 'pdf-citation-tooltip';
    tooltipDiv.setAttribute('role', 'tooltip');
    tooltipDiv.style.display = 'flex';
    tooltipDiv.style.flexDirection = 'column';
    tooltipDiv.style.gap = '10px';
    tooltipDiv.style.position = 'absolute';
    tooltipDiv.style.zIndex = '16';
    tooltipDiv.style.background = '#fff';
    tooltipDiv.style.border = '1px solid #d3d3d3';
    tooltipDiv.style.padding = '10px';
    tooltipDiv.style.borderRadius = '6px';
    tooltipDiv.style.boxShadow = '0 0 8px #0000001a';
    tooltipDiv.style.color = '#000';
    tooltipDiv.style.fontSize = '15px';
    tooltipDiv.style.pointerEvents = 'none';
    tooltipDiv.style.minWidth = '300px';
    tooltipDiv.style.maxWidth = '400px';

    if (fileName === 'Unknown file') {
        tooltipDiv.innerHTML = `
            <div>Page: ${pageNumber}</div>
        `;
    } else {
        tooltipDiv.innerHTML = `
            <div style="display: flex; align-items: center; gap: 8px;">
                <div>${fileName}</div>
            </div>
            <div>Page: ${pageNumber}</div>
        `;
        // tooltipDiv.innerHTML = `
        //     <div style="display: flex; align-items: center; gap: 8px;">
        //         <img src="${require('')}" alt="${fileName}" width="16" />
        //         <div>${fileName}</div>
        //     </div>
        //     <div>Page: ${pageNumber}</div>
        // `;
    }

    // Get anchor and parent container positions
    const anchorRect = anchor.getBoundingClientRect();
    const container = anchor.closest('div'); // parent container
    const containerRect = container ? container.getBoundingClientRect() : { left: 0, right: window.innerWidth };

    // Calculate left position
    let left = anchorRect.left;
    const top = anchorRect.bottom + window.scrollY + 4; // 4px gap below anchor

    // Temporarily add to body to measure width
    tooltipDiv.style.visibility = 'hidden';
    document.body.appendChild(tooltipDiv);
    const tooltipWidth = tooltipDiv.offsetWidth;
    tooltipDiv.style.visibility = 'visible';

    // Adjust left so tooltip doesn't overflow parent container
    if (left + tooltipWidth > containerRect.right) {
        left = containerRect.right - tooltipWidth - 8; // 8px padding
    }
    if (left < containerRect.left) {
        left = containerRect.left + 8; // 8px padding
    }

    tooltipDiv.style.left = left + window.scrollX + 'px';
    tooltipDiv.style.top = top + 'px';

    document.body.appendChild(tooltipDiv);

    // Remove tooltip on mouseout
    anchor.addEventListener('mouseleave', () => {
        tooltipDiv.remove();
    }, { once: true });

    anchor.addEventListener('click', () => {
        tooltipDiv.remove();
    }, { once: true });
};

export type HighlightUrlMode = 'none' | 'legacy' | 'query';

/**
* Sync a highlight id into the URL.
* - 'none' → do nothing
* - 'legacy' → write "#highlight-<id>"
* - 'query' → write "#/route?{key}=<id>" with history.replaceState (no hashchange)
*/
export function syncHighlightInUrl(
  mode: HighlightUrlMode,
  id?: string,
  opts?: { key?: string }
) {
  if (!id || mode === 'none') return;


  if (mode === 'legacy') {
  window.location.hash = `highlight-${id}`;
  return;
}

  // query mode
  const key = opts?.key || 'hl';
  const raw = (window.location.hash || '').slice(1);
  const queryIndex = raw.indexOf('?');
  const route = queryIndex === -1 ? raw : raw.slice(0, queryIndex);
  const queryString = queryIndex === -1 ? '' : raw.slice(queryIndex + 1);


  const params = new URLSearchParams(queryString);
  params.set(key, id);


  const next = `#${route}${params.toString() ? `?${params.toString()}` : ''}`;
  history.replaceState(null, '', next); // no hashchange → HashRouter stays put
}

/**
* Build a shareable href for a given highlight id under the current route.`
* Use this for anchor elements so users can copy link targets.
*/
export function makeHighlightHref(
  mode: HighlightUrlMode,
  id?: string,
  opts?: { key?: string }
) {
  if (!id) return '#!';

  if (mode === 'legacy') return `#highlight-${id}`;
  if (mode === 'none') return '#!';

  const key = opts?.key || 'hl';
  const raw = (window.location.hash || '').slice(1); // "/route?x=y"
  const queryIndex = raw.indexOf('?');
  const route = queryIndex === -1 ? raw : raw.slice(0, queryIndex);
  const queryString = queryIndex === -1 ? '' : raw.slice(queryIndex + 1);

  const params = new URLSearchParams(queryString);
  params.set(key, id);

  const next = `#${route}${params.toString() ? `?${params.toString()}` : ''}`;
  return next;
}