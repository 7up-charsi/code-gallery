import { defineSchema, defineTable } from 'convex/server';
import { Id } from './_generated/dataModel';
import { v } from 'convex/values';

export default defineSchema({
  push_notifications: defineTable({
    subscription: v.optional(v.any()),
    schedulerId: v.optional(v.id('_scheduled_functions')),
  }),
});
