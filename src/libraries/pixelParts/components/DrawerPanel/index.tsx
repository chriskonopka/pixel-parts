import * as React from 'react';
import classnames from 'classnames';
import { DismissRegular } from '@fluentui/react-icons';

import Button from '../Button';
import FlexBox from '../FlexBox';
import FlexBoxItem from '../FlexBoxItem';

import styles from './DrawerPanel.module.scss';

export interface DrawerPanelProps {
    /**
     * Child elements to render inside the panel.
     * @default <></>
     */
    children: React.ReactNode;
    /**
     * Callback fired when the drawer panel is requested to close.
     */
    onClose?: () => void;
    /**
     * Optional title for the drawer panel.
     */
    title?: string | React.ReactNode;
    /**
     * Optional description for the drawer panel.
     */
    description?: string | React.ReactNode;
    /**
     * If true, applies a shadow to the drawer panel.
     * @default true
     */
    hasShadow?: boolean;
    /**
     * If true, allows overflow content to be visible.
     */
    hasOverflow?: boolean;
}

const DrawerPanel = (props: DrawerPanelProps): React.ReactElement => {
    const { 
        children,  
        title, 
        description, 
        onClose,
        hasShadow = true,
        hasOverflow = false
    } = props;

    return (
        <div className={classnames(styles.drawerPanel, {
            [styles.hasShadow]: hasShadow,
            [styles.hasOverflow]: hasOverflow
        })}>
            <div className={styles.drawerPanelContent}>
                <FlexBox spacing={20} className={styles.drawerPanelHeader}>
                    <FlexBoxItem flexGrow={1}>
                        <h3 className={styles.drawerPanelTitle}>{title}</h3>
                        <p className={styles.drawerPanelDescription}>{description}</p>
                    </FlexBoxItem>
                    <FlexBoxItem>
                        <Button 
                            className={styles.drawerPanelCloseButton}
                            icon={<DismissRegular aria-hidden="true" focusable={false} />}
                            onClick={onClose} 
                            variant="transparent"
                            aria-label="Close Panel"
                        />
                    </FlexBoxItem>
                </FlexBox>
                {children}
            </div>
        </div>
    );
}

export default DrawerPanel;