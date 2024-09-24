import { portfolio } from '@repo/meta';
import Link from 'next/link';

export default function LandingPage() {
  if (!process.env.NEXT_PUBLIC_PORTFOLIO_URL)
    throw new Error('NEXT_PUBLIC_PORTFOLIO_URL is not defined');

  return (
    <main className="flex h-screen flex-col items-center justify-center p-5 md:px-8">
      <h1 className="text-muted-12 text-center text-3xl font-bold uppercase">
        {portfolio.name}
      </h1>

      <p className="mt-5 text-lg font-medium">{portfolio.tagline}</p>

      <p className="mt-10 text-balance text-center">
        To view my skills, please visit my{' '}
        <Link
          href={process.env.NEXT_PUBLIC_PORTFOLIO_URL}
          target="_blank"
          rel="noopner noreferrer"
          className="hover:text-muted-12 uppercase underline transition-colors hover:underline-offset-4"
        >
          portfolio
        </Link>
      </p>
    </main>
  );
}
