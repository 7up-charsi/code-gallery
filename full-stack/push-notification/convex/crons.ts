import { api, internal } from './_generated/api';
import { cronJobs } from 'convex/server';

const crons = cronJobs();

crons.interval(
  'push notification',
  { minutes: 1 }, // every minute
  internal.actions.sendNotification,
);

crons.cron(
  'remove unsubscribed',
  '0 0 * * *', // every day
  api.push_notification.removeUnsubscribed,
);

export default crons;
