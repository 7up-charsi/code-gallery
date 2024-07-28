import { mutation } from './_generated/server';
import { prioritySchema } from './schema';
import { v } from 'convex/values';

export const create = mutation({
  args: {
    title: v.string(),
    description: v.string(),
    priority: prioritySchema,
    categories: v.array(v.id('categories')),
  },
  handler: async (ctx, args) => {
    const userId = await ctx.auth.getUserIdentity();

    if (!userId) throw new Error('unauthenticated');

    const newTask = ctx.db.insert('tasks', {
      userId: userId.subject,
      title: args.title,
      description: args.description,
      categories: args.categories,
      priority: args.priority,
      status: 'pending',
    });

    return newTask;
  },
});
