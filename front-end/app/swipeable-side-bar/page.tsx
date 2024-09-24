import { SkillLandingCard } from '@/components/skill-landing-card';
import { createMetadata } from '@/utils/metadata';
import { siteConfig } from './site.config';
import { Metadata } from 'next';

export const metadata: Metadata = createMetadata(siteConfig);

export default function SkillLandingPage() {
  return (
    <main className="bg-muted-1 flex min-h-screen items-center justify-center p-5 md:px-8">
      <SkillLandingCard {...siteConfig} />
    </main>
  );
}
