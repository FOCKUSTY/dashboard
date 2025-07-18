'use client'

import "./globals.css"

import React from "react";

import { useEffect, useState } from "react";

import { IUser } from "types/user.type";
import { LogIn } from "../components/login";

import { validateCookies } from "api/validate-cookies";
import { fetchUser } from "api/fetch-user";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
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

  return (
    <html lang="ru">
      <body>
        <img className="background" src="/background.png" alt="background"/>
        <div className="human-container">
          <img className="human noselect" src="/human.png" alt="human" />
        </div>
        
        <div id="page">
          <header>
            <h1>The Void</h1>
            <LogIn user={user} />
          </header>

          <main>{children}</main>

          <footer>
            <h2>The Void</h2>
          </footer>
        </div>
      </body>
    </html>
  );
};

export default MainLayout;
