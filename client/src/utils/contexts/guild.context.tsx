import { createContext } from 'react';
import type { FullGuild } from 'types/guild.types';

type GuildContextType = {
    guild?: FullGuild;
    setGuild: (guild: FullGuild) => void;
};

export const GuildContext = createContext<GuildContextType>({
    setGuild: () => {},
});