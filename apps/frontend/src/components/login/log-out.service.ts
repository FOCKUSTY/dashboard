"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

const AUTH_COOKIE = ["auth-data", "user"];

export const logOut = async () => {
  const cookie = await cookies();

  AUTH_COOKIE.forEach((name) => cookie.delete(name));

  revalidatePath("/", "page");
};

export const deleteSession = async () => {
  const cookie = await cookies();

  const { auth_id, profile_id } = JSON.parse(
    cookie.get("auth-data")?.value || ""
  );

  [...AUTH_COOKIE, auth_id + "-" + profile_id + "-token"].forEach((name) =>
    cookie.delete(name)
  );

  revalidatePath("/", "page");
};
