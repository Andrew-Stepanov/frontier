import type { Metadata } from 'next';
import { JsonLd } from '@/components/JsonLd';
import { Hero } from '@/components/landing/Hero';
import { Market } from '@/components/landing/Market';
import { Benefits } from '@/components/landing/Benefits';
import { ClubOverview } from '@/components/landing/ClubOverview';
import { Forum } from '@/components/landing/Forum';
import { AISection } from '@/components/landing/AISection';
import { Offline } from '@/components/landing/Offline';
import { Founders } from '@/components/landing/Founders';
import { Pricing } from '@/components/landing/Pricing';
import { FAQ } from '@/components/landing/FAQ';
import { buildJsonLd, buildPageMetadata } from '@/lib/seo';
import { loadPageContent } from '@/lib/content';
import { getHomePage, getPagePath } from '@/lib/site';
import '../styles/landing.css';

const home = getHomePage();

export async function generateMetadata(): Promise<Metadata> {
  const content = await loadPageContent(home.contentFile);
  return buildPageMetadata(content, getPagePath(home.slug));
}

export default async function HomePage() {
  const content = await loadPageContent(home.contentFile);

  return (
    <div className="landing">
      <JsonLd data={buildJsonLd(content, getPagePath(home.slug))} />
      <main>
        <Hero />
        <Market />
        <Benefits />
        <ClubOverview />
        <Forum />
        <AISection />
        <Offline />
        <Founders />
        <Pricing />
        <FAQ />
      </main>
    </div>
  );
}
