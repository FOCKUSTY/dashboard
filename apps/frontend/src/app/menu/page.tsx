"use client";

import styles from "./page.module.css";

import { useEffect, useState } from "react";

import Image from "next/image";

import { validateCookies } from "api/validate-cookies";
import { fetchGuilds } from "api/fetch-guilds";

export const Page = () => {
  const [ guilds, setGuilds ] = useState<{id: string, name: string, icon_url: string|null, banner_url: string|null}[]|null>(null);

  useEffect(() => {
    (async () => {
      const token = await validateCookies();

      if (!token) {
        return;
      }
      
      setGuilds(await fetchGuilds(token));
    })();
  }, []);

  if (!guilds) {
    return <></>;
  }

  return (
    <div id={styles.main}>
      <div id={styles.menu}>
        {
          guilds.map(guild =>
            <div key={guild.id} className={styles.card}>
              <Image height={50} width={50} src={guild.icon_url || "/TheVoidAvatarSite.png"} alt={guild.name + " icon"}/>
              <span>{guild.name}</span>
            </div>
            // <span key={guild.id}>{guild.name}</span>
          )
        }
      </div>
    </div>
  )
};

export default Page;
