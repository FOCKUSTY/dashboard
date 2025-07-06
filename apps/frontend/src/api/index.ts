import type { GetServerSidePropsContext } from "next";

class Api {
  public readonly url: string = "http://localhost:3001" + "/api";
  public readonly client_url = "http://localhost:3000";

  public readonly validateCookies = (ctx?: GetServerSidePropsContext) => {
    if (!ctx) {
      return false;
    }

    const token = ctx.req.cookies["id-token"];

    return token ? token : false;
  };
}

export default Api;
