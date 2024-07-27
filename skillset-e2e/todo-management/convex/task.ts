import { mutation } from './_generated/server';
import { v } from 'convex/values';

export const create = mutation({
  args: {
    title: v.string(),
    description: v.string(),
    priorityId: v.string(),
    categoryIds: v.array(v.string()),
  },
  handler: async (ctx, args) => {
    const userId = await ctx.auth.getUserIdentity();

    if (!userId) throw new Error('unauthenticated');

    const statuses = await ctx.db
      .query('statuses')
      .filter((q) => q.eq(q.field('value'), 'pending'))
      .collect();

    const status = statuses[0];

    if (!status) throw new Error('status not found');

    const newTask = ctx.db.insert('tasks', {
      userId: userId,
      title: args.title,
      description: args.description,
      categoryIds: args.categoryIds,
      priorityId: args.priorityId,
      statusId: status._id,
    });

    return newTask;
  },
});
