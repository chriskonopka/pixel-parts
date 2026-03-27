import * as React from 'react';

export interface UseDrawerReturn {
    isOpen: boolean;
    activeDrawer?: number;
    setActiveDrawer: React.Dispatch<React.SetStateAction<number | undefined>>;
    toggleDrawer: () => void;
    openDrawer: () => void;
    closeDrawer: () => void;
}

const useDrawer = (refs?: React.RefObject<HTMLDivElement>[]): UseDrawerReturn => {
    const [isOpen, setIsOpen] = React.useState(false);
    const [activeDrawer, setActiveDrawer] = React.useState<number>();

    const openDrawer = () => {
        setIsOpen(true);
    };

    const closeDrawer = () => {
        setIsOpen(false);
    };

    const toggleDrawer = () => {
        setIsOpen(prev => !prev);
    };
    
    React.useEffect(() => {
        if (refs && refs.length > 0) {
            const closeDrawerOnOutsideClick = (event: MouseEvent) => {
                const isInside = refs.some(ref => ref.current?.contains(event.target as Node));

                if (!isInside) {
                    closeDrawer();
                }
            };

            document.addEventListener("mousedown", closeDrawerOnOutsideClick);

            return () => {
                document.removeEventListener("mousedown", closeDrawerOnOutsideClick);
            };
        }
    }, [refs, closeDrawer]);

    return {
        isOpen,
        activeDrawer, 
        setActiveDrawer,
        openDrawer,
        closeDrawer,
        toggleDrawer
    };
};

export default useDrawer;