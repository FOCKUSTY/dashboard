import { GetServerSidePropsContext } from "next";
import locales from './locales/locales.json';
import { FullGuild, PartialGuild } from "types/guild/guild.type";
import { User } from "types/index";

const languages: any = locales;

const hexSymbolds = new Map();
const enabledSymboldsToColor = '#1234567890abcdef';

for(let char of enabledSymboldsToColor) {
    hexSymbolds.set(char.toLowerCase(), true)
    hexSymbolds.set(char.toUpperCase(), true)
};


export type Language = 'ru' | 'en';

const variables =
[
    ':guildId:',
    ':guildname:'
];

export const t = (text: string, language: Language | string, variable?: string) =>
{
    if(!languages)
        return;
    
    if(language === 'default')
        language = 'ru';
    
    const l = languages[language || 'ru'];
    const output: string = language ? l[text] || text : l['ru'][text];

    if(!variable)
        return output;

    let vbl: string = '';
    
    variables.map((v: string) =>
        text.indexOf(v) !== -1 ? vbl = v : vbl = 'none');

    return vbl != 'none'
        ? output.replace(vbl, variable)
        : output;
};

export const validateCookies = (ctx: GetServerSidePropsContext) =>
{
    const sessionID = ctx.req.cookies['connect.sid'];

    return sessionID ? ({ Cookie: `connect.sid=${sessionID}` }) : false;
};

export const getIcon = (guild?: PartialGuild | FullGuild) =>
{
    return (!guild || !guild.icon) ? '/TheVoidAvatarSite.png' : `https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.png`
};

export const getAvatar = (user?: User) =>
{
    return (!user || !user.avatar) ? '/TheVoidAvatarSite.png' : `https://cdn.discordapp.com/icons/${user.id}/${user.avatar}.png`
}

export const getHexSymbol = (char: string): boolean =>
{
    return !!hexSymbolds.get(char);
};