'use client'

import { useEffect, useState } from "react";

import { validateCookies } from "api/validate-cookies";
import { fetchUser } from "api/fetch-user";

import type { IUser } from "types/user.type";

const Page = () => {
  const [ user, setUser ] = useState<IUser | null>(null);

  useEffect(() => {
    (async () => {
      const token = await validateCookies();

      if (!token) {
        return;
      }

      setUser(await fetchUser(token));
    })();
  }, []);

  if (!user) {
    return <></>;
  }
  
  return (
    <div className="page-center">
      {user.username}, hello, this is general dashboard for bot
    </div>
  )
}

export default Page;
