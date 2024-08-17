self.addEventListener('push', function (event) {
  const payload = event.data.json();
  event.waitUntil(
    self.registration.showNotification(payload.title, {
      body: payload.text,
      icon: payload.icon,
      badge: payload.badge,
      vibrate: payload.vibration,
      tag: payload.tag,
    })
  );
});
