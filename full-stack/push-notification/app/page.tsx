import { PushNotification } from '../components/push-notification';

export default function Home() {
  return (
    <main className="bg-muted-2 min-h-[calc(100vh-64px)] content-center p-5 md:px-8">
      <article
        aria-label="push notification settings"
        className="bg-background mx-auto max-w-lg rounded px-5"
      >
        <div className="border-muted-6 flex gap-2 border-b py-5">
          <span className="capitalize">push notifications</span>
          <div className="grow"></div>
          <PushNotification />
        </div>

        <div className="py-5">
          <h2 className="text-warning-11 font-medium">Warning:</h2>

          <p className="mt-2">
            Push notifications will send updates every minute for 10
            minutes. Disable when leaving to avoid excessive
            notifications.
          </p>
        </div>
      </article>
    </main>
  );
}
