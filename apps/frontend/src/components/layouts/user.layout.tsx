import { LogIn } from "components/login";
import { Logo } from "components/logo";

import type { IUser } from "types/user.type";

type Props = {
  user: IUser|null;
  children: React.ReactNode;
}

export const UserLayout = ({ children, user }: Props) => {
  return (
    <>
      <header>
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

export default UserLayout;
