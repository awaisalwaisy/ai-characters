import type { LocationQueryValue } from "vue-router";

export type RouteQuery = LocationQueryValue | LocationQueryValue[] | null;
export type ValidEmail = `${string}@${string}.${string}`;

export interface AuthUserResponse {
  id: string;
  sub: string;
  name: string;
  email: ValidEmail;
  picture: string | null;
  given_name: string;
  updated_at: number;
  family_name: string;
}
