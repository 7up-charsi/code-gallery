import { defineSchema, defineTable } from 'convex/server';
import { v } from 'convex/values';

const schema = defineSchema({
  priorities: defineTable({
    value: v.string(),
  }),
  statuses: defineTable({
    value: v.string(),
  }),
  categories: defineTable({
    value: v.string(),
  }),
  tasks: defineTable({
    userId: v.id('users'),
    title: v.string(),
    description: v.string(),
    categoryIds: v.array(v.id('categories')),
    priorityId: v.id('priorities'),
    statusId: v.id('statuses'),
  }),
});

export default schema;
