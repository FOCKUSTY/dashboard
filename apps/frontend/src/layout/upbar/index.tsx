import { GetServerSidePropsContext } from "next";
import { FC } from "react";

import { IGuild, IUser } from "types/discord.types";

type Props = {
  guild: IGuild;
  user: IUser;
};

export const UpBar: FC<Props> = ({ guild, user }) => {
  return <div></div>;
};

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  // ...some code...
};
