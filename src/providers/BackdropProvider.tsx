import { createContext, useContext, ReactNode } from 'react';
import { useBackdrop } from '../hooks/useBackdrop';

interface BackdropContextType {
    showBackdrop: (text?: string) => void;
    hideBackdrop: () => void;
}

const BackdropContext = createContext<BackdropContextType | null>(null);

export function BackdropProvider({ children }: { children: ReactNode }) {
    const { BackdropComponent, showBackdrop, hideBackdrop } = useBackdrop();

    return (
        <BackdropContext.Provider value={{ showBackdrop, hideBackdrop }}>
            <BackdropComponent />
            {children}
        </BackdropContext.Provider>
    );
}

export const useBackdropContext = () => {
    const context = useContext(BackdropContext);
    if (!context) {
        throw new Error('useBackdropContext must be used within a BackdropProvider');
    }
    return context;
};
