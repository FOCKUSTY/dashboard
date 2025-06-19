import '../styles/global.scss';

import { useState } from 'react';
import GuildContext from '../contexts/guild.context';

import type { AppPropsWithLayout } from '../types/next.types';
import type { FullGuild } from '../types/guild.types';

const MyApp = ({ Component, pageProps }: AppPropsWithLayout<any>) => {
    const [ guild, setGuild ] = useState<FullGuild>();
    const getLayout = Component.getLayout ?? ((page) => page);

    const context = new GuildContext().context;

    return (
        <context.Provider value={{guild, setGuild}}>
            {getLayout(<Component {...pageProps}/>)}
        </context.Provider>
    );
};

export default MyApp;