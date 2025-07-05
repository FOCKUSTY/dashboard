import Api from '../api/api';

const api = new Api();

class Service {
    public readonly login = () => {
        return window.location.href = `${api.url}/auth/discord`;
    };

    public readonly invite = () => {
        return window.location.href = `https://discordapp.com/api/oauth2/authorize?client_id=1122199797449904179&redirect_url=${encodeURIComponent(`${api.url}/auth/discord/redirect`)}&response_type=code`
    };
};

export default Service;