import { useState } from 'react';
import { GuildContext } from '../utils/contexts/guildContext';
import '../utils/styles/globals.scss';
import { AppPropsWithLayout, FullGuild } from '../utils/types';

const MyApp = ({ Component, pageProps }: AppPropsWithLayout<any>) =>
{
    const [ guild, setGuild ] = useState<FullGuild>();
    const getLayout = Component.getLayout ?? ((page) => page);

    return <GuildContext.Provider value={{guild, setGuild}}>
        {getLayout(<Component {...pageProps}/>)}
    </GuildContext.Provider>;
};

export default MyApp;