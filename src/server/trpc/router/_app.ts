// src/server/router/_app.ts
import { router } from "../trpc";

import { exampleRouter } from "./example";
import { campgroundRouter } from "./campgrounds";

export const appRouter = router({
  example: exampleRouter,
  campground : campgroundRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
