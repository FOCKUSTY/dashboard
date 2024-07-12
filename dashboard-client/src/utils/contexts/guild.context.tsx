import { createContext } from 'react';
import { FullGuild } from 'types/guild/guild.type';

type GuildContextType = {
    guild?: FullGuild;
    setGuild: (guild: FullGuild) => void;
};

export const GuildContext = createContext<GuildContextType>({
    setGuild: () => {},
});