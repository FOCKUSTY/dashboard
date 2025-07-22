"use client";

import "./globals.css";

import React from "react";

import Image from "next/image";
import { FaDiscord, FaTelegram, FaGithub } from "react-icons/fa";
import { useEffect, useState } from "react";

import { IUser } from "types/user.type";
import { LogIn } from "../components/login";

import { Api } from "api";
import { validateCookies } from "api/validate-cookies";
import { fetchUser } from "api/fetch-user";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
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
          <header>
            <div id="logo">
              <h1>The Void</h1>
              <div className="links">
                <a href={Api.the_void.discord_url} target="_blank">
                  <FaDiscord size={24} />
                </a>
                <a href={Api.the_void.telegram_url} target="_blank">
                  <FaTelegram size={24} />
                </a>
                <a href={Api.the_void.github_url} target="_blank">
                  <FaGithub size={24} />
                </a>
              </div>
            </div>

            <LogIn user={user} />
          </header>

          <main>{children}</main>

          <footer>
            <h2>© 2025 The Void</h2>
          </footer>
        </div>
      </body>
    </html>
  );
};

export default MainLayout;
