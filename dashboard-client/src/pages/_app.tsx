import { useState } from 'react';
import 'utils/styles/globals.scss';

import { GuildContext } from 'utils/contexts/guildContext';
import { AppPropsWithLayout } from 'utils/types';
import { FullGuild } from 'types/guild/guild';

const MyApp = ({ Component, pageProps }: AppPropsWithLayout<any>) =>
{
    const [ guild, setGuild ] = useState<FullGuild>();
    const getLayout = Component.getLayout ?? ((page) => page);

    return <GuildContext.Provider value={{guild, setGuild}}>
        {getLayout(<Component {...pageProps}/>)}
    </GuildContext.Provider>;
};

export default MyApp;