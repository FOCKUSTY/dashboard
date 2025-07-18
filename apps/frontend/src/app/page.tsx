"use client";

import styles from "./page.module.css";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { Api } from "api";
import { validateCookies } from "api/validate-cookies";
import { fetchUser } from "api/fetch-user";

import type { IUser } from "types/user.type";

const Page = () => {
  const router = useRouter();

  const [user, setUser] = useState<IUser | null>(null);

  useEffect(() => {
    (async () => {
      const token = await validateCookies();

      if (!token) {
        return;
      }

      setUser(await fetchUser(token));
    })();
  }, []);

  return (
    <div id={styles.main}>
      <div>
        <h2>{user ? `${user.nickname}, д` : "Д"}обро пожаловать в The Void!</h2>
        {user ? (
          <button onClick={() => router.push("/menu")}>
            Перейти в меню серверов!
          </button>
        ) : (
          <button onClick={() => (window.location.href = Api.invite_url)}>
            Войти через Discord
          </button>
        )}
      </div>
    </div>
  );
};

export default Page;
