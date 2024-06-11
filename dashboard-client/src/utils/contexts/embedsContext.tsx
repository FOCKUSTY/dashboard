import { createContext } from 'react';

type embedsContextType = {
    embeds?: string[];
    setEmbeds: (embeds: string[]) => void;
};

export const EmbedsContext = createContext<embedsContextType>({
    setEmbeds: () => {},
});