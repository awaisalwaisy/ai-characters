export interface MessageProps {
  role: "system" | "user";
  content?: string;
  loading?: boolean;
  src?: string;
}
