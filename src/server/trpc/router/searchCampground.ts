import { router, publicProcedure } from "../trpc";
import { z } from "zod";

export const searchCampground = router({
  getBySearchTerm: publicProcedure
    .input(
      z.object({
        searchTerm: z.any(),
      })
    )
    .query(async ({ input,ctx }) => {
      const client = await ctx.clientPromise;
      const db = client.db("YelpCamp");
      // const camps = await db.collection("Camp").find({}).toArray()
      const camps = await db
        .collection("Camp")
        .aggregate([
          {
            $search: {
              index: "camps",
              text: {
                query: input.searchTerm!=="" ? input.searchTerm:"camp",
                path: {
                  wildcard: "*",
                },
                fuzzy: {},
              },
            },
          },
        ])
        .toArray();
        
      return camps;
    }),
    sort: publicProcedure 
    .input(z.object({
        by: z.string()
    }))
    .query(async ({input,ctx}) =>{
        if(input.by == "review" || "price" || "createdAt"){
            const param = input.by
            const client = await ctx.clientPromise;
            const db = client.db("YelpCamp");
            const sortedCamp = await db
            .collection("Camp")
            .aggregate([
                {
                 $sort : { [param]: -1 } 
                },
              ])
              .toArray();
            return sortedCamp
        }
        else{
            return null
        }
        
    })
});
