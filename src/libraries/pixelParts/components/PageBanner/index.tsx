import * as React from "react";
import classnames from 'classnames';
import styles from './PageBanner.module.scss';

import FlexBox from '../FlexBox';
import FlexBoxItem from '../FlexBoxItem';

export interface PageBannerProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Background color of the PageBanner */
    backgroundColor?: string;
    /** Array of strings representing breadcrumbs */
    breadcrumbs?: (string | React.ReactElement)[];
    /** Content to be displayed on the right side of the breadcrumbs */
    breadcrumbRightContent?: React.ReactNode;
    /** Additional class names to apply to the PageBanner for custom styling */
    classNames?: string;
    /** Content to be displayed on the left side of the PageBanner */
    leftContent: React.ReactNode;
    /** Content to be displayed on the right side of the PageBanner */
    rightContent?: React.ReactNode;
    /** Inline CSS styles */
    style?: object,
    /** When true, remove the drop shadow */
    disableShadow?: boolean;
}

const PageBanner = (props: PageBannerProps): React.ReactElement => {
    const {
        classNames,
        leftContent,
        rightContent = null,
        backgroundColor,
        breadcrumbs = [],
        breadcrumbRightContent,
        style = {},
        disableShadow,
        ...others
    } = props;

    return (
        <div className={classnames(styles.pageBanner,  disableShadow && styles['pageBanner--noShadow'], classNames)}>
            <div className={styles.pageBanner__breadcrumbsContainer}>
                <>
                    {breadcrumbs && breadcrumbs.length > 0 && (
                        <FlexBox className={styles.pageBanner__breadcrumbs} style={{ width: 'unset' }}>
                            {breadcrumbs.map((breadcrumb, index) => (
                                <FlexBoxItem key={index}>{breadcrumb}</FlexBoxItem>
                            ))}
                        </FlexBox>
                    )}
                </>
                {breadcrumbRightContent && (
                    <>
                        {breadcrumbRightContent}
                    </>
                )}
            </div>
            <FlexBox
                className={styles.pageBanner__titleBar}
                justifyContent="space-between"
                spacing="10%"
                style={{ ...style, backgroundColor }}
                {...others}
            >
                <FlexBoxItem flexGrow={1}>
                    {leftContent}
                </FlexBoxItem>
                {rightContent && (
                    <FlexBoxItem>
                        {rightContent}
                    </FlexBoxItem>
                )}
            </FlexBox>
        </div>
    );
};

export default PageBanner;