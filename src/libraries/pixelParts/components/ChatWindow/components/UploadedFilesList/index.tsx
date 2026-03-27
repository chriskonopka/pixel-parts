import * as React from 'react';

import FlexBox from '../../../FlexBox';
import DocumentIcon from '../../../DocumentIcon';

import { getFileIconProps } from '../../../../../../helpers/iconHelpers';

import styles from './UploadedFilesList.module.scss';

import closeIcon from '../../../../../../assets/images/close.svg';
import fileIcon from '../../../../../../assets/images/file.svg';

export interface Attachment { 
    id: string;
    fileName: string; 
    iconName: string; 
    type: string; 
    previewUrl?: string;
}

export interface UploadedFilesListProps {
    /**
     * Whether the list is in a loading state.
     * @default false
     */
    loading?: boolean;
    /**
     * Array of uploaded file items.
     */
    items: Attachment[];
    /**
     * Callback function when removing a file.
     */
    onRemove: (id: string, fileName: string) => void,
    /**
     * Optional description text displayed above the file list.
     * @default Uploaded files—added through the chat—are used to inform the assistant's responses with relevant context. Removing a file will clear it from the current session. Uploaded files will be converted to PDF format for compatibility purposes.
     */
    text?: string;
    /**
     * Optional text to display when there are no files uploaded.
     * @default No context files have been added. To provide context, upload a file directly in the chat.
     */
    noFilesText?: string;
}

const UploadedFilesList = (props: UploadedFilesListProps): React.ReactElement => {
    const { 
        loading = false, 
        text,
        noFilesText = 'No Files',
        items = [], 
        onRemove 
    } = props;

    const isImageFile = (fileName: string): boolean => {
        const imageExtensions = ['.png', '.jpg', '.jpeg', '.gif', '.bmp', '.svg', '.webp'];
        const lowerCaseFileName = fileName.toLowerCase();
        return imageExtensions.some(ext => lowerCaseFileName.endsWith(ext));
    }

    return (
        <div className={styles.filesList}>
            {text && (
                <div className={styles.text}>
                    {text}
                </div>
            )}
            {!items || items.length === 0 && (
                <div className={styles.noFiles}>
                    <img src={fileIcon} width={28} alt="No Files Icon" />
                    <div>{noFilesText}</div>
                </div>
            )}
            {items && items.length > 0 && items.map((file: Attachment) => {
                const fileIconProps = getFileIconProps(file.fileName);
                const isImage = isImageFile(file.fileName);
                    return (
                        <FlexBox 
                            key={file.fileName} 
                            className={styles.file}
                            justifyContent="space-between" 
                            alignItems="center"
                            spacing={12}
                        >
                            <FlexBox spacing={12} alignItems="center">
                                <DocumentIcon 
                                    color={fileIconProps.color} 
                                    size={30}
                                    src={isImage ? file.previewUrl : undefined}
                                />
                                <span className={styles.fileName}>
                                    {file.fileName}
                                </span>
                            </FlexBox>
                            <button 
                                disabled={loading} 
                                onClick={() => onRemove(file.id, file.fileName)}
                                aria-label="Remove uploaded file"
                            >
                                <img src={closeIcon} alt="Remove Icon" width={12} />
                            </button>
                        </FlexBox>
                    );
            })}
        </div>
    );
};

export default UploadedFilesList;