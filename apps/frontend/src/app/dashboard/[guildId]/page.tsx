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
  const [ loaded, setLoaded ] = useState<boolean>(false);

  const { guildId } = useParams<{guildId: string}>();

  useEffect(() => {
    (async () => {
      const token = await validateCookies();

      if (!token) {
        setLoaded(true);
        return;
      }

      if (guildId) setGuild(await fetchGuild(token, guildId));
      setUser(await fetchUser(token));
      
      setLoaded(true);
    })();
  }, [guildId]);

  if (!user || !guild) {
    return (
      <div className="page-center">
        {
          loaded
            ? "Вам нужно войти"
            : "Загрузка..."
        }
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
