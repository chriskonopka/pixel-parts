import * as React from 'react';

export interface TimerProps {
  /**
   * Whether the timer is active.
   * @default false
   */
  isLoading?: boolean;
}

const Timer = (props: TimerProps): React.ReactElement => {
    const { isLoading = false } = props;

    const [seconds, setSeconds] = React.useState(0);

    const formatTime = (time: number): string => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;

        return `${minutes > 0 ? `${minutes}m ` : ''}${seconds}s`;
    };

    React.useEffect(() => {
        if (!isLoading) return;

        setSeconds(0);               
        const timer = setInterval(() => setSeconds(prev => prev + 1), 1000);

        return () => clearInterval(timer);
    }, [isLoading]);

    return (
        <>{formatTime(seconds)}</>
    );
};

export default Timer;