import { paginationOptsValidator } from 'convex/server';
import { prioritySchema, statusSchema } from './schema';
import { mutation, query } from './_generated/server';
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

export const tasks = query({
  args: { paginationOpts: paginationOptsValidator },
  handler: async (ctx, args) => {
    const results = await ctx.db
      .query('tasks')
      .paginate(args.paginationOpts);

    const page = await Promise.all(
      results.page.map(async (ele) => {
        const categories = await Promise.all(
          ele.categories.map(async (id) => await ctx.db.get(id)),
        );

        return {
          ...ele,
          categories: categories.filter(Boolean) as NonNullable<
            (typeof categories)[number]
          >[],
        };
      }),
    );

    return {
      ...results,
      page,
    };
  },
});

export const get = query({
  args: { _id: v.id('tasks') },
  handler: async (ctx, args) => {
    const task = await ctx.db.get(args._id);

    if (!task) throw new Error('task not found');

    const categories = await Promise.all(
      task.categories.map(async (id) => await ctx.db.get(id)),
    );

    return {
      ...task,
      categories: categories.filter(Boolean) as NonNullable<
        (typeof categories)[number]
      >[],
    };
  },
});

export const patch = mutation({
  args: {
    _id: v.id('tasks'),
    title: v.string(),
    description: v.string(),
    priority: prioritySchema,
    status: statusSchema,
    categories: v.array(v.id('categories')),
  },
  handler: async (ctx, args) => {
    const task = await ctx.db.get(args._id);

    if (!task) throw new Error('task not found');

    await ctx.db.patch(args._id, {
      categories: args.categories,
      description: args.description,
      priority: args.priority,
      status: args.status,
      title: args.title,
    });
  },
});

export const _delete = mutation({
  args: { _id: v.id('tasks') },
  handler: async (ctx, args) => {
    const task = await ctx.db.get(args._id);

    if (!task) throw new Error('task not found');

    await ctx.db.delete(args._id);
  },
});

export const complete = mutation({
  args: {
    _id: v.id('tasks'),
  },
  handler: async (ctx, args) => {
    const task = await ctx.db.get(args._id);

    if (!task) throw new Error('task not found');

    await ctx.db.patch(args._id, {
      status: 'completed',
    });
  },
});

export const started = mutation({
  args: {
    _id: v.id('tasks'),
  },
  handler: async (ctx, args) => {
    const task = await ctx.db.get(args._id);

    if (!task) throw new Error('task not found');

    await ctx.db.patch(args._id, {
      status: 'started',
    });
  },
});
