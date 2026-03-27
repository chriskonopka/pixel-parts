import * as React from 'react';

import styles from './Popup.module.scss';

export interface PopupProps {
    /**
     * Title text for the popup dialog.
     */
    title?: string;
    /**
     * Optional icon to display next to the title.
     */
    icon?: string;
    /**
     * Child elements to render inside the popup dialog.
     */
    children: React.ReactNode;
    /**
     * Element that triggers the popup dialog.
     */
    triggerElement?: React.ReactNode;
    /**
     * Determines the positioning context of the popup. If 'false', the popup will be positioned based on the next relatively positioned ancestor.
     * @default true
    */
    isRelativeToTrigger?: boolean;
    /**
     * CSS inset property value to position the popup.
     */
    inset?: string;
    /** 
     * Width of the popup in pixels.
     */
    width?: string;
}

// Methods exposed to parent via ref.
export interface PopupHandle {
    setShowPopup: (value: boolean) => void;
    togglePopup: () => void;
}

const Popup = ({
    ref,
    title,
    icon,
    children,
    triggerElement,
    isRelativeToTrigger = true,
    inset,
    width
}: PopupProps & { ref?: React.Ref<PopupHandle> }) => {

    const [showPopup, setShowPopup] = React.useState(false);

    const popupRef = React.useRef<HTMLDivElement>(null);
    const triggerButtonRef = React.useRef<HTMLElement>(null);

    const showPopupDialog = (triggerElement && showPopup) || !triggerElement;

    const handleTriggerClick = () => {
        (triggerElement as React.ReactElement<any>).props.onClick?.();
        setShowPopup(prev => !prev);
    };

    React.useImperativeHandle(ref, () => ({
        setShowPopup,
        togglePopup: () => {
            setShowPopup(prev => !prev);
        }
    }), [showPopup]);

    React.useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as Node;
            if (
                popupRef.current &&
                !popupRef.current.contains(target) &&
                triggerButtonRef.current &&
                !triggerButtonRef.current.contains(target)
            ) {
                setShowPopup(false);
            }
        };

        if (showPopup) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [showPopup]);
    
    return (
        <div 
            className={styles.popupContainer} 
            style={{
                '--position': isRelativeToTrigger ? 'relative' : 'static',
                '--inset': inset,
                '--width': width ?? undefined,
            } as React.CSSProperties}
        >
            {showPopupDialog && (
                <div ref={popupRef} id="popup" className={styles.popup}>
                    <div className={styles.popupHeader}>
                        {icon && (
                            <div className={styles.popupIcon}>
                                <img src={icon} alt={`${title} icon`} width="18" />
                            </div>
                        )}
                        {title && (
                            <div className={styles.popupTitle}>
                                {title}
                            </div>
                        )}
                    </div>
                    <div className={styles.popupBody}>
                        {children}
                    </div>
                </div>
            )}
            <span ref={triggerButtonRef}>
                {React.isValidElement(triggerElement) && React.cloneElement(triggerElement as React.ReactElement<any>, {
                    'aria-haspopup': 'dialog',
                    'aria-controls': 'popup',
                    'aria-expanded': showPopup,
                    onClick: handleTriggerClick
                })}
            </span>
        </div>
    );
};

export default Popup;