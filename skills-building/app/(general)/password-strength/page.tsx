import { Input } from './__components/input';

export default function Home() {
  return (
    <main className="p-5">
      <article className="mx-auto w-full max-w-sm rounded border border-muted-6 p-5 shadow-md">
        <Input />

        <div className="mt-5">
          <h2 className="font-medium capitalize text-muted-12">
            Create a Strong Password
          </h2>

          <ul className="mt-2 space-y-2">
            <li>
              <span className="mr-2 font-medium text-muted-12">
                Length:
              </span>
              <span>Minimum 12 characters</span>
            </li>
            <li>
              <span className="mr-2 font-medium text-muted-12">
                Mix Case:
              </span>
              <span>Combine uppercase and lowercase letters</span>
            </li>
            <li>
              <span className="mr-2 font-medium text-muted-12">
                Alternate Case:
              </span>
              <span>
                Include at least one occurrence of a lowercase letter
                followed by an uppercase letter or vice versa
              </span>
            </li>
            <li>
              <span className="mr-2 font-medium text-muted-12">
                Numbers:
              </span>
              <span>Include at least two numbers</span>
            </li>
            <li>
              <span className="mr-2 font-medium text-muted-12">
                Special Characters:
              </span>
              <span>
                Include at least two special characters (e.g., !, @,
                #, $, etc.)
              </span>
            </li>
            <li>
              <span className="mr-2 font-medium text-muted-12">
                No Sequences:
              </span>
              <span>
                Avoid using sequential characters (e.g.,
                &quot;abc&quot;, &quot;123&quot;)
              </span>
            </li>
            <li>
              <span className="mr-2 font-medium text-muted-12">
                Unique:
              </span>
              <span>Use a unique password</span>
            </li>
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
