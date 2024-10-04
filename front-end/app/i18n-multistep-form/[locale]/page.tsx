import { SkillLandingPageContent } from '@repo/ui/skill-landing-page-content';
import { siteConfig } from '../site.config';

export default function SkillLandingPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  return (
    <main className="bg-muted-1 flex min-h-screen items-center justify-center p-5 md:px-8">
      <SkillLandingPageContent
        {...siteConfig}
        pathname={`${siteConfig.pathname.replace(/\/+$/, '')}/${locale}`}
      />
    </main>
  );
}
