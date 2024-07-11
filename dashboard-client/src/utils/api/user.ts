import { GetServerSidePropsContext } from "next"
import { validateCookies } from "../helpers";
import { API_URL } from "./index";

export const getUser = async (ctx: GetServerSidePropsContext) =>
{
    const headers = validateCookies(ctx);

    if(!headers)
        return { props: { user: null } };

    try
    {
        const res = await fetch(`${API_URL}/users/${ctx.query.id}`, { headers: headers });

        const user = await res.json();

        return { props: { user } };
    }
    catch (err)
    {
        console.error(err);
        
        return { props: { user: null } };
    };
}