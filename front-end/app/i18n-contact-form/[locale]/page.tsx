import { SkillLandingPageContent } from '@repo/ui/skill-landing-page-content';
import { siteConfig } from '../site.config';

export default function SkillLandingPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  return (
    <SkillLandingPageContent
      {...siteConfig}
      pathname={`${siteConfig.pathname.replace(/\/+$/, '')}/${locale}`}
    />
  );
}
