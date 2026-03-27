import * as React from 'react';

import Button from '../../../Button';

import styles from './DownloadDocuments.module.scss';

import wordIcon from '../../../../../../assets/images/word-icon.png';    
import pdfIcon from '../../../../../../assets/images/pdf-icon.png'; 

type DocType = 'Word' | 'PDF';

export interface DownloadDocumentsProps {
    /**
     * 
     * @param docType 
     * @default () => {}
     */
    onClick: (docType: string) => void;
    /**
     * Callback function when the cancel button is clicked.
     * @default () => {}
     */
    onCancel?: () => void;
    /**
     * 
     * @param docType 
     * @default ['Word', 'PDF']
     */
    formats?: DocType[];
    /**
     * Text for the download section.
     */
    text?: string;
}

const DownloadDocuments = (props: DownloadDocumentsProps): React.ReactElement => {
    const { 
        formats = ['Word', 'PDF'],
        text = 'Download the full chat as a Word or PDF file',
        onClick = () => {}, 
        onCancel,
    } = props;

    const docIcons = {
        Word: wordIcon,
        PDF: pdfIcon,
    };

    return (
        <>
            {text && <div className={styles.text}>{text}</div>}
            <div className={styles.downloadButtons}>
                {onCancel && (
                    <Button
                        variant="lightGray"
                        onClick={onCancel}
                        text="Cancel"
                        fullWidth
                    />
                )}
                {formats.map((format) => (
                    <Button
                        key={format}
                        icon={<img src={docIcons[format]} alt={`${format} Icon`} width={20} />}
                        variant="lightGray"
                        text={format}
                        onClick={() => onClick(format.toLowerCase())}
                        fullWidth
                    />
                ))}
            </div>
        </>
    );
};

export default DownloadDocuments;