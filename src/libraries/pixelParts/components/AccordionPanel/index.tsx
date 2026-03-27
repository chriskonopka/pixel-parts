import * as React from "react";
import classnames from "classnames";
import { ChevronDownRegular } from '@fluentui/react-icons';
import FlexBox from '../FlexBox';
import FlexBoxItem from '../FlexBoxItem';
import styles from './AccordionPanel.module.scss';

export interface AccordionPanelProps extends React.HTMLProps<HTMLDivElement> {
    /** Content to be displayed inside the panel */
    children: React.ReactNode,
    /** Additional class names to apply to the panel for custom styling */
    classNames?: string,
    /** Determines if the panel is open by default */
    isOpen?: boolean,
    /** Title of the panel */
    title: string,
    /** Subtitle of the panel */
    subtitle?: string,
    /** Label text for the panel */
    labelText?: string,
    /** Determines if the panel trigger should be visible */
    showTrigger?: boolean
    /** Determines if the left label should be visible */
    showLeftLabel?: boolean
    /** The visual style variant of the accordion panel. */
    variant?: 'gray' | 'navy';
}

const AccordionPanel = (props: AccordionPanelProps): React.ReactElement => {
    const {
        children,
        classNames,
        isOpen = false,
        title,
        subtitle,
        labelText,
        showTrigger = true,
        showLeftLabel = true,
        variant = 'gray',
        ...others
    } = props;

    const [open, setOpen] = React.useState(isOpen);

    const randomStr = Math.random().toString(36).slice(2);
    const panelContentId = `panel-content-${randomStr}`;
    const panelHeaderId = `panel-header-${randomStr}`;

    return (
        // Wrapping div is required for styling the ::before psuedo class for each accordion panel
        <div>
            <div
                className={classnames(
                styles.accordionPanel,
                styles[variant],
                classNames
                )}
                {...others}
            >
                <button
                    id={panelHeaderId}
                    className={classnames(styles.accordionPanel__trigger, {
                        [styles.isOpen]: open,
                        [styles.defaultCursor]: !showTrigger
                    })}
                    aria-expanded={open}
                    aria-controls={panelContentId}
                    {...(showTrigger && { onClick: () => setOpen(!open) })}
                >
                    <FlexBox spacing={15} className={styles.accordionPanel__header}>
                        {showLeftLabel && labelText && (
                            <FlexBoxItem className={styles.accordionPanel__label}>
                                {labelText}
                            </FlexBoxItem>
                        )}
                        <FlexBoxItem flexGrow={1}>
                            <h3 className={styles.accordionPanel__title}>{title}</h3>
                            {subtitle && (
                                <h4 className={styles.accordionPanel__subtitle}>{subtitle}</h4>
                            )}
                        </FlexBoxItem>
                        {showTrigger && (
                            <FlexBoxItem className={styles.accordionPanel__toggle} alignSelf="center">
                                <ChevronDownRegular aria-hidden="true" focusable={false} />
                            </FlexBoxItem>
                        )}
                    </FlexBox>
                </button>
                <section
                    id={panelContentId}
                    aria-labelledby={panelHeaderId}
                    className={classnames(styles.accordionPanel__body, {
                        [styles.isOpen]: open
                    })}
                >
                    {children}
                </section>
            </div>
        </div>
    );
};

export default AccordionPanel;