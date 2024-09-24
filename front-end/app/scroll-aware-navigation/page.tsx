import { SkillLandingCard } from '@/components/skill-landing-card';
import { siteConfig } from './site.config';

export default function SkillLandingPage() {
  return (
    <main className="bg-muted-1 flex min-h-screen items-center justify-center p-5 md:px-8">
      <SkillLandingCard {...siteConfig} />
    </main>
  );
}
