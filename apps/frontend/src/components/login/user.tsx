import { IUser } from "types/user.type";

import { Dropdown } from "../dropdown";
import styles from "./user.module.css";
import { deleteSession, logOut } from "./log-out.service";

import Image from "next/image";

const AvatarUser = ({ user }: { user: IUser }) => {
  return (
    <Image
      src={user.avatar_url || "/TheVoidAvatarSite.png"}
      alt="user avatar"
      width={50}
      height={50}
      className={styles.avatar_url}
    />
  );
};

export const User = ({ user }: { user: IUser }) => {
  return (
    <Dropdown
      className={`${styles.dropdown} noselect`}
      id="user-dropdown"
      summary={<AvatarUser user={user} />}
    >
      <span>{user.nickname || user.username}</span>
      <button
        onClick={() => {
          logOut().then(() => {
            location.reload();
          });
        }}
      >
        Выйти
      </button>
      <button
        onClick={() => {
          deleteSession().then(() => {
            location.reload();
          });
        }}
      >
        Удалить сессию
      </button>
    </Dropdown>
  );
};
