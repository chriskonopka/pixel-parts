import * as React from 'react';
import classnames from 'classnames';
import { useMediaQuery } from 'react-responsive';

import shieldIcon from '../../../../../../assets/images/shield.svg';
import infoIcon from '../../../../../../assets/images/info.svg';

import styles from './GuardrailsPopup.module.scss';

export interface GuardrailsPopupProps {
    title: string;
    children: React.ReactNode;
}

const GuardrailsPopup = (props: GuardrailsPopupProps): React.ReactElement => {
    const { title, children } = props;

    const [isOpen, setIsOpen] = React.useState(false);

    const isSmallScreen = useMediaQuery({ query: '(max-width: 481px)' });

    const isMobile = window.matchMedia('(pointer: coarse)').matches;

    const containerRef = React.useRef<HTMLDivElement | null>(null);

    const togglePopup = () => {
        setIsOpen(!isOpen);
    };

    // Close popup on outside click/tap when on mobile
    React.useEffect(() => {
        if (!isMobile || !isOpen) return;

        const handleClickOutside = (event: MouseEvent | TouchEvent) => {
            if (
                containerRef.current &&
                !containerRef.current.contains(event.target as Node)
            ) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        document.addEventListener('touchstart', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('touchstart', handleClickOutside);
        };
    }, [isMobile, isOpen]);

    return (
        <div className={styles.container} ref={containerRef}>
            {!isSmallScreen && (
                <>
                    <img src={shieldIcon} alt="" aria-hidden="true" width={19} />
                    <div className={styles.text}>
                        {title}
                    </div>
                </>
            )}
            <button
                {...(isMobile && { onClick: togglePopup })}
                className={styles.infoIcon}
                aria-label="info"
            >
                <img
                    src={isSmallScreen ? shieldIcon : infoIcon}
                    alt=""
                    aria-hidden="true"
                    width={19}
                />
            </button>
            <div
                className={classnames(styles.popup, {
                    [styles.isOpen]: isOpen
                })}
            >
                {children}
            </div>
        </div>
    );
};

export default GuardrailsPopup;