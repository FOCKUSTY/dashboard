"use server";

import { cookies } from "next/headers";

export const validateCookies = async () => {
  const cookie = (await cookies()).get("id-token");

  return cookie ? cookie.value : false;
};
