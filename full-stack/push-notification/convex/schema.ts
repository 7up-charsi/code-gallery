import { defineSchema, defineTable } from 'convex/server';
import { v } from 'convex/values';

export const subscriptionSchema = v.object({
  endpoint: v.string(),
  expirationTime: v.union(v.number(), v.null()),
  keys: v.object({
    auth: v.string(),
    p256dh: v.string(),
  }),
});

export default defineSchema({
  push_subscriptions: defineTable({
    subscription: subscriptionSchema,
  }),
});
