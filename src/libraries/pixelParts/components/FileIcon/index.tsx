import * as React from 'react';
import {
  DocumentPdfRegular,
  DocumentTableRegular,
  DocumentTextRegular,
  SlideLayoutRegular,
  ImageRegular,
  DocumentRegular,
} from '@fluentui/react-icons';

import styles from './FileIcon.module.scss';

export interface FileIconProps {
    fileName: string;
    className?: string;
    size?: number;
}

type IconEntry = {
  Component: React.ComponentType<{ className?: string; style?: React.CSSProperties; 'aria-hidden'?: boolean | 'true' | 'false'; focusable?: boolean | string }>;
  colorClass: string;
};

const getIconEntry = (fileExtension: string | undefined): IconEntry => {
    switch (fileExtension) {
        case 'pdf':
            return { Component: DocumentPdfRegular, colorClass: styles.red };
        case 'docx':
            return { Component: DocumentTextRegular, colorClass: styles.blue };
        case 'pptx':
            return { Component: SlideLayoutRegular, colorClass: styles.orange };
        case 'xlsx':
            return { Component: DocumentTableRegular, colorClass: styles.green };
        case 'txt':
            return { Component: DocumentTextRegular, colorClass: styles.purple };
        case 'png':
        case 'jpg':
        case 'jpeg':
        case 'gif':
        case 'webp':
            return { Component: ImageRegular, colorClass: styles.black };
        default:
            return { Component: DocumentRegular, colorClass: styles.black };
    }
};

const FileIcon = ({ fileName, className, size = 16 }: FileIconProps): React.ReactElement => {
    const fileExtension = fileName.split('.').pop();
    const { Component, colorClass } = getIconEntry(fileExtension);

    return (
        <Component
            className={className ?? colorClass}
            style={{ fontSize: size }}
            aria-hidden="true"
            focusable={false}
        />
    );
};

export default FileIcon;
