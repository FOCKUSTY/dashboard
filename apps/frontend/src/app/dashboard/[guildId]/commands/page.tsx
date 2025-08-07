'use client'

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import { fetchGuild } from "api/fetch-guilds";
import { fetchUser } from "api/fetch-user";
import { validateCookies } from "api/validate-cookies";

import type { IGuild } from "types/guild.type";
import type { IUser } from "types/user.type";

const Page = () => {
  const [ user, setUser ] = useState<IUser | null>(null);
  const [ guild, setGuild ] = useState<IGuild | null>(null);

  const { guildId } = useParams<{guildId: string}>();

  useEffect(() => {
    (async () => {
      const token = await validateCookies();

      if (!token) {
        return;
      }

      if (guildId) setGuild(await fetchGuild(token, guildId));
      setUser(await fetchUser(token));
    })();
  }, []);

  if (!user || !guild) {
    return (
      <div className="page-center">
        Загрузка...
      </div>
    )
  }

  return (
    <>
      <div className="page-center">
        {user.username}, hello in your dashboard: {guild.name}
      </div>
    </>
  )
}

export default Page;
