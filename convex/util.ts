import { customAction, customCtx, customMutation, customQuery } from "convex-helpers/server/customFunctions"
import { ConvexError } from "convex/values"
import { type MutationCtx, type QueryCtx, query, mutation, action } from "./_generated/server"
import { Id } from "./_generated/dataModel"
import { internal } from "./_generated/api"

export const authQuery = customQuery(
  query,
  customCtx(async ctx => {
    try {
      return { user: await getUserOrThrow(ctx) }
    } catch (err) {
      return { user: null }
    }
  })
)

export const authMutation = customMutation(
  mutation,
  customCtx(async ctx => ({ user: await getUserOrThrow(ctx) }))
)

export const authAction = customAction(
  action,
  customCtx(async (ctx) => {
    const userId = (await ctx.auth.getUserIdentity())?.subject

    if (!userId) {
      throw new ConvexError("must be logged in")
    }

    const user: any = await ctx.runQuery(internal.users.getUserById, {
      userId,
    })

    if (!user) {
      throw new ConvexError("user not found")
    }

    const _id: Id<"users"> = user._id
   
    return {
      user: {
        _id,
        userId,
      },
    }
  })
)

async function getUserOrThrow(ctx: QueryCtx | MutationCtx) {
  const userId = (await ctx.auth.getUserIdentity())?.subject

  if (!userId) {
    throw new ConvexError("must be logged in")
  }

  const user = await ctx.db
    .query("users")
    .filter(q => q.eq(q.field("subject"), userId))
    .first()

  if (!user) {
    throw new ConvexError("user not found")
  }

  return user
}
