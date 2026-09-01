import {
  type RouteConfig,
  index,
  route,
} from "@react-router/dev/routes";

export default [
  index("./routes/home.tsx"),

  route(
    "catalog",
    "./routes/catalog.tsx",
  ),

  route(
    "catalog/:id",
    "./routes/wine-details.tsx",
  ),

  route(
    "about",
    "./routes/about.tsx",
  ),

  route(
    "history",
    "./routes/history.tsx",
  ),

  route(
    "quiz",
    "./routes/quiz.tsx",
  ),

  route(
    "auth",
    "./routes/auth.tsx",
  ),
  
  route(
    "profile",
    "./routes/profile.tsx",
  ),

  route(
    "catalog/:id/review",
    "./routes/write-review.tsx",
  ),

  route(
    "catalog/:id/review/edit",
    "./routes/edit-review.tsx",
  ),
  
] satisfies RouteConfig;