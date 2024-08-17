'use node';

import webPush from 'web-push';
import { action, internalAction } from './_generated/server';
import { api } from './_generated/api';

export const vapidPublicKey = action({
  handler: () => {
    return process.env.VAPID_PUBLIC_KEY!;
  },
});

export const sendNotification = internalAction({
  handler: async (ctx) => {
    webPush.setVapidDetails(
      'https://example.com/',
      process.env.VAPID_PUBLIC_KEY!,
      process.env.VAPID_PRIVATE_KEY!
    );

    const docs = await ctx.runQuery(
      api.push_notification.subscriptions
    );

    docs.forEach(async ({ _id, subscription }) => {
      try {
        await webPush.sendNotification(
          subscription as never,
          JSON.stringify({
            title: 'Service Worker',
            text: 'Push Notification Subscription Management',
            icon: '/favicon.svg',
            badge: '/favicon.svg',
            vibrate: [100, 50, 100],
            tag: 'push-notification',
          })
        );

        console.log(
          'Push Application Server - Notification sent to ' +
            subscription.endpoint
        );
      } catch (error) {
        await ctx.runMutation(
          api.push_notification.deleteSubscription,
          { _id }
        );

        console.log(
          'ERROR in sending Notification, endpoint removed ' +
            subscription.endpoint
        );
      }
    });
  },
});