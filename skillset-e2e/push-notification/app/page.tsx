import { PushNotification } from '../components/push-notification';

export default function Home() {
  return (
    <main className="p-5 md:px-8">
      <article
        aria-label="push notification settings"
        className="mx-auto max-w-lg rounded border border-muted-6 px-5"
      >
        <div className="flex gap-2 border-b border-muted-6 py-5">
          <span className="capitalize">push notifications</span>
          <div className="grow"></div>
          <PushNotification />
        </div>

        <div className="py-5">
          <h2 className="font-medium text-muted-12">
            Important Notification Setting
          </h2>

          <p className="mt-2">
            Please note that enabling push notifications will result
            in notifications being sent to you every minute. As this
            feature is for skills building and demonstration purposes
            only, it will automatically unsubscribe you after 10
            minutes. To avoid receiving frequent notifications,
            it&apos;s recommended to keep the push notifications
            switch inactive.
          </p>
        </div>
      </article>
    </main>
  );
}
