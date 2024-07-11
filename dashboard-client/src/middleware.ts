import { NextFetchEvent, NextRequest, NextResponse } from "next/server";
import { fetchValidGuild } from "@/src/utils/api/guild-api.service";
import config from '../config.json'

const getId = (req: NextRequest): string =>
{
    const nextUrl = req.nextUrl;
    const href = nextUrl.href;

    if(!href.startsWith(`${config.client_url}/dashboard/`))
        return '';

    const url = href.slice(nextUrl.origin.length, href.length).split('/');
    
    return href.indexOf('?id=') != -1
        ? href.slice(0, href.indexOf('?id=')).split('/')[4]
        : url[2];
};

const middleware = async (req: NextRequest, ev: NextFetchEvent) =>
{
    const nextUrl = req.nextUrl
    const headers = req.headers;

    if(!headers)
        return NextResponse.redirect('/');

    if(nextUrl.href.startsWith(`${config.client_url}/dashboard/`))
    {
        const id = getId(req);
        const respone = await fetchValidGuild(id, headers);
    
        return respone.status === 200
            ? NextResponse.next()
            : NextResponse.redirect(`${config.client_url}/menu`);
    };

    if(nextUrl.href.startsWith(`${config.client_url}/menu`))
    {
        if(nextUrl.locale === 'default')
        {
            const locale = req.cookies.get('NEXT_LOCALE')?.value || 'ru';
         
            return NextResponse.redirect(`${config.client_url}/${locale}${req.nextUrl.pathname}${req.nextUrl.search}`)
        }
    }

};

export default middleware;