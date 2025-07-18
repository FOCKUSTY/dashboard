import { IUser } from "types/user.type";

import { Dropdown } from "../dropdown";
import styles from "./user.module.css";

const AvatarUser = ({ user }: { user: IUser }) => {
  return (
    <img
      src={user.avatar_url || "/TheVoidAvatarSite.png"}
      alt="user avatar"
      sizes="50px"
      className={styles.avatar_url}
    />
  )
};

export const User = ({ user }: { user: IUser }) => {
  return (
    <div>
      <Dropdown id="user-dropdown" summary={<AvatarUser user={user}/>}>
        <span>{user.nickname || user.username}</span>
        <button>Выйти</button>
      </Dropdown>
    </div>
  );
};
