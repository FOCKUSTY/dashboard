"use server";

import { cookies } from "next/headers";

import { IUser } from "types/user.type";
import { Api } from "api";

export const fetchUser = async (token: string): Promise<IUser | null> => {
  try {
    const fromCookie = (await cookies()).get("user");

    if (fromCookie) {
      return JSON.parse(fromCookie.value) as IUser;
    }

    const user = await fetch(Api.url + "/users", {
      method: "GET",
      headers: { authentication: token }
    });

    return (await user.json()).data;
  } catch (error) {
    console.error(error);
    return null;
  }
};
