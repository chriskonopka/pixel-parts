import * as React from 'react';
import classnames from 'classnames';
import {
  StarFilled,
  StarRegular,
  ErrorCircleRegular,
  CalendarRegular,
  DismissRegular,
  ChevronDownRegular,
  ChevronLeftRegular,
  ChevronRightRegular,
  CopyRegular,
  FilterRegular,
  ArrowSortUpRegular,
  ArrowSortDownRegular,
  DocumentPdfRegular,
  DocumentTableRegular,
  DocumentTextRegular,
  SlideLayoutRegular,
  ImageRegular,
  DocumentRegular,
  CheckmarkRegular,
} from '@fluentui/react-icons';
import styles from './Favorite.module.scss';

const ICON_MAP: Record<string, React.ComponentType<{ style?: React.CSSProperties; 'aria-hidden'?: boolean | 'true' | 'false'; focusable?: boolean | string }>> = {
  FavoriteStarFill: StarFilled,
  FavoriteStar: StarRegular,
  AlertSolid: ErrorCircleRegular,
  Calendar: CalendarRegular,
  Cancel: DismissRegular,
  ChromeClose: DismissRegular,
  ChevronDownMed: ChevronDownRegular,
  ChevronLeft: ChevronLeftRegular,
  ChevronRight: ChevronRightRegular,
  Copy: CopyRegular,
  Filter: FilterRegular,
  SortUp: ArrowSortUpRegular,
  SortDown: ArrowSortDownRegular,
  PDF: DocumentPdfRegular,
  WordDocument: DocumentTextRegular,
  PowerPointDocument: SlideLayoutRegular,
  ExcelDocument: DocumentTableRegular,
  TextDocument: DocumentTextRegular,
  Photo2: ImageRegular,
  Document: DocumentRegular,
  CheckMark: CheckmarkRegular,
};

export interface FavoriteProps extends React.HTMLAttributes<HTMLButtonElement> {
    /** Additional class names to apply to the button for custom styling */ 
    classNames?: string;
    /** Object containing properties for the favorited state */
    favorited: {
        /** Name of the icon to be displayed */
        iconName?: string;
        /** Color of the icon */
        iconColor?: string;
        /** Text to be displayed */
        text?: string;
        /** Color of the text */
        textColor?: string;
    },
    /** Boolean indicating if the item is favorited */
    isFavorited?: boolean;
    /** Boolean indicating if the label should be hidden on mobile */
    hideLabelOnMobile?: boolean;
    /** Object containing properties for the unfavorited state */
    unFavorited: {
        /** Name of the icon to be displayed */
        iconName?: string;
        /** Color of the icon */
        iconColor?: string;
        /** Text to be displayed */
        text?: string;
        /** Color of the text */
        textColor?: string;
    },
    /** Function to handle click events */
    onClick: (arg?: any) => void;
}

const Favorite = (props: FavoriteProps): React.ReactElement => {
    const {
        favorited = {
            iconName: 'FavoriteStarFill',
            iconColor: '#F6C31E',
            text: 'Favorited',
            textColor: '#fff',
        },
        hideLabelOnMobile = true,
        isFavorited = false,
        unFavorited = {
            iconName: 'FavoriteStar',
            iconColor: '#F6C31E',
            text: 'Add Favorite',
            textColor: '#fff',
        },
        onClick = () => {},
        ...others
    } = props;

    const { iconName, iconColor, text, textColor } = isFavorited ? favorited : unFavorited;
    const IconComp = iconName ? ICON_MAP[iconName] : undefined;

    return (
        <button
            className={classnames(styles.favorite, props.classNames)}
            onClick={onClick}
            {...others}
        >
            <div className={styles.favorite__icon}>
                {IconComp ? <IconComp style={{ color: iconColor }} aria-hidden="true" focusable={false} /> : null}
            </div>
            <div 
                className={classnames(styles.favorite__text, {
                    [styles.hideLabelOnMobile]: hideLabelOnMobile
                })} 
                style={{ color: textColor }}>
                {text}
            </div>
        </button>
    );
};

export default Favorite;