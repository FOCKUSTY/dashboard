import { IUser } from "types/user.type";

import { Dropdown } from "../dropdown";
import styles from "./user.module.css";
import { deleteSession, logOut } from "./log-out.service";

import { IconComponent } from "components/logo/image.component";

export const User = ({ user }: { user: IUser }) => {
  return (
    <Dropdown
      className={`${styles.dropdown} noselect`}
      id="user-dropdown"
      summary={<IconComponent url={user.avatar_url} alt={user.username + "'s avatar"} className={styles.avatar_url} />}
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
