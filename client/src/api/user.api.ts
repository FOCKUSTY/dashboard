import type { GetServerSidePropsContext } from "next";
import Api from './api';

const api = new Api();

class UserApi {
    public readonly fetchUser = async (context: GetServerSidePropsContext) => {
        const headers = api.validateCookies(context);
    
        if(!headers)
            return { props: { user: null } };
    
        try {
            const res = await fetch(`${api.url}/users/${context.query.id}`, { headers });
            const user = await res.json();
    
            return { props: { user } };
        } catch (err) {
            console.error(err);
            
            return { props: { user: null } };
        };
    };
};

export default UserApi;