import * as React from 'react';
import classnames from 'classnames';
import {
  SearchRegular,
  DismissRegular,
  RecordStopRegular,
  ArrowUpRegular,
  ErrorCircleRegular,
  CalendarRegular,
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

export interface IIconProps {
  iconName?: string;
  imageProps?: React.ImgHTMLAttributes<HTMLImageElement>;
}

const SEARCH_BOX_ICON_MAP: Record<string, React.ComponentType<{ className?: string; style?: React.CSSProperties; 'aria-hidden'?: boolean | 'true' | 'false'; focusable?: boolean | string }>> = {
  Search: SearchRegular,
  ChromeClose: DismissRegular,
  StopSolid: RecordStopRegular,
  Up: ArrowUpRegular,
  AlertSolid: ErrorCircleRegular,
  Calendar: CalendarRegular,
  Cancel: DismissRegular,
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

import FileUpload from '../FileUpload';
import Attachment from '../Attachment';

import styles from './SearchBox.module.scss';

import TextareaAutosizeOriginal, { TextareaAutosizeProps } from 'react-textarea-autosize';
const TextareaAutosize = TextareaAutosizeOriginal as unknown as React.ComponentType<
  TextareaAutosizeProps & React.RefAttributes<HTMLTextAreaElement>
>;

export interface SearchBoxProps {
  attachments?: File | FileList;
  /**
   * The file formats to accept.
   */
  documentFormats?: string;
  /**
   * The image formats to accept.
   */
  imageFormats?: string;
  /**
   * Whether to allow multiple files.
   */
  allowMultipleFiles?: boolean;
  /**
   * The current value of the search box.
   */
  value?: string;

  /**
   * The aria label for the search box.
   */
  ariaLabel?: string;

  /**
   * The placeholder text for the search box.
   */
  placeholder?: string;

  /**
   * The function to call when a search is performed.
   */
  onSearch: (value: string) => void;

  /**
   * The autoComplete attribute for the search box.
   */
  autoComplete?: string;

  /**
   * The icon properties for the search box.
   */
  iconProps?: IIconProps;

  /**
   * The function to call when the search box gains focus.
   */
  onFocus?: () => void;

  /**
   * The function to call when the search box loses focus.
   */
  onBlur?: () => void;

  /**
   * The function to call when the search box value changes.
   */
  onChange: (newVal: string) => void;

  /**
   * The function to call when the search box is cleared.
   */
  onClear?: () => void;

  /**
   * Whether to show the search icon.
   */
  showIcon?: boolean;

  /**
   * Whether to render the search box focused.
   */
  renderFocused?: boolean;

  /**
   * Whether to render the file attachment button.
   */
  hasFileAttachment?: boolean;

  /**
   * Whether to render the image attachment button.
   */
  hasImageAttachment?: boolean;

  /**
   * Whether to disable the file attachment button.
   */
  disableAttachments?: boolean;

  /**
   * The current loading state of the search box.
   */
  isLoading?: boolean;

  /**
   * Callback function to call when the cancel button is clicked.
   * @returns () => {}
   */
  onCancel?: () => void;

  /**
   * The function to call when a file is selected.
   */
  onFileSelect?: (file: File | FileList, isSameFileType?: boolean) => void;

  /**
   * The function to call when a file is removed.
   */
  onFileRemove?: (index: number) => void;

  /**
   * The style type for the search box.
   */
  styleType?: 'dark' | 'main';

  /**
   * Whether the search box is multiline.
   */
  isMultiline?: boolean;

  /**
   * Additional props to pass to the search box.
   */
  disabled?: boolean;
  /**
   * Whether the search box has a shadow.
   */
  hasShadow?: boolean;

  /**
   * Weather to show the search button.
   */
  showSearchButton?: boolean;

  /**
   * Action buttons to render next to the file upload.
   */
  actionButtons?: React.ReactNode | React.ReactNode[];
}

export interface Attachment { 
  id: string;
  fileName: string; 
  iconName: string; 
  type: string; 
  previewUrl?: string;
}

export const setAttachment = (fileName: string, id: string = '', previewUrl?: string): Attachment => {
  const fileExtension = fileName.split('.').pop();
  switch (fileExtension) {
    case 'pdf': 
      return { 
        id,
        iconName: 'PDF', 
        type: 'PDF', 
        fileName 
      };
    case 'doc': case 'docx': 
      return { 
        id,
        iconName: 'WordDocument', 
        type: 'DOCX', 
        fileName 
      };
    case 'xls': case 'xlsx': 
      return { 
        id,
        iconName: 'ExcelDocument', 
        type: 'XLSX', 
        fileName 
      };
    case 'png': case 'jpg': case 'jpeg': case 'gif': case 'webp': 
      return { 
        id,
        iconName: 'Photo2', 
        type: 'Image', 
        fileName,
        previewUrl
      };
    case 'pptx': 
      return { 
        id,
        iconName: 'PowerPointDocument', 
        type: 'PPTX', 
        fileName 
      };
    default: 
      return { 
        id,
        iconName: 'TextDocument', 
        type: 'TXT', 
        fileName 
      };
  }
};

type UploadStatus = 'queued' | 'uploading' | 'done' | 'error';

interface InlineChip {
  id: string;
  name: string;
  size?: number;
  url: string;
  progress: number;
  status: UploadStatus;
}

type ChipWithKey = InlineChip & { _key: string };
type AttachmentWithKey = Attachment & { _key?: string };

const uid = (() => { let i = 0; return () => `${Date.now().toString(36)}_${i++}`; })();
const fileKey = (f: File) => `${f.name}::${f.size ?? 0}::${(f as any).lastModified ?? 0}`;
const looksLikeImage = (f: File) =>
  ((f.type && f.type.startsWith('image/')) || /\.(png|jpe?g|gif|webp)$/i.test(f.name || '') || (!f.type && f.size > 0));

const parseAcceptToSet = (accept?: string) => {
  const set = new Set<string>();
  if (!accept) return set;
  accept
    .split(',')
    .map(s => s.trim().toLowerCase())
    .filter(Boolean)
    .forEach(tok => {
      // Only keep dot-ext tokens like ".pdf" (skip wildcards like image/* for parity with FileUpload)
      if (tok.startsWith('.')) set.add(tok);
    });
  return set;
};

const getExt = (file: File) => {
  const name = (file?.name || '').toLowerCase();
  const lastDot = name.lastIndexOf('.');
  return lastDot >= 0 ? name.slice(lastDot) : ''; // includes dot e.g. ".pdf"
};

const validateAgainstAccept = (
  files: File[],
  documentFormats?: string,
  imageFormats?: string
) => {
  const docSet = parseAcceptToSet(documentFormats);
  const imgSet = parseAcceptToSet(imageFormats);
  // combined set (if empty, accept all)
  const combined = new Set<string>([...docSet, ...imgSet]);

  if (combined.size === 0) {
    return { valid: files, invalid: [] as File[], errorMsg: '' };
  }

  const valid: File[] = [];
  const invalid: File[] = [];
  for (const f of files) {
    const ext = getExt(f);
    if (combined.has(ext)) valid.push(f);
    else invalid.push(f);
  }

  // Build error message mirroring FileUpload ("Accepted types are ...")
  const acceptedList = [...combined].join(', ');
  const errorMsg = invalid.length
    ? `Invalid file type. Accepted types are ${acceptedList}.`
    : '';

  return { valid, invalid, errorMsg };
};

// ---------- SIZE VALIDATION HELPERS ----------
const MB = 1024 * 1024;
const MAX_FILE_BYTES = 25 * MB;
const MAX_TOTAL_BYTES = 25 * MB;

const bytesOf = (f: File | { size?: number }) => Number.isFinite((f as any).size) ? (f as any).size as number : 0;
const sumSizes = (list: Array<{ size?: number }>) => list.reduce((acc, f) => acc + bytesOf(f), 0);

// ---------- Tiny imperative API so client code can feed files + focus ----------
export type SearchBoxHandle = {
  attachFiles: (files: File[] | FileList) => void;
  focusInput: () => void;
};

const SearchBox = ({
  ref,
  documentFormats = '.pdf,.docx,.txt',
  imageFormats = '.jpg,.jpeg,.png,.gif',
  allowMultipleFiles = true,
  value = '',
  ariaLabel = 'Search',
  placeholder = '',
  onSearch,
  autoComplete = 'on',
  iconProps = { iconName: 'Search' },
  onFileSelect = () => {},
  onFileRemove = () => {},
  onFocus = () => {},
  onBlur = () => {},
  onCancel = () => {},
  onChange,
  onClear,
  renderFocused = false,
  hasFileAttachment = false,
  hasImageAttachment = false,
  disableAttachments = false,
  attachments,
  showIcon = true,
  styleType = 'main',
  isMultiline = false,
  hasShadow = false,
  disabled = false,
  showSearchButton = true,
  isLoading = false,
  actionButtons,
  ...others
}: SearchBoxProps & { ref?: React.Ref<SearchBoxHandle> }) => {
  const searchBoxRef = React.useRef<any | null>(null);

  const [isButtonDisabled, setIsButtonDisabled] = React.useState(true);
  const [isfocused, setIsFocused] = React.useState(false);
  const [fileAttachments, setFileAttachments] = React.useState<AttachmentWithKey[]>([]);
  const [fileAttactmentType, setFileAttactmentType] = React.useState<'document' | 'image'>('document');
  const [error, setError] = React.useState<string>();

  // Inline ChatGPT-style chips inside the input (with keys)
  const [chips, setChips] = React.useState<ChipWithKey[]>([]);
  const pendingKeysRef = React.useRef<Set<string>>(new Set());

  const acceptedAttachments = [
    ...(hasFileAttachment ? documentFormats.split(',').map(item => item.trim()) : []),
    ...(hasImageAttachment ? imageFormats.split(',').map(item => item.trim()) : []),
  ].join(',');

  const showFileAttachments = hasFileAttachment || hasImageAttachment;
  const allowDnD = showFileAttachments; // if attachments are hidden, DnD is disabled

  // --- Upload progress simulation ---
  const startUpload = React.useCallback((ids: string[]) => {
    ids.forEach((id) => {
      setChips((prev) => prev.map((c) => (c.id === id ? { ...c, status: 'uploading', progress: 0 } : c)));
      const interval = setInterval(() => {
        let done = false;
        setChips((prev) => prev.map((c) => {
          if (c.id !== id) return c;
          if (c.progress >= 100) { done = true; return c; }
          const next = Math.min(100, c.progress + 12 + Math.random() * 15);
          return { ...c, progress: next, status: next >= 100 ? 'done' : 'uploading' };
        }));
        if (done) clearInterval(interval);
      }, 220);
    });
  }, []);

  // ---------- single ingestion path for chips ----------
  const ingestFilesIntoUI = React.useCallback((
    arr: File[],
    opts?: { suppressOnFileSelect?: boolean }
  ) => {
    if (!arr.length) return;
    const { suppressOnFileSelect = false } = opts ?? {};

    // Build chips (dedupe against current + pending)
    setChips((prev) => {
      const existing = new Set(prev.map((p) => `${p.name}_${p.size || 0}`));
      const filtered = arr.filter((f) => {
        const k = `${f.name}_${f.size}`;
        if (existing.has(k)) return false;
        if (pendingKeysRef.current.has(k)) return false;
        return true;
      });
      if (!filtered.length) return prev;

      filtered.forEach((f) => pendingKeysRef.current.add(`${f.name}_${f.size}`));

      const imgPromises = filtered
        .filter(looksLikeImage)
        .map((f) => new Promise<ChipWithKey>((resolve) => {
          const r = new FileReader();
          r.onload = () => resolve({ id: uid(), _key: fileKey(f), name: f.name || 'image', size: f.size, url: String(r.result || ''), progress: 0, status: 'queued' });
          r.onerror = () => resolve({ id: uid(), _key: fileKey(f), name: f.name || 'image', size: f.size, url: '', progress: 0, status: 'error' });
          try { r.readAsDataURL(f); } catch { resolve({ id: uid(), _key: fileKey(f), name: f.name || 'image', size: f.size, url: '', progress: 0, status: 'error' }); }
        }));

      const docEntries: ChipWithKey[] = filtered
        .filter((f) => !looksLikeImage(f))
        .map((f) => ({ id: uid(), _key: fileKey(f), name: f.name || 'attachment', size: f.size, url: '', isImage: false, progress: 0, status: 'queued' }));

      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      Promise.all(imgPromises).then((newImgs) => {
        const combined = [...docEntries, ...newImgs];
        if (combined.length) {
          setChips((prev2) => [...prev2, ...combined]);
          startUpload(combined.map((c) => c.id));
        }
        filtered.forEach((f) => pendingKeysRef.current.delete(`${f.name}_${f.size}`));
      });

      // Mirror legacy list (with keys) to keep both UIs in sync
      setFileAttachments((prevLegacy) => ([
        ...prevLegacy,
        ...arr.map((f) => ({ ...setAttachment(f.name), _key: fileKey(f) }))
      ]));

      // Optionally notify host (avoid double-calling from handleFileSelect)
      if (!suppressOnFileSelect) {
        if (allowMultipleFiles) (onFileSelect as any)(arr);
        else if (arr[0]) onFileSelect(arr[0]);
      }

      return prev;
    });
  }, [allowMultipleFiles, onFileSelect, startUpload]);

  // --- Public pathway for paste/DnD/etc. with ACCEPT + SIZE VALIDATION ---
  const addFiles = React.useCallback((incoming: File[] | FileList) => {
    const arr = incoming instanceof FileList ? Array.from(incoming) : incoming;
    if (!arr.length) return;

    // ACCEPT VALIDATION (copy/paste & inline DnD)
    const { valid, invalid, errorMsg } = validateAgainstAccept(arr, documentFormats, imageFormats);
    if (invalid.length) {
      setError(errorMsg);
      return; // block unsupported types entirely (no chips, no callback)
    }

    // SIZE VALIDATION
    // per-file
    const tooBig = valid.find(f => bytesOf(f) > MAX_FILE_BYTES);
    if (tooBig) {
      setError('File too large (max 25MB)');
      return;
    }
    // total (existing chips + incoming)
    const existingTotal = sumSizes(chips);
    const incomingTotal = sumSizes(valid);
    if (existingTotal + incomingTotal > MAX_TOTAL_BYTES) {
      setError('Total size too large (max 25MB)');
      return;
    }

    setError(undefined);
    ingestFilesIntoUI(valid, { suppressOnFileSelect: false });
  }, [documentFormats, imageFormats, chips, ingestFilesIntoUI]);

  // ---------- expose imperative handle ----------
  React.useImperativeHandle(ref, () => ({
    attachFiles: (files: File[] | FileList) => addFiles(files),
    focusInput: () => (searchBoxRef.current as HTMLTextAreaElement | HTMLInputElement | null)?.focus?.(),
  }), [addFiles]);

  // --- Paste: ACCEPT VALIDATION is preserved; addFiles performs size validation ---
  const handlePasteIntoInline = (e: React.ClipboardEvent) => {
    const cd = e.clipboardData; if (!cd) return;
    const items = cd.items as DataTransferItemList | undefined; const picked: File[] = [];
    if (items && items.length) {
      for (const it of Array.from(items)) {
        if (it.kind === 'file') {
          const f = it.getAsFile();
          if (f) picked.push(f);
        }
      }
    }
    if (picked.length > 0) {
      // If attachments are not shown, block file paste (but allow normal text paste)
      if (!showFileAttachments) {
        e.preventDefault();
        return;
      }

      e.preventDefault();
      // accept validation
      const { valid, invalid, errorMsg } = validateAgainstAccept(picked, documentFormats, imageFormats);
      if (invalid.length) {
        setError(errorMsg);
        return;
      }
      setError(undefined);
      addFiles(valid); // size validation happens inside addFiles
    }
  };

  // --- DnD for inline chips (inside box only; page-level is client’s job) with ACCEPT VALIDATION ---
  const onDropInline = (e: React.DragEvent) => {
    e.preventDefault(); 
    e.stopPropagation();

    if (!allowDnD) {
      return;
    }

    if (e.dataTransfer.files?.length) {
      const files = Array.from(e.dataTransfer.files);
      const { valid, invalid, errorMsg } = validateAgainstAccept(files, documentFormats, imageFormats);
      if (invalid.length) {
        setError(errorMsg);
        return;
      }
      setError(undefined);
      addFiles(valid); // size validation happens inside addFiles
    }
  };
  const onDragOverInline = (e: React.DragEvent) => { 
    if (!allowDnD) {
      return;
    }
    e.preventDefault(); 
  };

  // --- Original handler (from <FileUpload/>) shows chips but now includes SIZE VALIDATION as well ---
  const handleFileSelect = (filesObject: File | FileList, fileUploadErrorMsg?: string): void => {
    setError(undefined);
    if (fileUploadErrorMsg) { setError(fileUploadErrorMsg); return; } // honor FileUpload's error

    if (filesObject instanceof FileList) {
      const arr = Array.from(filesObject);
      if (!arr.length) return;

      // SIZE VALIDATION for browse uploads too
      const tooBig = arr.find(f => bytesOf(f) > MAX_FILE_BYTES);
      if (tooBig) { setError('File too large (max 25MB)'); return; }
      const existingTotal = sumSizes(chips);
      const incomingTotal = sumSizes(arr);
      if (existingTotal + incomingTotal > MAX_TOTAL_BYTES) { setError('Total size too large (max 25MB)'); return; }

      const firstExt = arr[0].name.split('.').pop();
      const detectedType = documentFormats.includes(firstExt as string) ? 'document' : 'image';
      setFileAttactmentType(detectedType);

      // Chips + legacy list + progress, but avoid double-calling onFileSelect
      ingestFilesIntoUI(arr, { suppressOnFileSelect: true });

      // Preserve external callback semantics exactly once here
      onFileSelect(filesObject, detectedType === fileAttactmentType);
    } else {
      const f = filesObject as File;

      // SIZE VALIDATION (single file)
      if (bytesOf(f) > MAX_FILE_BYTES) { setError('File too large (max 25MB)'); return; }
      const existingTotal = sumSizes(chips);
      if (existingTotal + bytesOf(f) > MAX_TOTAL_BYTES) { setError('Total size too large (max 25MB)'); return; }

      // Chips + legacy list + progress, but avoid double-calling onFileSelect
      ingestFilesIntoUI([f], { suppressOnFileSelect: true });

      // Preserve external callback once here
      onFileSelect(f);
    }
  };

  // ------- Unified removal so chips and legacy list stay in sync -------
  const indexByKeyOrName = (key: string | undefined, name: string, list: AttachmentWithKey[]) => {
    if (key) {
      const byKey = list.findIndex(a => a._key === key);
      if (byKey >= 0) return byKey;
    }
    return list.findIndex(a => a.fileName === name);
  };

  const handleRemoveChip = (chipId: string) => {
    setChips(prev => {
      const chip = prev.find(c => c.id === chipId) as ChipWithKey | undefined;
      if (!chip) return prev;

      setFileAttachments(curr => {
        const idx = indexByKeyOrName(chip._key, chip.name, curr);
        if (idx >= 0) {
          onFileRemove(idx);
          return curr.filter((_, i) => i !== idx);
        }
        return curr;
      });

      return prev.filter(c => c.id !== chipId);
    });
  };

  // ------- Submit / input handlers -------
  const handleOnSubmit = (): void => {
    onSearch(value);
    setFileAttachments([]);
    setChips([]);
    setError(undefined);
    searchBoxRef.current?.blur();
  };

  const handleOnChange = (newVal: string): void => { onChange(newVal); };
  const handleFocus = (): void => { onFocus(); setIsFocused(true); };
  const handleBlur = (): void => { onBlur(); setIsFocused(false); };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); if (value) handleOnSubmit(); }
    if (!value && chips.length && e.key === 'Backspace') { handleRemoveChip(chips[chips.length - 1].id); }
  };

  const isDark = styleType === 'dark';
  const renderIcon = (): React.ReactElement | null => {
    if (iconProps.imageProps) return <img className={styles.searchIcon} {...iconProps.imageProps} />;
    const IconComp = iconProps.iconName ? SEARCH_BOX_ICON_MAP[iconProps.iconName] : undefined;
    return IconComp ? <IconComp className={styles.searchIcon} style={{ color: '#999' }} aria-hidden="true" focusable={false} /> : null;
  };

  const showSearchFooterSection = hasFileAttachment || hasImageAttachment || actionButtons;
  const showFileUpload = hasFileAttachment || hasImageAttachment;
  const cancelModeActive = isLoading && onCancel;

  const SubmitIconComp = cancelModeActive ? RecordStopRegular : ArrowUpRegular;
  const searchSubmitButton = (
    <button
      type="button"
      className={styles.searchButton}
      onClick={cancelModeActive ? onCancel : handleOnSubmit}
      disabled={(disabled || isButtonDisabled) && !cancelModeActive}
      style={{ backgroundColor: isButtonDisabled ? '#cecece' : '#00a68e', color: 'white', borderRadius: '50%', height: '30px', width: '30px' }}
      aria-label={cancelModeActive ? 'Cancel' : 'Submit'}
    >
      <SubmitIconComp aria-hidden="true" focusable={false} />
    </button>
  );

  React.useEffect(() => { 
    if (renderFocused && searchBoxRef.current) { 
      searchBoxRef.current.focus(); 
    } 
  }, [renderFocused]);
  
  React.useEffect(() => { 
    setIsButtonDisabled(!isLoading && !value.length && fileAttachments.length === 0 && chips.length === 0); 
  }, [value, fileAttachments, chips, isLoading]);

  // When attachments prop changes: keep original behavior (names only). Keys if possible.
  React.useEffect(() => {
    if (attachments instanceof FileList) {
      const files = Array.from(attachments).map((attachment) => ({ ...setAttachment(attachment.name), _key: fileKey(attachment) }));
      setFileAttachments(files);
    } else {
      setFileAttachments(attachments ? [{ ...setAttachment((attachments as File).name), _key: fileKey(attachments as File) }] : []);
    }
  }, [attachments]);

  return (
    <>
      <div
        className={classnames(styles.searchBoxContainer, { [styles.isFocused]: isfocused, [styles.isDark]: isDark, [styles.hasShadow]: hasShadow })}
        {...others}
      >
        <div
          className={classnames(styles.searchBoxContainerInner, { [styles.isMain]: styleType === 'main' })}
          onDrop={onDropInline}
          onDragOver={onDragOverInline}
        >
          {showIcon && renderIcon()}

          {/* Inline previews inside input container */}
          <div className={styles.previewAndInput}>
            {chips.length > 0 && (
              <div className={styles.previewContainer}>
                <div className={styles.preview}>
                  {chips.map((p) => {
                    const loading = p.status === 'uploading' || p.status === 'queued';
                    return (
                        <Attachment
                          key={p.id}
                          attachment={{
                            fileName: p.name,
                            type: p.name.split('.').pop() || 'FILE',
                            previewUrl: p.url
                          }}
                          onRemove={() => handleRemoveChip(p.id)}
                          isLoading={loading}
                        />
                      );
                  })}
                </div>
              </div>
            )}

            {isMultiline ? (
              <TextareaAutosize
                className={classnames(styles.searchBox, { [styles.isDisabled]: disabled })}
                placeholder={placeholder}
                ref={searchBoxRef}
                onChange={(e) => handleOnChange(e.target.value || '')}
                autoComplete={autoComplete}
                onFocus={handleFocus}
                onBlur={handleBlur}
                value={value}
                onKeyDown={handleKeyDown}
                disabled={disabled}
                minRows={1}
                maxRows={8}
                aria-label={ariaLabel}
                onPaste={handlePasteIntoInline}
              />
            ) : (
              <input
                className={classnames(styles.searchBox, { [styles.isDisabled]: disabled })}
                placeholder={placeholder}
                value={value}
                ref={searchBoxRef as any}
                onChange={(e) => handleOnChange(e.target.value || '')}
                autoComplete={autoComplete}
                onFocus={handleFocus}
                onBlur={handleBlur}
                onKeyDown={handleKeyDown}
                disabled={disabled}
                aria-label={ariaLabel}
                onPaste={handlePasteIntoInline as any}
              />
            )}
          </div>

          {onClear && (
            <button
              type="button"
              className={styles.clearButton}
              onClick={onClear}
              style={{ visibility: value ? 'visible' : 'hidden' }}
              aria-label="Clear"
            >
              <DismissRegular aria-hidden="true" focusable={false} />
            </button>
          )}
          {styleType === 'main' && showSearchButton && !showSearchFooterSection && searchSubmitButton}
        </div>

        {styleType === 'main' && showSearchButton && showSearchFooterSection && (
          <div className={styles.fileAttachments}>
            {showFileUpload && (
              <FileUpload
                hasAttachments={fileAttachments.length > 0}
                classNames={styles.fileUploadInput}
                accept={acceptedAttachments}
                multiple={allowMultipleFiles}
                onFileSelect={handleFileSelect}
                value={attachments}
                disabled={disabled || disableAttachments}
                {...(isDark && { iconColor: '#f5f5f5' })}
              />
            )}
            {actionButtons}
            {styleType === 'main' && showSearchButton && showSearchFooterSection && <div>{searchSubmitButton}</div>}
          </div>
        )}
      </div>
      {error && <div className={styles.errorMessage}>{error}</div>}
    </>
  );
};

export default SearchBox;
