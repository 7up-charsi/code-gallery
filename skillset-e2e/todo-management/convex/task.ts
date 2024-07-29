import { paginationOptsValidator } from 'convex/server';
import { prioritySchema, statusSchema } from './schema';
import { mutation, query } from './_generated/server';
import { v } from 'convex/values';
import Fuse from 'fuse.js';

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
  args: {
    query: v.string(),
  },
  handler: async (ctx, args) => {
    const tasks = await ctx.db.query('tasks').collect();

    const populated = await Promise.all(
      tasks.map(async (ele) => {
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

    if (args.query) {
      const fuse = new Fuse(populated, {
        keys: ['title', 'description', 'categories.value'],
      });

      const searched = fuse.search(args.query);

      return searched.map((ele) => ele.item);
    }

    return populated;
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
