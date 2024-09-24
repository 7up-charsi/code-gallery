import { Input } from '../_components/input';

export default function Home() {
  return (
    <main className="p-5 md:px-8">
      <article className="mx-auto w-full max-w-lg">
        <Input />

        <div className="mt-10">
          <h2 className="text-lg font-medium capitalize">
            How to Create a Strong Password ?
          </h2>

          <ul className="mt-2 list-disc space-y-2 text-balance pl-5">
            <li>Minimum 12 characters</li>

            <li>Combine uppercase and lowercase letters</li>

            <li>
              Include at least one occurrence of a lowercase letter
              followed by an uppercase letter or vice versa
            </li>

            <li>Include at least two numbers</li>

            <li>
              Include at least two special characters (e.g., !, @, #,
              $, etc.)
            </li>

            <li>
              Avoid using sequential characters (e.g.,
              &quot;abc&quot;, &quot;123&quot;)
            </li>
            <li>Use a unique password</li>
          </ul>

          <p className="mt-5">
            By following these guidelines, you&apos;ll create a strong
            password that will help protect your privacy.
          </p>
        </div>
      </article>
    </main>
  );
}
