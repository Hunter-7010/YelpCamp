import { router, publicProcedure } from "../trpc";
import { z } from "zod";
// import { PrismaClient } from "@prisma/client";

// const prisma = new PrismaClient();
export const exampleRouter = router({
  hello: publicProcedure
    .input(z.object({ text: z.string().nullish() }).nullish())
    .query(({ input }) => {
      return {
        greeting: `Hello ${input?.text ?? "world"}`,
      };
    }),
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.example.findMany();
  }),
  all: publicProcedure.query(async ({ctx}) =>{
    const all = await ctx.prisma.example.findMany();
    return all
  })
});
