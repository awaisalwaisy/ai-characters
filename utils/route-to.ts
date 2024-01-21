import type { Route } from "~/@types/application";

export const routeTo = (path: Route) => {
  const router = useRouter();
  router.push(path);
};
