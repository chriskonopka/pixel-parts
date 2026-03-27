import * as React from 'react';
import classnames from 'classnames';
import {
  ErrorCircleRegular,
  CalendarRegular,
  DismissRegular,
  ChevronDownRegular,
  ChevronLeftRegular,
  ChevronRightRegular,
  CopyRegular,
  FilterRegular,
  ArrowSortUpRegular,
  ArrowSortDownRegular,
  StarFilled,
  DocumentPdfRegular,
  DocumentTableRegular,
  DocumentTextRegular,
  SlideLayoutRegular,
  ImageRegular,
  DocumentRegular,
  CheckmarkRegular,
} from '@fluentui/react-icons';
import { colors } from '../../styles/colors';

const FILE_UPLOAD_ICON_MAP: Record<string, React.ComponentType<{ className?: string; 'aria-hidden'?: boolean | 'true' | 'false'; focusable?: boolean | string }>> = {
  AlertSolid: ErrorCircleRegular,
  Calendar: CalendarRegular,
  Cancel: DismissRegular,
  ChromeClose: DismissRegular,
  ChevronDownMed: ChevronDownRegular,
  ChevronLeft: ChevronLeftRegular,
  ChevronRight: ChevronRightRegular,
  Copy: CopyRegular,
  Filter: FilterRegular,
  SortUp: ArrowSortUpRegular,
  SortDown: ArrowSortDownRegular,
  FavoriteStarFill: StarFilled,
  PDF: DocumentPdfRegular,
  WordDocument: DocumentTextRegular,
  PowerPointDocument: SlideLayoutRegular,
  ExcelDocument: DocumentTableRegular,
  TextDocument: DocumentTextRegular,
  Photo2: ImageRegular,
  Document: DocumentRegular,
  CheckMark: CheckmarkRegular,
};
import styles from './FileUpload.module.scss';

import Button from '../Button';

import addIcon from '../../../../assets/images/add-icon.svg';
import paperClipIcon from '../../../../assets/images/paper-clip.svg';

export interface FileUploadProps
  extends React.HTMLAttributes<HTMLButtonElement> {
  /** The file types that the server accepts (e.g., 'image/*', '.pdf'). */
  accept?: string;
  /** Whether the file upload has attachments. */
  hasAttachments?: boolean;
  /** Whether the user can select multiple files. */
  multiple?: boolean;
  /** The icon to display inside the button. */
  icon?: string | React.ReactNode;
  /** The color of the icon. */
  iconColor?: string;
  /** The color of the icon on hover. */
  iconColorHover?: string;
  /** The size of the icon in pixels. */
  iconSize?: number;
  /** The text to display inside the button. */
  buttonText?: string | React.ReactNode;
  /** The accessible label for the button. */
  ariaLabel?: string;
  /** Callback function that is called when a file is selected. */
  onFileSelect: (file: File | FileList, error?: string) => void;
  /** The file to upload. */
  value?: any;
  /** Optional additional class names for the button. */
  classNames?: string;
  /** Whether the button is disabled. */
  disabled?: boolean;
  /** Variant of the FileUpload component. */
  variant?: 'default' | 'button';
  /** Indicates whether the FileUpload should be large or not.
   * Used when variant is set to 'button' increase defaut button padding.
   */
  isLarge?: boolean;
  /** Whether to show the tooltip when clicking the button. */
  triggerOnTooltipClick?: boolean;
}

const FileUpload = (props: FileUploadProps): React.ReactElement => {
  const {
    hasAttachments = false,
    classNames,
    disabled,
    accept,
    multiple = true,
    icon,
    iconColor = colors.gray6,
    iconColorHover = colors.mweGreen,
    iconSize = 23,
    buttonText,
    ariaLabel,
    onFileSelect,
    value,
    variant = 'default',
    isLarge = false,
    triggerOnTooltipClick = false,
    ...others
  } = props;

  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const tooltipRef = React.useRef<HTMLDivElement>(null);

  const hasImageAttachments = accept?.match(/png|jpe?g|gif|bmp|webp/g);
  const hasFileAttachments = accept?.match(/pdf|docx|xlsx|pptx|txt/g);

  const [showTooltip, setShowTooltip] = React.useState(false);

  const setTooltipButtonLabel = (): string => {
    if (hasImageAttachments && !hasFileAttachments) {
      return 'Add images';
    } else if (hasFileAttachments && !hasImageAttachments) {
      return 'Add files';
    } else {
      return 'Add images & files';  
    }
  };

  const tooltipButtonLabel = setTooltipButtonLabel();

  const handleButtonClick = (): void => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const acceptTypes = accept?.split(',');

    if (acceptTypes && event.target.files) {
      for (let i = 0; i < event.target.files.length; i++) {
        const file = event.target.files[i];
        const fileExtension = file.name.split('.').pop();
        if (!acceptTypes.includes(`.${fileExtension}`)) {
          onFileSelect(
            file,
            `Invalid file type. Accepted types are ${acceptTypes.join(', ')}.`
          );
          return;
        }
      }
    }

    if (event.target.files && event.target.files.length > 0) {
      const files = event.target.files;
      onFileSelect(multiple ? files : files[0]);
    }
  };

  const toggleTooltip = () => {
    setShowTooltip(!showTooltip);
  };

  React.useEffect(() => {
    if (
      (fileInputRef.current && !value) ||
      (fileInputRef.current && !hasAttachments)
    ) {
      fileInputRef.current.value = '';
    }
  }, [value, fileInputRef, hasAttachments]);

  React.useEffect(() => {
    const closeTooltipOnOutsideClick = (event: MouseEvent) => {
      const isInside = tooltipRef.current?.contains(event.target as Node);

      if (!isInside) {
          setShowTooltip(false);
      }
    };

    document.addEventListener("mousedown", closeTooltipOnOutsideClick);

    return () => {
        document.removeEventListener("mousedown", closeTooltipOnOutsideClick);
    };
  }, [tooltipRef]);

  return (
    <React.Fragment>
      <button
        style={
          {
            '--iconColor': iconColor,
            '--iconColorHover': iconColorHover,
            '--iconSize': `${iconSize}px`,
          } as React.CSSProperties
        }
        className={classnames(styles.fileUploadButton, classNames, {
          [styles.disableControl]: disabled,
          [styles.isButton]: variant === 'button',
          [styles.isLarge]: isLarge,
          [styles.isDefaultButton]: !icon,
          [styles.hasText]: !!buttonText,
        })}
        type="button"
        onClick={triggerOnTooltipClick ? toggleTooltip : handleButtonClick}
        aria-label={!buttonText ? ariaLabel : undefined}
        {...others}
      >
        {showTooltip && (
          <div ref={tooltipRef} className={styles.fileUploadButtonTooltip}>
            <Button 
              icon={<img src={paperClipIcon} alt="paper clip icon" height="20" />}
              text={tooltipButtonLabel} 
              variant="transparent"
              onClick={handleButtonClick}
            />
          </div>
        )}
        {icon ? (
          <>
            {typeof icon === 'string' ? (() => {
              const IconComp = FILE_UPLOAD_ICON_MAP[icon];
              return IconComp ? (
                <IconComp
                  className={classnames(styles.fileUploadIcon, {
                    [styles.isDisabled]: disabled,
                  })}
                  aria-hidden="true"
                  focusable={false}
                />
              ) : null;
            })() : (
              icon
            )}
          </>
        ) : <img className={styles.defaultFileUploadIcon} src={addIcon} alt="Add" />}
        <span>{buttonText}</span>
      </button>
      <input
        ref={fileInputRef}
        className={styles.fileUploadInput}
        type="file"
        accept={accept}
        multiple={multiple}
        onChange={handleFileChange}
        disabled={disabled}
      />
    </React.Fragment>
  );
};

export default FileUpload;
