import * as React from 'react';
import * as ReactDom from 'react-dom';
import classnames from 'classnames';
import styles from './Modal.module.scss';

export interface ModalProps {
    /**
     * Additional class names for the modal container
     */
    classNames?: string;
    /** 
     * Content to be rendered in the modal body 
     **/
    children: React.ReactNode;
    /** 
     * Title of the modal 
     **/
    title?: string;
    /** 
     * Footer content 
     **/
    footer?: React.ReactNode;
    /** 
     * Whether to set the modal height automatically based on content 
     * @default false
     **/
    autoHeight?: boolean
    /**
     * Whether to center the content 
     * @default false
     **/
    centerContent?: boolean;
    /**
     * Whether the modal is an alert
     * @default false
     **/
    isAlert?: boolean;
    /** 
     * Min width of the modal 
     * @default 33vw
     **/
    minWidth?: number | string;
    /** 
     * The root element to render the modal into. If not provided, the modal will be rendered in place.
     * @default HTMLElement
     **/
    portalRoot?: HTMLElement;
    /** 
     * Whether to left-align the title 
     * @default false
     * */
    leftAlignTitle?: boolean;
    /** 
     * Show an "X" close button in the header 
     * @default false
     * */
    showCloseButton?: boolean;
    /** 
     * Click handler for the close button 
     * @default () => { }
     * */
    onClose?: () => void;
    /** 
     * z-index for the modal 
     * @default 2
     * */
    zIndex?: number;
}

const Modal = (props: ModalProps): React.ReactElement => {
    const {  
        classNames,
        children, 
        title, 
        footer, 
        portalRoot,
        isAlert = false,
        autoHeight = false, 
        centerContent = false, 
        minWidth = '33vw',
        showCloseButton = false,
        leftAlignTitle = false,
        zIndex = 2,
        onClose,
     } = props;

    let modalMinWidth = minWidth;

    if (typeof minWidth === 'number') { 
        modalMinWidth = `${minWidth}px`;
    }

    const modal = (
        <div 
            style={{ '--minWidth': modalMinWidth, '--zIndex': zIndex } as React.CSSProperties}
            className={classnames(styles.modal, {
                [styles.isAlert]: isAlert
            })}
        >
            <div className={classnames(styles.modal__dialog, classNames, {
                [styles.autoHeight]: autoHeight,
                [styles.centerContent]: centerContent,
            })}>
                 {(title || showCloseButton) && (
                <div
                className={classnames(
                    styles.modal__header,
                    leftAlignTitle && styles['modal__header--left']
                )}
                >
                    {title && <span>{title}</span>}
                    {showCloseButton && (
                    <button
                        type="button"
                        aria-label="Close modal"
                        className={styles.modal__closeButton}
                        onClick={onClose}
                    >
                        <span className={styles.modal__closeIcon}>×</span>
                    </button>
                    )}
                </div>
                )}
                <div className={styles.modal__body}>
                    {children}
                </div>
                {footer && (
                    <div className={styles.modal__footer}>
                        {footer}
                    </div>
                )}
            </div>
        </div>
    );

    return portalRoot ? ReactDom.createPortal(modal, portalRoot) : modal;
};

export default Modal;