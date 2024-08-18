import { cronJobs } from 'convex/server';
import { api, internal } from './_generated/api';

const crons = cronJobs();

crons.interval(
  'push notification',
  { minutes: 1 }, // every minute
  internal.actions.sendNotification
);

crons.cron(
  'remove unsubscribed',
  '0 0 * * *', // every day
  api.push_notification.removeUnsubscribed
);

export default crons;
