import * as React from 'react';
import styles from './PDFViewer.module.scss';

const TextHighlight = ({ position }) => {
    const { rects } = position;

    return (
        <>
            {rects.map((rect, index) => (
                <div
                    key={index}
                    className={styles.textHighlight}
                    style={{
                        top: rect.top,
                        left: rect.left,
                        width: rect.width,
                        height: rect.height
                    }}
                />
            ))}
        </>
    );
};

export default TextHighlight;