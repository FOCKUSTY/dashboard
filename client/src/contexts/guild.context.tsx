import { createContext, useContext, useEffect } from 'react';
import type { FullGuild } from '../types/guild.types';

type GuildContextType = {
    guild?: FullGuild;
    setGuild: (guild?: FullGuild) => void;
};

class GuildContext {
    private readonly _context = createContext<GuildContextType>({
        setGuild: () => {},
    });

    public setContext = (guild?: FullGuild) => {
        const { setGuild } = useContext(this._context);

        useEffect(() => {
            setGuild(guild);
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

export default GuildContext;