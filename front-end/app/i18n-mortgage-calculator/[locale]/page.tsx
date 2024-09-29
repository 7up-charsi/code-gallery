import { SkillLandingCard } from '@/components/skill-landing-card';
import { siteConfig } from '../site.config';

export default function SkillLandingPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  return (
    <main className="bg-muted-1 flex min-h-screen items-center justify-center p-5 md:px-8">
      <SkillLandingCard
        {...siteConfig}
        pathname={`${siteConfig.pathname.replace(/\/+$/, '')}/${locale}`}
      />
    </main>
  );
}
