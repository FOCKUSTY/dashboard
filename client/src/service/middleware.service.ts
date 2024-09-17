import { NextFetchEvent, NextRequest, NextResponse } from "next/server";
import Api from "api/api";
import GuildApi from "api/guild.api";

const api = new Api();
const guildApi = new GuildApi();

class Middleware {
    private readonly getId = (req: NextRequest): string => {
        const nextUrl = req.nextUrl;
        const href = nextUrl.href;
    
        if(!href.startsWith(`${api.client_url}/dashboard/`))
            return '';
    
        const url = href.slice(nextUrl.origin.length, href.length).split('/');
        
        return href.indexOf('?id=') != -1
            ? href.slice(0, href.indexOf('?id=')).split('/')[4]
            : url[2];
    };

    public readonly execute = async (req: NextRequest, ev: NextFetchEvent) => {
        const nextUrl = req.nextUrl
        const headers = req.headers;
    
        if(!headers)
            return NextResponse.redirect('/');
    
        if(nextUrl.href.startsWith(`${api.client_url}/dashboard/`)) {
            const id = this.getId(req);
            const respone = await guildApi.fetchValidGuild(id, headers);
        
            return respone.status === 200
                ? NextResponse.next()
                : NextResponse.redirect(`${api.client_url}/menu`);
        };
    
        if(nextUrl.href.startsWith(`${api.client_url}/menu`)) {
            if(nextUrl.locale === 'default') {
                const locale = req.cookies.get('NEXT_LOCALE')?.value || 'ru';
             
                return NextResponse.redirect(`${api.client_url}/${locale}${req.nextUrl.pathname}${req.nextUrl.search}`)
            };
        };
    };
};

export default Middleware;