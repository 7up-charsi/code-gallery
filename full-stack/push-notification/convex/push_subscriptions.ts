import { mutation, query } from './_generated/server';
import { ConvexError, v } from 'convex/values';
import { subscriptionSchema } from './schema';
import { Doc } from './_generated/dataModel';
import { internal } from './_generated/api';

export const getAllSubscriptions = query({
  handler: async (ctx) => {
    return await ctx.db.query('push_subscriptions').collect();
  },
});

export const getSubscription = query({
  args: {
    id: v.id('push_subscriptions'),
  },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id);
  },
});

export const isSubscribed = query({
  args: {
    endpoint: v.string(),
  },
  handler: async (ctx, args) => {
    const doc = await ctx.db
      .query('push_subscriptions')
      .filter((q) =>
        q.eq(q.field('subscription.endpoint'), args.endpoint),
      )
      .first();

    return {
      success: true,
      subscribed: !!doc,
    };
  },
});

export const subscribe = mutation({
  args: { subscription: subscriptionSchema },
  handler: async (ctx, args) => {
    const id = await ctx.db.insert('push_subscriptions', {
      subscription: args.subscription,
    });

    await ctx.scheduler.runAfter(
      60 * 1000,
      internal.actions.sendNotification,
      { id, reschedule: 1 },
    );

    return {
      success: true,
      message: 'push-subscription subscribed successful',
    };
  },
});

export const unsubscribe = mutation({
  args: {
    id: v.optional(v.id('push_subscriptions')),
    endpoint: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    try {
      let doc: Doc<'push_subscriptions'> | null = null;

      if (args.endpoint) {
        doc = await ctx.db
          .query('push_subscriptions')
          .filter((q) =>
            q.eq(q.field('subscription.endpoint'), args.endpoint),
          )
          .first();
      } else if (args.id) {
        doc = await ctx.db.get(args.id);
      }

      if (!doc) {
        return {
          success: false,
          error_type: 'not_found',
          message: 'no subscription found',
        };
      }

      await ctx.db.delete(doc._id);

      return {
        success: true,
        message: 'push-subscription unsubscription successful',
      };
    } catch (error) {
      console.log(error);

      return {
        success: false,
        message: 'push-subscription unsubscription failed',
      };
    }
  },
});
