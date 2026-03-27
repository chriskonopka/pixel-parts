import * as React from 'react';
import styles from './SingleLineText.module.scss';

export interface SingleLineTextProps {
    text: string;
}

export function truncateTextToFit(ref: React.RefObject<HTMLElement>): boolean {
    const el = ref.current;
    if (!el) return false;

    if (el.clientWidth === 0) {
        return false;
    }

    const fullText =
        (el.dataset.fullText as string | undefined) ?? el.textContent ?? '';

    if (!el.dataset.fullText) {
        el.dataset.fullText = fullText;
    }

    el.textContent = fullText;

    if (el.scrollWidth <= el.clientWidth) {
        return false;
    }

    let start = 0;
    let end = fullText.length;
    let best = '…';

    while (start <= end) {
        const mid = Math.floor((start + end) / 2);
        const candidate = fullText.slice(0, mid).trimEnd() + '...';

        el.textContent = candidate;

        if (el.scrollWidth > el.clientWidth) {
            end = mid - 1;
        } else {
            best = candidate;
            start = mid + 1;
        }
    }

    el.textContent = best;
    return true;
}

const SingleLineText = ({ text }: SingleLineTextProps) => {
    const [wrapperWidth, setWrapperWidth] = React.useState<number | null>(null);
    const [showMore, setShowMore] = React.useState<boolean>(false);
    const [isTruncated, setIsTruncated] = React.useState<boolean>(false);

    const wrapperRef = React.useRef<HTMLDivElement>(null);
    const buttonRef = React.useRef<HTMLButtonElement>(null);
    const textRef = React.useRef<HTMLDivElement>(null);

    const setWrapperMaxWidth = React.useCallback(() => {
        if (!wrapperRef.current) return;

        const buttonWidth = buttonRef.current?.offsetWidth ?? 0;
        const textEl = textRef.current;

        const prev = textEl?.textContent ?? null;
        if (textEl) textEl.textContent = '';

        const width = wrapperRef.current.offsetWidth - buttonWidth;

        if (textEl && prev !== null) textEl.textContent = prev;

        setWrapperWidth(width);
    }, []);

    React.useEffect(() => {
        const handleResize = () => setWrapperMaxWidth();
        handleResize();

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [setWrapperMaxWidth, isTruncated]);

    React.useEffect(() => {
        const el = textRef.current;
        if (!el || wrapperWidth === null) return;

        el.dataset.fullText = text;

        if (!showMore) {
            el.textContent = text;
            const truncated = truncateTextToFit(textRef);
            setIsTruncated(truncated);
        } else {
            el.textContent = text;
        }
    }, [text, showMore, wrapperWidth]);

    return (
        <div
            ref={wrapperRef}
            className={styles.textWrapper}
            style={
                {
                    '--maxWidth': wrapperWidth ? `${wrapperWidth}px` : 'auto',
                    '--whiteSpace': showMore ? 'normal' : 'nowrap',
                } as React.CSSProperties
            }
        >
            <div ref={textRef} className={styles.text} />
            
            {isTruncated && (
                <button
                    ref={buttonRef}
                    className={styles.button}
                    onClick={() => setShowMore(prev => !prev)}
                >
                    {showMore ? 'Show less' : 'Show more'}
                </button>
            )}
        </div>
    );
};

export default SingleLineText;