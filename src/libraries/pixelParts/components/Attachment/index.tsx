import * as React from "react";
import classnames from 'classnames';
import { DismissRegular } from '@fluentui/react-icons';

import Card from "../Card";
import DocumentIcon from "../DocumentIcon";

import { getFileIconProps } from "../../../../helpers/iconHelpers";
import usePreloadedBackground from "../../../../hooks/usePreloadedBackground";

import styles from "./Attachment.module.scss";

export interface FileAttachment {
  fileName: string;
  iconName?: string;
  type: string;
  previewUrl?: string;
}

export interface AttachmentProps {
  /** 
   * The attachment data
   */
  attachment: FileAttachment;
  /**
   * Indicates whether the attachment is in a loading state
   */
  isLoading?: boolean;
  /**
   * Callback function to handle removal of the attachment
   */
  onRemove?: () => void;
}

const Attachment = React.memo((props: AttachmentProps): React.ReactElement => {
  const { attachment, onRemove, isLoading = false } = props;

  const fileIconProps = getFileIconProps(attachment.fileName);
  const previewUrl = attachment.previewUrl;

  const removeButton = onRemove ? (
    <button className={styles.removeAttachmentbutton} onClick={onRemove}>
      <DismissRegular className={styles.removeAttachmentIcon} aria-hidden="true" focusable={false} />
    </button>
  ) : null;

  const overlay = isLoading 
    ? (
      <div className={classnames(styles.fileAttachmentOverlay, {
        [styles.isImage]: !!previewUrl
      })}>
        <div className={styles.fileAttachmentSpinner}/>
      </div>
    ) 
    : null;

  const truncateFileName = (fileName: string, maxLength: number = 25): string => {
    if (fileName.length <= maxLength) return fileName;
    const extensionIndex = fileName.lastIndexOf('.');
    const extension = extensionIndex !== -1 ? fileName.slice(extensionIndex) : '';
    const nameWithoutExtension =
      extensionIndex !== -1 ? fileName.slice(0, extensionIndex) : fileName;
    const truncatedName = nameWithoutExtension.slice(0, maxLength - extension.length - 3);
    return `${truncatedName.trim()}..${extension}`;
  };

  const imagePreview = usePreloadedBackground(previewUrl);

  return previewUrl ? (
    <div
      className={styles.imageAttachment}
      style={imagePreview ? { backgroundImage: `url(${imagePreview})` } : undefined}
      role="img"
      aria-label={attachment.fileName}
    >
      {overlay}
      {removeButton}
    </div>
  ) : (
    <Card classNames={styles.fileAttachment} icon={<DocumentIcon color={fileIconProps.color} />}>
      {overlay}
      <div className={styles.fileName}>
        <div>
          <div className={styles.fileAttachmentName}>{truncateFileName(attachment.fileName)}</div>
          <div className={styles.fileAttachmentType}>{fileIconProps.type}</div>
        </div>
        {removeButton}
      </div>
    </Card>
  );
});

export default Attachment;