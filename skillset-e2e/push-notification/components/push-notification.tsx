'use client';

import { Switch } from '@typeweave/react/switch';
import { Loader2Icon } from 'lucide-react';
import React from 'react';
import { toast } from 'react-toastify';

interface PushNotificationProps {}

const displayName = 'PushNotification';

export const PushNotification = (props: PushNotificationProps) => {
  const {} = props;

  const switchRef = React.useRef<HTMLInputElement>(null);

  const [disabled, setDisabled] = React.useState(true);
  const [subscribed, setSubscribed] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

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

      if (!data) {
        toast.error('vapid key is not defined');
        return;
      }

      const { vapidPublicKey } = data;

      const subscription = await registeration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: vapidPublicKey,
      });

      const registerRes = await fetch(
        'https://befitting-squid-96.convex.site/subscribe',
        {
          method: 'POST',
          body: JSON.stringify({ subscription }),
          headers: {
            'Content-type': 'application/json',
          },
        }
      );

      const registerData = await registerRes.json();

      if (!registerData) {
        toast.error('push notification subscription failed');
        return;
      }

      setSubscribed(true);
      setDisabled(false);
      setLoading(false);

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
            body: JSON.stringify({ endpoint: subscription.endpoint }),
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );

        const data = await res.json();

        if (!data) {
          toast.error('push notifications unsubscription failed');
          return;
        }

        setSubscribed(false);
        setDisabled(false);
        setLoading(false);

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
    navigator.serviceWorker.register('/sw.js', { scope: '/' });

    (async () => {
      const registeration = await navigator.serviceWorker.ready;

      setDisabled(false);
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

        if (data.subscribed) {
          setSubscribed(true);
        } else {
          setSubscribed(false);
          subscription.unsubscribe();
        }
      } else {
        setSubscribed(false);
      }
    })();
  }, []);

  return (
    <div className='flex items-center gap-2'>
      <Switch
        ref={switchRef}
        label='push notifications'
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

      {!loading ? null : <Loader2Icon className='animate-spin' />}
    </div>
  );
};

PushNotification.displayName = displayName;
