// src/server/router/_app.ts
import { router } from "../trpc";
import { campgroundRouter } from "./campgrounds";
import {searchCampground} from "./searchCampground"

export const appRouter = router({
  campground : campgroundRouter,
  searchCampground: searchCampground
});

// export type definition of API
export type AppRouter = typeof appRouter;
