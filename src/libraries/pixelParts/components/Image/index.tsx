import * as React from 'react';
import classnames from 'classnames';
import styles from './Image.module.scss';

export interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
    /** Optional additional class names for the image. */
    classNames?: string;
    /** The source URL of the image. */
    src: string;
    /** The alt text for the image. */
    alt: string;
    /** Optional width of the image. */
    width?: number | string;
    /** Optional height of the image. */
    height?: number | string;
    /** Optional flag to make the image round. */
    isRound?: boolean;
    /** Optional flag to make the image beveled. */
    isBeveled?: boolean;
    /** Optional fallback content to display while image loads. */
    onLoadFallback?: React.ReactNode;
}

const Image = (props: ImageProps): React.ReactElement => {
    const { 
        classNames, 
        height, 
        width, 
        alt, 
        src, 
        isRound = false, 
        isBeveled = false,
        onLoadFallback,
        ...others 
    } = props;

    const [isLoaded, setIsLoaded] = React.useState(onLoadFallback ? false : true);

    const showOnLoadFallback = onLoadFallback && !isLoaded;

    return (
        <>
            {showOnLoadFallback && onLoadFallback}
            <img 
                className={classnames(classNames, {
                    [styles.isRound]: isRound,
                    [styles.isBeveled]: isBeveled,
                    [styles.hide]: !isLoaded
                })}
                src={src} 
                alt={alt} 
                width={width}
                height={height}
                {...(onLoadFallback && { onLoad: () => setIsLoaded(true) })}
                {...others}
            />
        </>
    );
};

export default Image;