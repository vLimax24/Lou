import { v } from 'convex/values';
import { mutation } from './_generated/server';
import { authMutation, authQuery } from './util';

export const store = mutation({
  args: {},
  handler: async ctx => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error('Called storeUser without authentication present');
    }

    // Check if we've already stored this identity before.
    const user = await ctx.db
      .query('users')
      .withIndex('by_token', q =>
        q.eq('tokenIdentifier', identity.tokenIdentifier)
      )
      .unique();
    if (user !== null) {
      if (user.name !== identity.name) {
        await ctx.db.patch(user._id, { name: identity.name });
      }
      return user._id;
    }
    // If it's a new identity, create a new `User`.
    return await ctx.db.insert('users', {
      tokenIdentifier: identity.tokenIdentifier,
      subject: identity.subject,
      email: identity.email!,
      pictureUrl: identity.pictureUrl,
      name: identity.name,
    });
  },
});

export const updateGradeSystem = authMutation({
  args: { gradeSystem: v.string() },
  handler: async ({ db, user }, { gradeSystem }) => {
    await db.patch(user._id, { gradingSystem: gradeSystem });
  },
});

export const getMyUser = authQuery({
  args: {},
  async handler(ctx) {
    return ctx.user;
  },
});
