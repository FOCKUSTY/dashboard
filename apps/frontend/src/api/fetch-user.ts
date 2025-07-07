"use server";

import { IUser } from "types/user.type";
import { Api } from "api";

export const fetchUser = async (token: string): Promise<IUser | null> => {
  try {
    const user = await fetch(Api.url + "/users", {
      method: "GET",
      headers: { authentication: token }
    });

    return await user.json();
  } catch (error) {
    console.error(error);
    return null;
  }
};
