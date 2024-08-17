import { cronJobs } from 'convex/server';
import { internal } from './_generated/api';

const crons = cronJobs();

crons.interval(
  'clear messages table',
  { minutes: 1 }, // every minute
  internal.actions.sendNotification
);

export default crons;
