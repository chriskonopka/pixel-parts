import * as React from 'react';
import * as ReactDOM from 'react-dom';
import classnames from 'classnames';
import {
  CheckmarkRegular,
  ErrorCircleRegular,
  WarningRegular,
  InfoRegular,
  DismissRegular,
} from '@fluentui/react-icons';

const ICON_MAP: Record<string, React.ComponentType<{ className?: string; style?: React.CSSProperties; 'aria-hidden'?: boolean | 'true' | 'false'; focusable?: boolean | string }>> = {
  CheckMark: CheckmarkRegular,
  AlertSolid: ErrorCircleRegular,
  Warning: WarningRegular,
  Info: InfoRegular,
  ChromeClose: DismissRegular,
};

import styles from './Toast.module.scss';

export interface ToastProps {
    /**
     * The message to display in the toast.
     */
    message: string;
    /**
     * Whether the toast is visible or not.
     * @default false
    */
    isVisible: boolean;
    /**
     * Additional CSS classes to apply to the toast.
     */
    className?: string;
    /**
     * The icon to display in the toast.
     * This should be a valid Fluent UI icon name.
     * @default undefined
     */
    icon?: string,
    /**
     * The color of the icon.
     * This should be a valid CSS color value.
     * @default #000
     */
    iconColor?: string;
    /**
     * The duration for which the toast should be visible.
     * If provided, the toast will automatically hide after the specified duration.
     * @default undefined
     */
    duration?: {
        length: number;
        onStart?: () => void;
        onEnd: () => void;
    };
    /**
     * The position of the toast on the screen.
     * @default top-right
     */
    position?: 'top-left' | 'top-center' | 'top-right';
    /**
     * The left offset for the toast.
     * This is used to position the toast horizontally.
     * @default 0
     */
    topOffset?: number;
    /**
     * The top offset for the toast.
     * This is used to position the toast vertically.
     * @default left
     */
    alignContent?: 'left' | 'center' | 'right';
}

const Toast = (props: ToastProps):React.ReactElement => {
    const { 
        message, 
        isVisible, 
        className, 
        duration,
        icon, 
        iconColor = '#000',
        position = 'top-right',
        alignContent = 'left',
    } = props;

    React.useEffect(() => {
        if (duration && isVisible) {
            duration.onStart?.();

            const timer = setTimeout(() => {
                duration.onEnd();
            }, duration.length);

            return () => clearTimeout(timer);
        }
    }, [duration, isVisible]);

    return ReactDOM.createPortal(
        <div
            className={classnames(styles.toast, className, { 
                [styles.isVisible]: isVisible,
                [styles.topLeft]: position === 'top-left',
                [styles.topCenter]: position === 'top-center',
                [styles.topRight]: position === 'top-right',
                [styles.justifyLeft]: alignContent === 'left',
                [styles.justifyCenter]: alignContent === 'center',
                [styles.justifyRight]: alignContent === 'right',
            })}
            role="alert"
            aria-live="assertive"
        >   
            {icon && (() => {
                const IconComponent = ICON_MAP[icon];
                return IconComponent ? (
                    <div style={{ '--toastIconColor': iconColor } as React.CSSProperties}>
                        <IconComponent aria-hidden="true" focusable={false} />
                    </div>
                ) : null;
            })()} 
            <div>{message}</div>
        </div>,
        document.body
    );
};

export default Toast;