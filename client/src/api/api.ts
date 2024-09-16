import { config } from 'dotenv';
import type { GetServerSidePropsContext } from "next";

config();

class Api {
    public readonly env = process.env;
    public readonly url: string = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3001' + '/api';
    public readonly client_url = process.env.NEXT_PUBLIC_CLIENT_URL || 'http://localhost:3000';

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