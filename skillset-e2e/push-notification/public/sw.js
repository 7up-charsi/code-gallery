self.addEventListener('push', function (event) {
  const payload = event.data.json();
  event.waitUntil(
    self.registration.showNotification(payload.title, {
      body: payload.text,
      icon: payload.icon,
      badge: payload.badge,
      vibrate: payload.vibration,
    })
  );
});

self.addEventListener('pushsubscriptionchange', function (event) {
  console.log('Subscription expired');

  event.waitUntil(
    self.registration.pushManager
      .subscribe({ userVisibleOnly: true })
      .then(function (subscription) {
        console.log(
          'Subscribed after expiration',
          subscription.endpoint
        );

        return fetch('register', {
          method: 'POST',
          headers: {
            'Content-type': 'application/json',
          },
          body: JSON.stringify({
            subscription,
          }),
        });
      })
  );
});
