// src/server/router/_app.ts
import { router } from "../trpc";
import { authRouter } from "./auth";

import { exampleRouter } from "./example";
import { campgroundRouter } from "./campgrounds";

export const appRouter = router({
  example: exampleRouter,
  campground : campgroundRouter,
  auth: authRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
