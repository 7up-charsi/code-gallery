import { defineSchema, defineTable } from 'convex/server';
import { v } from 'convex/values';

export default defineSchema({
  push_notifications: defineTable({
    subscription: v.any(),
  }),
});
