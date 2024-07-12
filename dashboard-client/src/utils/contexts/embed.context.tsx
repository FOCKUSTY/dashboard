import { createContext } from 'react';

type EmbedsContextType = {
    embeds?: string[];
    setEmbeds: (embeds: string[]) => void;
};

export const EmbedsContext = createContext<EmbedsContextType>({
    setEmbeds: () => {},
});