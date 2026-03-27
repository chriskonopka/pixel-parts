// src/libraries/PixelPartsLibrary/PixelPartsLibraryLibrary.ts

// 1) global reset & variables
import './styles/base.scss';

// 2) public API: re-export each component
export { default as AccessWarning  } from './components/AccessWarning';
export { default as Accordion      } from './components/Accordion';
export { default as AccordionPanel } from './components/AccordionPanel';
export { default as Attachment } from './components/Attachment';
export { default as Button         } from './components/Button';
export { default as ButtonGroup    } from './components/ButtonGroup';
export { default as Card           } from './components/Card';
export {
    ChatDialog,
    ChatInstructions,
    ChatPreview,
    ActionButton,
    ChatResponse,
    ChatResponseLoader,
    SuggestedPrompts,
    ClearChat,
    UploadedFilesList,
    CitationSettings,
    DownloadDocuments,
    MyProfileSettings,
    PromptConfigPopup,
    PromptConfigPopupProvider
} from './components/ChatWindow';
export { default as Checkbox       } from './components/Checkbox';
export { default as CopyButton     } from './components/CopyButton';
export { default as DefinitionList } from './components/DefinitionList';
export { default as DocumentIcon   } from './components/DocumentIcon';
export { default as Drawer         } from './components/Drawer';
export { default as useDrawer      } from './components/Drawer/useDrawer';
export { default as DrawerPanel    } from './components/DrawerPanel';
export { default as Dropdown       } from './components/Dropdown';
export { default as Favorite       } from './components/Favorite';
export { default as FeedbackModal  } from './components/FeedbackModal';
export { default as FileIcon       } from './components/FileIcon';
export { default as FlexBox        } from './components/FlexBox';
export { default as FlexBoxItem    } from './components/FlexBoxItem';
export { default as Grid           } from './components/Grid';
export { default as GridItem       } from './components/GridItem';
export { default as Heading        } from './components/Heading';
export { default as PageBanner     } from './components/PageBanner';
export { default as Popup, PopupHandle } from './components/Popup';
export { default as PageBannerTitle} from './components/PageBannerTitle';
export { default as PDFViewer      } from './components/PDFViewer';
export { configurePdfJsWorker      } from './components/PDFViewer/pdfWorker';
export { default as Pill           } from './components/Pill';
export { default as SearchBox, setAttachment, SearchBoxHandle } from './components/SearchBox';
export { default as ShimmerPanel   } from './components/ShimmerPanel';
export { default as TextElement    } from './components/TextElement';
export { default as Image          } from './components/Image';
export { default as Video          } from './components/Video';
export { default as MaiComparisonModal } from './components/MaiComparisonModal';
export { default as Modal          } from './components/Modal';
export { default as FileUpload     } from './components/FileUpload';
export { default as ResponsiveTable} from './components/ResponsiveTable';
export { default as Toast          } from './components/Toast';
export { default as SliderSwitch   } from './components/SliderSwitch';
export { default as Switch         } from './components/Switch';