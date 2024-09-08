import { mutation, query } from './_generated/server';
import { v } from 'convex/values';

export const create = mutation({
  args: { value: v.string() },
  handler: async (ctx, args) => {
    const newCategory = await ctx.db.insert('categories', {
      value: args.value,
    });

    return newCategory;
  },
});

export const categories = query({
  handler: async (ctx) => {
    const data = await ctx.db.query('categories').collect();

    return data;
  },
});
