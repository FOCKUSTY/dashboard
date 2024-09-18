import { createContext, useContext, useEffect } from 'react';

type EmbedsContextType = {
    embeds?: string[];
    setEmbeds: (embeds?: string[]) => void;
};

class EmbedContext {
    private readonly _context = createContext<EmbedsContextType>({
        setEmbeds: () => {},
    });

    public setContext = (embeds?: string[]) => {
        const { setEmbeds } = useContext(this._context);

        useEffect(() => {
            setEmbeds(embeds);
        }, []);
    };
    
    public readonly getContext = () => {
        const context = useContext(this._context);

        return context;
    };

    get context() {
        return this._context;
    };
};

export default EmbedContext;