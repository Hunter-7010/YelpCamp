import { router, publicProcedure } from "../trpc";
import { z } from "zod";

// const prisma = new PrismaClient();
export const campgroundRouter = router({
  getId: publicProcedure
    .input(z.object({ text: z.string().nullish() }).nullish())
    .query(({ input }) => {
      return {
        greeting: `Hello ${input?.text ?? "world"}`,
      };
    }),
    getAll: publicProcedure.query(({ ctx }) => {
        return ctx.prisma.camp.findMany();
      }),
});