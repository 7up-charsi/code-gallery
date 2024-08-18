'use client';

import { api } from '@/convex/_generated/api';
import { Id } from '@/convex/_generated/dataModel';
import { Switch } from '@typeweave/react/switch';
import { useQuery } from 'convex/react';
import { Loader2Icon } from 'lucide-react';
import React from 'react';
import { toast } from 'react-toastify';

interface PushNotificationProps {}

const displayName = 'PushNotification';

export const PushNotification = (props: PushNotificationProps) => {
  const {} = props;

  const switchRef = React.useRef<HTMLInputElement>(null);
  const labelId = React.useId();

  const [disabled, setDisabled] = React.useState(true);
  const [subscribed, setSubscribed] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [id, setId] = React.useState<Id<'push_notifications'> | null>(
    null
  );

  const query = useQuery(api.push_notification.getSubsWIthId, { id });

  const subscribe = async () => {
    try {
      setLoading(true);
      setDisabled(true);

      const registeration = await navigator.serviceWorker.ready;

      const res = await fetch(
        'https://befitting-squid-96.convex.site/vapid-public-key'
      );

      const data = (await res.json()) as {
        vapidPublicKey: string;
      } | null;

      if (!data || !data.vapidPublicKey) {
        toast.error('vapid key is not defined');
        return;
      }

      const { vapidPublicKey } = data;

      const subscription = await registeration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: vapidPublicKey,
      });

      const subRes = await fetch(
        'https://befitting-squid-96.convex.site/subscribe',
        {
          method: 'POST',
          body: JSON.stringify({ subscription }),
          headers: {
            'Content-type': 'application/json',
          },
        }
      );

      const subData = await subRes.json();

      if (!subData || !subData.success) {
        toast.error('push notification subscription failed');
        return;
      }

      setSubscribed(true);
      setDisabled(false);
      setLoading(false);
      setId(subData.id);

      toast.success('successfuly subscribed push notifications');
    } catch (error) {
      setLoading(false);
      setDisabled(false);

      toast.error('Something went wrong...!');

      console.log(error);
    }
  };

  const unsubscribe = async () => {
    try {
      setLoading(true);
      setDisabled(true);

      const registeration = await navigator.serviceWorker.ready;

      const subscription =
        await registeration.pushManager.getSubscription();

      if (subscription) {
        subscription.unsubscribe();

        const res = await fetch(
          'https://befitting-squid-96.convex.site/unsubscribe',
          {
            method: 'POST',
            body: JSON.stringify({ id }),
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );

        const data = await res.json();

        if (!data || !data.success) {
          toast.error('push notifications unsubscription failed');
          return;
        }

        setSubscribed(false);
        setDisabled(false);
        setLoading(false);
        setId(null);

        toast.success('successfuly unsubscribed push notifications');
      }
    } catch (error) {
      setLoading(false);
      setDisabled(false);

      toast.error('Something went wrong...!');

      console.log(error);
    }
  };

  React.useEffect(() => {
    if (query && !query.subscription) {
      (async () => {
        const registeration = await navigator.serviceWorker.ready;

        const subscription =
          await registeration.pushManager.getSubscription();

        subscription?.unsubscribe();
        setSubscribed(false);
        setId(null);
      })();
    }
  }, [query]);

  React.useEffect(() => {
    navigator.serviceWorker.register('/sw.js', { scope: '/' });

    (async () => {
      const registeration = await navigator.serviceWorker.ready;

      const subscription =
        await registeration.pushManager.getSubscription();

      if (subscription) {
        const res = await fetch(
          'https://befitting-squid-96.convex.site/subscription',
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              endpoint: subscription?.endpoint,
            }),
          }
        );

        const data = await res.json();

        if (data.id) {
          setSubscribed(true);
          setId(data.id);
        } else {
          setSubscribed(false);
          setId(null);
          subscription.unsubscribe();
        }
      } else {
        setSubscribed(false);
      }

      setDisabled(false);
    })();
  }, []);

  return (
    <div className='flex items-center gap-2'>
      <label htmlFor={labelId} className='sr-only'>
        push notifications
      </label>

      {!loading ? null : <Loader2Icon className='animate-spin' />}

      <Switch
        id={labelId}
        ref={switchRef}
        size='sm'
        checked={subscribed}
        disabled={disabled}
        onChange={async (e) => {
          const checked = e.target.checked;

          if (checked) {
            const isPermitted =
              await Notification.requestPermission();

            if (isPermitted === 'granted') {
              subscribe();
            }

            if (isPermitted === 'denied') {
              unsubscribe();
            }
          } else {
            unsubscribe();
          }
        }}
      />
    </div>
  );
};

PushNotification.displayName = displayName;
