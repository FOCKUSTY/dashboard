import { GetServerSidePropsContext } from "next";
import { FC } from "react";

export const Page: FC = () => {
  return <div></div>;
};

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  // ...some code...
};
