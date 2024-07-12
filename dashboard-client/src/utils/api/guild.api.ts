import { PartialGuild } from "types/guild/guild.type";
import { GetServerSidePropsContext } from "next"
import { validateCookies } from "../helpers";
import { API_URL } from "./api";
import axios from "axios";

export const fetchMutialGuilds = async (context: GetServerSidePropsContext) =>
{
    const headers = validateCookies(context);

    if(!headers)
        return { redirect: { destination: '/' } };

    try
    {
        const { data: guilds } = await axios.get<PartialGuild[]>(`${API_URL}/guilds`, { headers });

        return { props: guilds };
    }
    catch (err)
    {
        console.error(err);

        return { redirect: { destination: '/' } };
    };
};

export const getGuild = async (ctx: GetServerSidePropsContext) =>
{
    const headers = validateCookies(ctx);

    if(!headers)
        return { redirect: { destination: '/' } };

    try
    {
        const status = (await fetch(`${API_URL}/guilds/${ctx.query.id}`, { headers: headers })).status;

        if(status != 200)
            return { redirect: { destination: '/' } };
        
        const res = await fetch(`${API_URL}/guilds/${ctx.query.id}`, { headers: headers });
        const guild = await res.json();

        return { props: { guild } };
    }
    catch (err)
    {
        console.error(err);
        
        return { redirect: { destination: '/' } };  
    };
};

export const fetchGuild = async (ctx: GetServerSidePropsContext) =>
{
    const headers = validateCookies(ctx);

    if(!headers)
        return { redirect: { destination: '/' } };

    try
    {
        const { data: guild } = await axios.get<PartialGuild>(`${API_URL}/guilds/${ctx.query.id}`, { headers: headers });

        return { props: { guild } };
    }
    catch (err)
    {
        console.error(err);

        return { redirect: { destination: '/' } };
    };
};

export const fetchValidGuild = async (id: string, headers: HeadersInit) =>
{
    const respone = await fetch(`${API_URL}/guilds/${id}/permissions`, {
        headers: headers
    });

    return respone;
};