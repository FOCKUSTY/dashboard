class Api {
    public readonly discord_url = 'https://discord.com/api/v9';
    public readonly discord_token = process.env.DISCORD_BOT_TOKEN;

    public readonly getBotAuth = () => {
        return { Authorization: 'Bot ' + this.discord_token };
    };

    public readonly getUserAuth = (accessToken: string) => {
        return { Authorization: 'Bearer ' + accessToken };
    };
};

export default Api;