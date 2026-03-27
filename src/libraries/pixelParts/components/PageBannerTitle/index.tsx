import * as React from 'react';

import FlexBox from '../FlexBox';
import FlexBoxItem from '../FlexBoxItem';
import SingleLineText from '../SingleLineText';

import styles from './PageBannerTitle.module.scss';

export interface PageBannerTitleProps {
    /** Additional class names to apply to the banner. */
    classNames?: string;
    /** The text to display in the banner. */
    title: string;
    /** The subtitle text to display below the title. */
    subtitle?: string;
    /** The children elements to render inside the banner. */
    children?: React.ReactNode;
    /** The color of the title text. */
    titleColor?: string;
    /** The size of the title text */
    titleSize?: number;
    /** The icon to display next to the text. */
    icon?: React.ReactNode;
}

const PageBannerTitle = (props: PageBannerTitleProps): React.ReactElement => {
    const { classNames, title, subtitle, titleColor, titleSize, icon, children } = props;

    return (
      <FlexBox 
        className={classNames}
        alignItems={subtitle ? 'flex-start' : 'center'} 
        spacing={20} 
      >
        {icon}
        <FlexBoxItem flexGrow={1}>
          <div 
            className={styles.titleText} 
            style={{ color: titleColor, fontSize: titleSize }}
          >
            {title}
          </div>
          {subtitle && (
            <div className={styles.subtitleText}>
              <SingleLineText text={subtitle} />
            </div>
          )}
          <div className={styles.content}>
            {children}
          </div>
        </FlexBoxItem>
      </FlexBox>
    );
  };

  export default PageBannerTitle;