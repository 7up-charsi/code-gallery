'use client';

import { Button } from '@typeweave/react/button';
import { Switch } from '@typeweave/react/switch';
import React from 'react';

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

      const res = await fetch('/vapidPublicKey');
      const data = (await res.json()) as {
        vapidPublicKey: string;
      } | null;

      if (!data) throw new Error('vapid key is not defined');

      const { vapidPublicKey } = data;

      const subscription = await registeration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: vapidPublicKey,
      });

      const registerRes = await fetch('/register', {
        method: 'post',
        body: JSON.stringify({ subscription }),
        headers: {
          'Content-type': 'application/json',
        },
      });

      const registerData = await registerRes.json();

      if (!registerData)
        throw new Error('push notification subscription failed');

      setSubscribed(true);
      setDisabled(false);

      console.log('successfuly subscribed push notifications');
    } catch (error) {
      setLoading(false);
      setDisabled(false);

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

        const res = await fetch('/unregister', {
          method: 'POST',
          body: JSON.stringify({ subscription }),
          headers: {
            'Content-Type': 'application/json',
          },
        });

        const data = await res.json();

        if (!data)
          throw new Error('push notifications unsubscription failed');

        setSubscribed(false);
        setDisabled(false);

        console.log('successfuly unsubscribed push notifications');
      }
    } catch (error) {
      setLoading(false);
      setDisabled(false);

      console.log(error);
    }
  };

  React.useEffect(() => {
    navigator.serviceWorker.register(
      '/service-workers/push-notification.js',
      { scope: '/' },
    );

    navigator.serviceWorker.ready
      .then((registeration) => {
        setDisabled(false);

        return registeration.pushManager.getSubscription();
      })
      .then((subscription) => {
        if (subscription) {
          setSubscribed(true);
        } else {
          setSubscribed(false);
        }
      });
  }, []);

  return (
    <>
      <Switch
        ref={switchRef}
        label="push notifications"
        size="sm"
        checked={subscribed}
        disabled={disabled}
        onChange={async (e) => {
          const checked = e.target.checked;

          if (checked) {
            subscribe();
          } else {
            unsubscribe();
          }

          // if (checked) {
          //   const isPermitted =
          //     await Notification.requestPermission();

          //   if (isPermitted === 'granted') {
          //   }

          //   if (isPermitted === 'denied') {
          //   }
          // }
        }}
      />
    </>
  );
};

PushNotification.displayName = displayName;
