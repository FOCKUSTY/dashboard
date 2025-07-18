export class Api {
  public static readonly url: string = "http://localhost:3001" + "/api";
  public static readonly client_url = "http://localhost:3000";

  public static readonly the_void = {
    github_url: "https://github.com/The-Void-Community",
    discord_url: "https://discord.gg/97J8mnn4Gr",
    telegram_url: "https://t.me/The_Void_Community"
  } as const;

  public static readonly invite_url = `https://discordapp.com/api/oauth2/authorize?client_id=1122199797449904179&redirect_url=${encodeURIComponent(`${Api.url}/auth/discord`)}&response_type=code`;
  public static readonly auth_url = Api.url + "/auth/discord"; 
}
