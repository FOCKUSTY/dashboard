"use client";

import "./globals.css";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import Image from "next/image";

import { validateCookies } from "api/validate-cookies";
import { fetchUser } from "api/fetch-user";
import { fetchGuild } from "api/fetch-guilds";

import type { IUser } from "types/user.type";
import type { IGuild } from "types/guild.type";

import UserLayout from "components/layouts/user.layout";
import GuildLayout from "components/layouts/guild.layout";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const [ user, setUser ] = useState<IUser | null>(null);
  const [ guild, setGuild ] = useState<IGuild | null>(null);

  const { guildId } = useParams<{guildId: string}>();

  useEffect(() => {
    (async () => {
      const token = await validateCookies();

      if (!token) {
        return null;
      }

      if (guildId) setGuild(await fetchGuild(token, guildId));
      setUser(await fetchUser(token));
    })();
  }, [guildId]);

  return (
    <html lang="ru">
      <body>
        <Image
          width={1920}
          height={1080}
          className="background"
          src="/background.png"
          alt="background"
        />
        <div className="human-container">
          <Image
            width={597}
            height={935}
            className="human noselect"
            src="/human.png"
            alt="human"
          />
        </div>

        <div id="page">
          { 
            (guild && user)
              ? <GuildLayout user={user} guild={guild}>{children}</GuildLayout>
              : <UserLayout user={user}>{children}</UserLayout>
          }
        </div>
      </body>
    </html>
  );
};

export default MainLayout;
