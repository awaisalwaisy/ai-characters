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

export interface CloudinaryResponse {
  asset_id: string;
  public_id: string;
  version: number;
  version_id: string;
  signature: string;
  format: string;
  resource_type: string;
  created_at: string;
  type: string;
  bytes: number;
  etag: string;
  placeholder: boolean;
  url: string;
  secure_url: string;
  folder: string;
  access_mode: string;
  existing: boolean;
  original_filename: string;
}
