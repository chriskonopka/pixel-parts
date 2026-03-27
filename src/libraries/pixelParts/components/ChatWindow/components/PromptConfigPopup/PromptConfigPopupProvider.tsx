import * as React from 'react';

export interface PromptConfigPopupProvider {
    children: React.ReactNode;
    parentRef?: React.RefObject<HTMLDivElement | null>;
}

export interface PromptConfigPopupContextValue {
    parentRef: React.RefObject<HTMLDivElement | null>;
}

export const PromptConfigPopupContext = React.createContext<PromptConfigPopupContextValue | undefined>({
    parentRef: React.createRef<HTMLDivElement | null>(),
});

export const usePromptConfigPopupContext = (): PromptConfigPopupContextValue => {
    const context = React.useContext(PromptConfigPopupContext);
    if (!context) {
        throw new Error('usePromptConfigPopupContext must be used within a PromptConfigPopupProvider');
    }
    return context;
};

const PromptConfigPopupProvider = (props) => {
    const { children, parentRef } = props;

    return (
        <div ref={parentRef}>
            <PromptConfigPopupContext.Provider value={{ parentRef }}>
                {children}
            </PromptConfigPopupContext.Provider>
        </div>
    );
};

export default PromptConfigPopupProvider;