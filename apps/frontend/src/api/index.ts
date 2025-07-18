export class Api {
  public static readonly url: string = "http://localhost:3001" + "/api";
  public static readonly client_url = "http://localhost:3000";

  public static readonly the_void = {
    github_url: "https://github.com/The-Void-Community",
    discord_url: "https://discord.gg/97J8mnn4Gr",
    telegram_url: "https://t.me/The_Void_Community"
  } as const;
}
