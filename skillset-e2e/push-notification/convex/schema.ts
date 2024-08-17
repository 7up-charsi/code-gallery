import { defineSchema, defineTable } from 'convex/server';
import { v } from 'convex/values';

export default defineSchema({
  push_notifications: defineTable({
    // subscription: v.object({
    //   endpoint: v.string(),
    //   keys: v.object({
    //     p256dh: v.string(),
    //     auth: v.string(),
    //   }),
    // }),
    subscription: v.any(),
  }),
});
