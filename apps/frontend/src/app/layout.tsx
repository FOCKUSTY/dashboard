"use client";

import "./globals.css";

import React from "react";

import { useEffect, useState } from "react";

import { IUser } from "types/user.type";
import { LogIn } from "../components/login";

import { validateCookies } from "api/validate-cookies";
import { fetchUser } from "api/fetch-user";

import { FaDiscord, FaTelegram, FaGithub } from "react-icons/fa";
import { Api } from "api";

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
        <img className="background" src="/background.png" alt="background" />
        <div className="human-container">
          <img className="human noselect" src="/human.png" alt="human" />
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
