import type { GetServerSidePropsContext } from "next";
import type { Guild } from '../types/guild.types';

import axios from "axios";
import Api from "./api";

const api = new Api();

class GuildApi {
    public readonly fetchValidGuild = async (id: string, headers: HeadersInit) => {
        const respone = await fetch(`${api.url}/guilds/${id}/permissions`, { headers });
    
        return respone;
    };

    public readonly fetchGuild = async (ctx: GetServerSidePropsContext) => {
        const headers = api.validateCookies(ctx);
    
        if(!headers)
            return { redirect: { destination: '/' } };
    
        try {
            const res = await fetch(`${api.url}/guilds/${ctx.query.id}`, { headers });
            const guild = await res.json();
    
            return { props: { guild } };
        } catch (err) {
            console.error(err);
            
            return { redirect: { destination: '/' } };  
        };
    };

    public readonly getMutialGuilds = async (context: GetServerSidePropsContext) => {
        const headers = api.validateCookies(context);
    
        if(!headers)
            return { redirect: { destination: '/' } };
    
        try {
            const { data: guilds } = await axios.get<Guild[]>(`${api.url}/guilds`, { headers });
    
            return { props: guilds };
        } catch (err) {
            console.error(err);
    
            return { redirect: { destination: '/' } };
        };
    };

    public readonly getGuild = async (ctx: GetServerSidePropsContext) => {
        const headers = api.validateCookies(ctx)
    
        if(!headers)
            return { redirect: { destination: '/' } };
    
        try {
            const { data: guild } = await axios.get<Guild>(`${api.url}/guilds/${ctx.query.id}`, { headers });
    
            return { props: { guild } };
        } catch (err) {
            console.error(err);
    
            return { redirect: { destination: '/' } };
        };
    };
};

export default GuildApi;