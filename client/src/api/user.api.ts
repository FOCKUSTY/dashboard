import type { GetServerSidePropsContext } from "next";
import Api from './api';

const api = new Api();

class UserApi {
    public readonly fetchUser = async (context: GetServerSidePropsContext) => {
        const headers = api.validateCookies(context);

        if(!headers)
            return null;
    
        try {
            const res = await fetch(`${api.url}/users`, { headers });
            const user = await res.json();
    
            return user;
        } catch (err) {
            console.error(err);
            
            return null;
        };
    };
};

export default UserApi;