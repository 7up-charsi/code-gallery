import { api } from './_generated/api';
import { mutation, query } from './_generated/server';
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
        q.eq(q.field('subscription.endpoint'), args.endpoint)
      )
      .first();
  },
});

export const subscribe = mutation({
  args: { subscription: v.any() },
  handler: async (ctx, args) => {
    try {
      const doc = await ctx.db
        .query('push_notifications')
        .filter((q) =>
          q.eq(
            q.field('subscription.endpoint'),
            args.subscription.endpoint
          )
        )
        .first();

      if (doc) {
        await ctx.db.patch(doc._id, {
          subscription: args.subscription,
        });
      } else {
        await ctx.db.insert('push_notifications', {
          subscription: args.subscription,
        });
      }

      await ctx.scheduler.runAfter(
        +process.env.UNSUBSCRIBE_MS!,
        api.push_notification.unsubscribe,
        { endpoint: doc?.subscription.endpoint }
      );

      return { success: true };
    } catch (error) {
      console.log(error);

      return {
        success: false,
        message: 'push notification subscription failed',
      };
    }
  },
});

export const unsubscribe = mutation({
  args: { endpoint: v.string() },
  handler: async (ctx, args) => {
    try {
      const doc = await ctx.db
        .query('push_notifications')
        .filter((q) =>
          q.eq(q.field('subscription.endpoint'), args.endpoint)
        )
        .first();

      if (!doc) {
        return { success: false, message: 'no subscription found' };
      }

      await ctx.db.delete(doc._id);

      return { success: true };
    } catch (error) {
      console.log(error);

      return {
        success: false,
        message: 'push notification unsubscription failed',
      };
    }
  },
});

export const deleteSubscription = mutation({
  args: { _id: v.id('push_notifications') },
  handler: async (ctx, args) => {
    try {
      const doc = await ctx.db.get(args._id);

      if (!doc) {
        return { success: false, message: 'no subscription found' };
      }

      await ctx.db.delete(args._id);

      return { success: true };
    } catch (error) {
      console.log(error);

      return {
        success: false,
        message: 'push notification unsubscription failed',
      };
    }
  },
});
