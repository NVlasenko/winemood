export const ROUTES = {
  home: "/",
  catalog: "/catalog",

  wineDetails: (id: number) =>
    `/catalog/${id}`,

  writeReview: (id: number) =>
    `/catalog/${id}/review`,

  about: "/about",
  history: "/history",
  quiz: "/quiz",
  auth: "/auth",
  profile: "/profile",
} as const;