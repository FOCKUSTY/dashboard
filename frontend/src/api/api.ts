import type { GetServerSidePropsContext } from "next";
import config from '../../config.json';

class Api {
    public readonly env = config;
    
    public readonly url: string = (config.server_url || 'http://localhost:3001') + '/api';
    public readonly client_url = config.client_url || 'http://localhost:3000';
    public readonly dev_mode = config.dev_mode || false;

    public readonly validateCookies = (ctx?: GetServerSidePropsContext) => {
        if(!ctx)
            return false;

        const sessionID = ctx.req.cookies['connect.sid'];
    
        return sessionID
            ? ({ Cookie: `connect.sid=${sessionID}` })
            : false;
    };
};

export default Api;