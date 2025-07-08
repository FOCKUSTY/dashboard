"use server";

import { cookies } from "next/headers";
import { IUser } from "types/user.type";

export const validateCookies = async () => {
  const userCookie = (await cookies()).get("user");

  if (!userCookie) return false;
  const user = (JSON.parse(userCookie.value)) as (IUser & { auth_id: string })

  const token = (await cookies()).get(`${user.auth_id}-${user.id}-token`);

  return token ? token.value : false;
};
