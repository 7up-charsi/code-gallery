import { mutation, query } from './_generated/server';
import { api } from './_generated/api';
import { v } from 'convex/values';

export const subscriptions = query({
  handler: async (ctx) => {
    return await ctx.db.query('push_notifications').collect();
  },
});

export const subscription = query({
  args: {
    endpoint: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db
      .query('push_notifications')
      .filter((q) =>
        q.eq(q.field('subscription.endpoint'), args.endpoint),
      )
      .first();
  },
});

export const getSubsWIthId = query({
  args: {
    id: v.union(v.id('push_notifications'), v.null()),
  },
  handler: async (ctx, args) => {
    if (!args.id) return;

    return await ctx.db.get(args.id);
  },
});

export const subscribe = mutation({
  args: { subscription: v.any() },
  handler: async (ctx, args) => {
    try {
      const id = await ctx.db.insert('push_notifications', {
        subscription: args.subscription,
      });

      const schedulerId = await ctx.scheduler.runAfter(
        +process.env.UNSUBSCRIBE_MS! ?? 600000, // 10 minutes
        api.push_notification.schedualUnsubscribe,
        { id },
      );

      await ctx.db.patch(id, { schedulerId });

      return { id, success: true };
    } catch (error) {
      console.log(error);

      return {
        success: false,
        message: 'push notification subscription failed',
      };
    }
  },
});

export const schedualUnsubscribe = mutation({
  args: { id: v.id('push_notifications') },
  handler: async (ctx, args) => {
    try {
      await ctx.db.patch(args.id, {
        subscription: undefined,
        schedulerId: undefined,
      });
    } catch (error) {
      console.log(error);
    }
  },
});

export const unsubscribe = mutation({
  args: { id: v.id('push_notifications') },
  handler: async (ctx, args) => {
    try {
      const doc = await ctx.db.get(args.id);

      if (!doc) {
        return { success: false, message: 'no subscription found' };
      }

      await ctx.db.patch(args.id, {
        subscription: undefined,
        schedulerId: undefined,
      });

      if (doc.schedulerId)
        await ctx.scheduler.cancel(doc.schedulerId);

      return { success: true, id: doc._id };
    } catch (error) {
      console.log(error);

      return {
        success: false,
        message: 'push notification unsubscription failed',
      };
    }
  },
});

export const removeUnsubscribed = mutation({
  handler: async (ctx) => {
    const unsubscribed = await ctx.db
      .query('push_notifications')
      .filter((q) => q.eq(q.field('subscription'), undefined))
      .collect();

    unsubscribed.forEach(async ({ _id }) => {
      await ctx.db.delete(_id);
      console.log('unsubscribed subscription removed ' + _id);
    });
  },
});
