import { SkillLandingPageContent } from '@repo/ui/skill-landing-page-content';
import { siteConfig } from '@/site.config';

export default function SkillLandingPage() {
  return <SkillLandingPageContent pathname="/" {...siteConfig} />;
}
