// src/server/router/_app.ts
import { router } from "../trpc";
import { authRouter } from "./auth";

import { exampleRouter } from "./example";
import { campgroundRouter } from "./campgrounds";
import {searchCampground} from "./searchCampground"

export const appRouter = router({
  example: exampleRouter,
  campground : campgroundRouter,
  auth: authRouter,
  searchCampground: searchCampground
});

// export type definition of API
export type AppRouter = typeof appRouter;
