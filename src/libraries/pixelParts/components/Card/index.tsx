import * as React from "react";
import classnames from "classnames";
import styles from './Card.module.scss';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement | HTMLButtonElement> {
    /** Background color of the card */
    backgroundColor?: string;
    /** Additional class names to apply to the card for custom styling */   
    classNames?: string;
    /** Font color of the card content */
    fontColor?: string;
    /** Whether the card has a gray background */
    isGray?: boolean; 
    /** Whether the card has a dark background */
    isDark?: boolean;
    /** Whether the card has a hero section */
    hasCardHero?: boolean;
    /** Whether the card has a drop shadow */
    hasShadow?: boolean;
    /** Whether the card has a drop shadow which more subtle */
    hasLightShadow?: boolean;
    /** Background image URL for the hero section */
    heroBackgroundImage?: string;
    /** Border color for the hero section */
    heroBorderColor?: string;
    /** Whether the card is borderless */
    isBorderless?: boolean;
    /** Whether the card accepts custom content */
    hasCutomContent?: boolean;
    /** Icon to be displayed next to card title and body */
    icon?: React.ReactNode;
    /** Content of the card */
    children?: React.ReactNode;
    /** Click handler for the card */
    onClick?: (arg?: any) => void;
    /** Target element for the click handler */
    onClickTarget?: 'Card' | 'CardBody';
    /** Padding for the card */
    cardPadding?: string | number;
    /** Title of the card */
    cardTitle?: string | React.ReactNode;
    /** Font size of the card title */
    cardTitleSize?: string | number;
    /** Margin for the card title */
    cardTitleMargin?: string | number;
    /** HTML element for the title */
    cardTitleElement?: 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'div';
    /** Footer content of the card */
    footer?: string | React.ReactNode;
    /** Specifies Card footer padding */
    footerPadding?: string | number;
    /** Secondary footer content of the card */
    secondaryFooter?: string | React.ReactNode;
    /** Specifies Card secondary footer padding */
    secondaryFooterPadding?: string | number;
    /** Specifies Card body padding */
    bodyPadding?: string | number;
    /** Specifies if the card is a link */
    isLink?: boolean;
    /** Specifies if the card is full width */
    isFullWidth?: boolean;
    /** Specifies if the card is full height */
    isFullHeight?: boolean;
}

const Card = (props: CardProps): React.ReactElement => {
    const {
        backgroundColor,
        classNames,
        fontColor = '#000000',
        heroBackgroundImage,
        heroBorderColor,
        children,
        footer,
        icon,
        onClick,
        cardTitle,
        cardTitleSize,
        cardTitleMargin,
        hasCardHero = false,
        isDark = false,
        isGray,
        isBorderless = false,
        hasShadow = false,
        hasLightShadow = false,
        hasCutomContent = false,
        onClickTarget = 'Card',
        cardPadding = 0,
        bodyPadding = 12,
        footerPadding = 12,
        secondaryFooter,
        secondaryFooterPadding,
        cardTitleElement: CardTitleElement = 'h4',
        isLink = true,
        isFullWidth = false,
        isFullHeight = false,
        ...others
    } = props;

    const hasCardClick = onClick && onClickTarget === 'Card';
    const hasCardBodyClick = onClick && onClickTarget === 'CardBody';

    const CardWrapper = hasCardClick ? 'button' : 'div';
    const CardBodyWrapper = hasCardBodyClick ? 'button' : 'div';

    return (
        <CardWrapper 
            className={classnames(styles.card, classNames, {
                [styles.isClickable]: hasCardClick,
                [styles.isDark]: isDark,
                [styles.isGray]: isGray,
                [styles.isBorderless]: isBorderless,
                [styles.hasShadow]: hasShadow,
                [styles.hasLightShadow]: hasLightShadow,
                [styles.isLink]: isLink,
                [styles.isFullWidth]: isFullWidth,
                [styles.isFullHeight]: isFullHeight
            })} 
            style={{ backgroundColor, padding: cardPadding, color: fontColor }}
            {...(hasCardClick && { onClick })}
            {...others}
        >
            {hasCardHero ? (
                <React.Fragment>
                    <div className={styles.card__hero} style={{ 
                        backgroundImage: `url(${heroBackgroundImage})`,
                        border: `1px solid ${heroBorderColor}`
                    }}>
                        {cardTitle && (
                            <CardTitleElement className={styles.card__title}>
                               {cardTitle}
                            </CardTitleElement>
                        )}
                    </div>
                    <div 
                        className={classnames(styles.card__body, {
                            [styles.isCustom]: hasCutomContent
                        })} 
                        style={{ padding: bodyPadding }}
                    >
                        {children}
                    </div>
                </React.Fragment>
            ) : (
                <CardBodyWrapper 
                    className={classnames(styles.card__body, {
                        [styles.isClickable]: hasCardBodyClick,
                        [styles.isCustom]: hasCutomContent,
                        [styles.isLink]: isLink
                    })}
                    style={{ padding: bodyPadding }}
                    {...(hasCardBodyClick && { onClick })}
                >
                    {icon && (
                        <div className={styles.card__icon}>
                            {icon}
                        </div>
                    )}
                    <div className={styles.card__content}>
                        {cardTitle && (
                            <CardTitleElement className={styles.card__title} style={{ fontSize: cardTitleSize, margin: cardTitleMargin }}>
                                {cardTitle}
                            </CardTitleElement>
                        )}
                        {children && children}
                    </div>
                </CardBodyWrapper>
            )}
            {footer && (
                <div className={styles.card__footer} style={{ padding: footerPadding }}>
                    {footer}
                </div>
            )}
            {secondaryFooter && (
                <div className={styles.card__secondaryFooter} style={{ padding: secondaryFooterPadding }}>
                    {secondaryFooter}
                </div>
            )}
        </CardWrapper>
    );
}

export default Card;