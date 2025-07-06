import { IUser } from "types/user.type";

export const User = ({ user }: { user: IUser }) => {
  return <div>{JSON.stringify(user)}</div>;
};
