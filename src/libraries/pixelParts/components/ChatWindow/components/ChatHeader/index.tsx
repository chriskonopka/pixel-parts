import * as React from "react";
import classnames from 'classnames';

import ActionButton, { ActionButtonProps } from "../ActionButton";
import GuardrailsPopup from '../GuardrailsPopup';

import Drawer from '../../../Drawer';
import useDrawer from '../../../Drawer/useDrawer';

import closeIcon from '../../../../../../assets/images/close-icon.svg';

import styles from "./ChatHeader.module.scss";

export interface ChatHeaderProps {
    title?: string | React.ReactNode;
    actionButtons?: React.ReactElement[];
    onClose?: () => void;
    isDark?: boolean;
    drawerOpen?: boolean;
    actionButtonType?: 'toggle' | 'open';
    hasGuardrails?: boolean;
}

const ChatHeader = (props: ChatHeaderProps) => {
    const { 
        title,
        actionButtons,
        onClose,
        isDark = false,
        drawerOpen = false,
        actionButtonType = 'open',
        hasGuardrails = false,
    } = props;

    const headerRef = React.useRef<HTMLDivElement>(null);
    const panelRef = React.useRef<HTMLDivElement>(null);

    const { 
        isOpen, 
        activeDrawer,
        setActiveDrawer,
        toggleDrawer,
        openDrawer, 
        closeDrawer
    } = useDrawer([headerRef, panelRef]);
    
    const handleButtonClick = (child: React.ReactElement<any>, index: number) => {
        child.props.onClick?.();
        if (child.props.drawerPanel) {
            if (actionButtonType === 'toggle') {
                toggleDrawer();
            } else {
                openDrawer();
            }
            setActiveDrawer(index);
        } else {
            closeDrawer();
            setActiveDrawer(undefined);
        }
    };

    const drawer = React.Children
        .toArray(actionButtons)
        .filter((_, index) => index === activeDrawer)
        .map((child: any) => {
            return React.cloneElement(child.props.drawerPanel, {
                ...((child as React.ReactElement<any>).props),
                onClose: closeDrawer,
            });
        });

    const buttons = React.Children
        .map(actionButtons, (child, index) => {
            if (!React.isValidElement<ActionButtonProps>(child)) return null;
            return React.cloneElement(child, {
                ...((child as React.ReactElement<any>).props),
                onClick: () => handleButtonClick(child, index),
                isActive: index === activeDrawer,
                isDark,
                key: child.key ?? index,
            });
        });

    React.useEffect(() => {
        if (!isOpen) {
            setActiveDrawer(undefined);
        }
    }, [isOpen]);

    React.useEffect(() => {
        if (!drawerOpen) {
            closeDrawer();
            setActiveDrawer(undefined);
        }
    }, [drawerOpen]);

    return (
        <>
            <header ref={headerRef} className={classnames(styles.header, {
                [styles.isDark]: isDark,
                [styles.hasActiveDrawer]: activeDrawer !== undefined,
                [styles.alignRight]: !title && !hasGuardrails,
            })}>
                {title && (
                    <div className={classnames(styles.title, {
                        [styles.isFullWidth]: hasGuardrails,
                    })}>
                        {title}
                    </div>
                )}
                {hasGuardrails && (
                    <GuardrailsPopup title="McDermott Guardrails Applied">
                        This assistant is using McDermott Guardrails, providing compliance-focused oversight for every response.
                    </GuardrailsPopup>
                )}
                <div className={styles.actionButtons}>
                    {buttons}
                </div>
                {onClose && (
                    <ActionButton
                        buttonIconSrc={closeIcon}
                        onClick={onClose}
                        isDark={isDark}
                    />
                )}
            </header>
            {drawer && (
                <Drawer 
                    panelRef={panelRef} 
                    isOpen={isOpen} 
                    topOffset="65px"
                    panelMaxHeight="80%"
                >
                    {drawer}
                </Drawer>
            )}
        </>
    );
};

export default ChatHeader;