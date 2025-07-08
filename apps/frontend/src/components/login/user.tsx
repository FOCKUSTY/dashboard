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
      <Dropdown summary={<AvatarUser user={user}/>}>
        <span>{user.username}</span>
      </Dropdown>
    </div>
  );
};
