import { query } from "./_generated/server"
import { v } from "convex/values"

export const getCountries = query({
  handler: async ctx => {
    const countries = await ctx.db.query("gradingSystems").collect()

    return countries
  },
})

export const getSpecificCountry = query({
  args: { countryId: v.optional(v.id("gradingSystems")) },
  handler: async (ctx, args) => {
    const country = await ctx.db
      .query("gradingSystems")
      .filter(q => q.eq(q.field("_id"), args.countryId))
      .first()

    return country
  },
})

export const getGradingSystem = query({
  args: { countryId: v.optional(v.id("gradingSystems")) },
  handler: async (ctx, args) => {
    const country = await ctx.db
      .query("gradingSystems")
      .filter(q => q.eq(q.field("_id"), args.countryId))
      .first()

    return country?.gradingSystem
  },
})
