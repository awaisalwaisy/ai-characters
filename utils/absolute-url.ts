export const absoluteUrl = (path: string) => {
  return `${process.env.NUXT_CLIENT_URL}/${path}`;
};
