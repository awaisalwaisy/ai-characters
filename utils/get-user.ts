import type { AuthUserResponse } from "~/@types/application";

export type kindeUser = {
  getUserProfile: () => Promise<AuthUserResponse>;
};

export const getUser = async (kinde: kindeUser): Promise<AuthUserResponse> => {
  const user: AuthUserResponse = await kinde.getUserProfile();

  return user;
};
