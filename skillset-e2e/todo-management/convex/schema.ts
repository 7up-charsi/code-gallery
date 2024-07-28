import { defineSchema, defineTable } from 'convex/server';
import { v } from 'convex/values';

export const prioritySchema = v.union(
  v.literal('high'),
  v.literal('medium'),
  v.literal('low'),
);

export const statusSchema = v.union(
  v.literal('pending'),
  v.literal('in progress'),
  v.literal('completed'),
);

const schema = defineSchema({
  categories: defineTable({
    value: v.string(),
  }),
  tasks: defineTable({
    userId: v.string(),
    title: v.string(),
    description: v.string(),
    categories: v.array(v.id('categories')),
    priority: prioritySchema,
    status: statusSchema,
  }),
});

export default schema;
