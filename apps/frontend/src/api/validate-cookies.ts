"use server";

import { cookies } from "next/headers";

export const validateCookies = async () => {
  const userCookie = (await cookies()).get("auth-data");

  if (!userCookie) return false;
  const user = JSON.parse(userCookie.value) as {
    auth_id: string;
    profile_id: string;
  };

  const token = (await cookies()).get(
    `${user.auth_id}-${user.profile_id}-token`
  );

  return token ? token.value : false;
};
