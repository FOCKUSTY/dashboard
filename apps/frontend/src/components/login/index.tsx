import { FC } from "react";

import { IUser } from "types/user.type";

import { User } from "./user";
import { SignUp } from "./sing-up";

type Props = {
  user?: IUser | null;
};

export const LogIn: FC<Props> = ({ user }) => {
  return user ? <User user={user} key={user.id} /> : <SignUp />;
};
