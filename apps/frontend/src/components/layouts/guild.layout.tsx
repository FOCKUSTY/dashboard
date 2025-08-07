import styles from "./guild-layout.module.css";

import { LogIn } from "components/login";
import { Logo } from "components/logo";
import { IconComponent } from "components/logo/image.component";
import { SideBar } from "./guild.side-bar";

import type { IUser } from "types/user.type";
import type { IGuild } from "types/guild.type";

type Props = {
  children: React.ReactNode;
  user: IUser|null;
  guild: IGuild|null;
}

export const GuildLayout = ({ children, user, guild }: Props) => {
  if (!guild || !user) {
    return (
      <>
        <header id={styles.header}>
          <IconComponent url={"/TheVoidAvatarSite.png"} alt={"123"} name={"Loading..."} />
          <Logo />
          Загрузка....
        </header>

        <main>{children}</main>

        <footer>
          <h2>© 2025 The Void</h2>
        </footer>
      </>
    )
  }

  return (
    <>
      <SideBar guild={guild} />

      <header id={styles.header}>
        <IconComponent url={guild.icon_url} alt={guild.name + "'s icon"} name={guild.name} />
        <Logo />
        <LogIn user={user} />
      </header>

      <main>{children}</main>

      <footer>
        <h2>© 2025 The Void</h2>
      </footer>
    </>
  )
}

export default GuildLayout;
