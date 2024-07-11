import { GetServerSidePropsContext } from "next"
import { sendWebhookMessageType } from "../types";
import { Backup } from "types/backups/backup";
import { validateCookies } from "../helpers";
import { API_URL } from "./api";
import axios from "axios";

export const saveBackupServer = async (message: sendWebhookMessageType, backupName: string, userId: string) =>
{
    try
    {
        const { data } = await axios.post(`${API_URL}/backups/${userId}`, { message: message, name: backupName });

        return data;
    }
    catch (err)
    {
        console.error(err);

        return;
    };
};

export const getBackups = async(ctx: GetServerSidePropsContext, userId: string) =>
{
    const headers = validateCookies(ctx);

    if(!headers)
        return { redirect: { destination: '/' } };

    try
    {
        const { data: backups } = await axios.get<Backup[]>(`${API_URL}/backups/${userId}`, { headers: headers });

        return { props: { backups } };
    }
    catch (err)
    {
        console.error(err);
    };
}