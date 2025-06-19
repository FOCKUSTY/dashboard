export interface ICreateUser {
  username: string;
  created_at: string
}

export interface IUser {
  id: string;

  username: string;
  nickname: string;

  avatar_url: string;

  created_at: string
};