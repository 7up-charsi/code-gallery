'use node';

import { internalAction } from './_generated/server';
import { api, internal } from './_generated/api';
import { ConvexError, v } from 'convex/values';
import webPush from 'web-push';

export const sendNotification = internalAction({
  args: {
    id: v.id('push_subscriptions'),
    reschedule: v.number(),
  },
  handler: async (ctx, args) => {
    if (
      !process.env.VAPID_SUBJECT_EMAIL ||
      !process.env.VAPID_PRIVATE_KEY ||
      !process.env.VAPID_PUBLIC_KEY
    )
      throw new ConvexError('any VAPID detail ia not defined');

    try {
      const doc = await ctx.runQuery(
        api.push_subscriptions.getSubscription,
        { id: args.id },
      );

      if (!doc) return;

      await webPush.sendNotification(
        doc.subscription,
        JSON.stringify({
          title: 'Push Notification',
          text: 'Service Worker Push Subscription Management',
          icon: '/favicon.svg',
          badge: '/favicon.svg',
          vibrate: [100, 50, 100],
        }),
        {
          vapidDetails: {
            subject: `mailto:${process.env.VAPID_SUBJECT_EMAIL}`,
            privateKey: process.env.VAPID_PRIVATE_KEY,
            publicKey: process.env.VAPID_PUBLIC_KEY,
          },
        },
      );

      console.log(
        'Push Notification sent to ' + doc.subscription.endpoint,
      );

      const reschedule = args.reschedule;

      if (reschedule < 10) {
        await ctx.scheduler.runAfter(
          60 * 1000,
          internal.actions.sendNotification,
          {
            id: args.id,
            reschedule: reschedule + 1,
          },
        );
      }

      if (reschedule >= 10) {
        await ctx.runMutation(api.push_subscriptions.unsubscribe, {
          id: args.id,
        });
      }
    } catch (error) {
      await ctx.runMutation(api.push_subscriptions.unsubscribe, {
        id: args.id,
      });

      console.log(
        'ERROR in sending Push Notification, subscription removed ' +
          args.id,
      );

      console.error(error);
    }
  },
});
