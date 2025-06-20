export const AUTH_TYPES = ["discord"] as const;
export type AuthTypes = (typeof AUTH_TYPES)[number];

export interface ICreateAuthUser {
  profile_id: string;
  service_id: string;

  access_token: string;
  refresh_token: string;

  created_at: string;

  type: AuthTypes;
}

export interface IAuthUser {
  id: string;

  profile_id: string;
  service_id: string;

  access_token: string;
  refresh_token: string;

  created_at: string;

  type: AuthTypes;
}
