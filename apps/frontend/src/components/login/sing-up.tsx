import { IoLogInSharp } from "react-icons/io5";

import { Api } from "api";

export const SignUp = () => {
  return (
    <div>
      <a href={Api.auth_url} target="_self">
        <IoLogInSharp  size={36} />
      </a>
    </div>
  );
};
