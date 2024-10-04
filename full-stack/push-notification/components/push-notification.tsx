'use client';

import { useConvex, useMutation } from 'convex/react';
import { Doc } from '@/convex/_generated/dataModel';
import { Switch } from '@typeweave/react/switch';
import { api } from '@/convex/_generated/api';
import { Loader2Icon } from 'lucide-react';
import { toast } from 'react-toastify';
import React from 'react';

interface PushNotificationProps {}

const displayName = 'PushNotification';

export const PushNotification = (props: PushNotificationProps) => {
  const {} = props;

  const switchRef = React.useRef<HTMLInputElement>(null);
  const labelId = React.useId();

  const [subscribed, setSubscribed] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);

  const subscribeMutation = useMutation(
    api.push_subscriptions.subscribe,
  );

  const unsubscribeMutation = useMutation(
    api.push_subscriptions.unsubscribe,
  );

  const convexClient = useConvex();

  const subscribe = async () => {
    if (!process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY)
      throw new Error('VAPID_PUBLIC_KEY is not defined');

    try {
      setIsLoading(true);

      const registeration = await navigator.serviceWorker.ready;

      const subscription = await registeration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey:
          process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY,
      });

      const { success, message } = await subscribeMutation({
        subscription:
          subscription.toJSON() as Doc<'push_subscriptions'>['subscription'],
      });

      if (!success) throw new Error(message);

      setSubscribed(true);
      setIsLoading(false);

      toast.success('successfuly subscribed push notifications');
    } catch (error) {
      setIsLoading(false);

      toast.error(
        'Something went wrong while subscribing push notifications',
      );
    }
  };

  const unsubscribe = async () => {
    try {
      setIsLoading(true);

      const registeration = await navigator.serviceWorker.ready;

      const subscription =
        await registeration.pushManager.getSubscription();

      if (!subscription) return;

      const { message, success, error_type } =
        await unsubscribeMutation({
          endpoint: subscription.endpoint,
        });

      if (!success && error_type !== 'not_found')
        throw new Error(message);

      subscription.unsubscribe();

      setSubscribed(false);
      setIsLoading(false);

      toast.success('push notifications unsubscribed successfully');
    } catch (error) {
      setIsLoading(false);

      toast.error(
        'Something went wrong while unsubscribing push notifications',
      );
    }
  };

  React.useEffect(() => {
    navigator.serviceWorker.register('/sw.js', { scope: '/' });

    (async () => {
      const registeration = await navigator.serviceWorker.ready;

      const subscription =
        await registeration.pushManager.getSubscription();

      if (!subscription) {
        setSubscribed(false);
        setIsLoading(false);
        return;
      }

      const { success, subscribed } = await convexClient.query(
        api.push_subscriptions.isSubscribed,
        { endpoint: subscription.endpoint },
      );

      if (!success) {
        setIsLoading(false);
        setSubscribed(false);
        toast.error('failed to check subscription');
        return;
      }

      if (subscribed) {
        setSubscribed(true);
      } else {
        setSubscribed(false);
        subscription.unsubscribe();
      }

      setIsLoading(false);
    })();
  }, [convexClient]);

  return (
    <div className="flex items-center gap-2">
      {!isLoading ? null : <Loader2Icon className="animate-spin" />}

      <Switch
        id={labelId}
        ref={switchRef}
        size="sm"
        checked={subscribed}
        disabled={isLoading}
        onChange={async (e) => {
          const checked = e.target.checked;

          if (!checked) {
            unsubscribe();
            return;
          }

          const isPermitted = await Notification.requestPermission();

          if (isPermitted === 'granted') {
            subscribe();
          }

          if (isPermitted === 'denied') {
            unsubscribe();
          }
        }}
      />
    </div>
  );
};

PushNotification.displayName = displayName;
