import type { Metadata, Viewport } from 'next';
import { Roboto } from 'next/font/google';
import { SiteFooter } from '@/components/SiteFooter';
import { siteConfig } from '@/lib/site';
import '../styles/tokens.css';
import '../styles/style.css';
import '../styles/site-overrides.css';

const BEBAS_WOFF =
  '/assets/static_tildacdn_com/ofontru_Bebas_Neue_aed20d0a0af2.woff';

const roboto = Roboto({
  subsets: ['latin', 'cyrillic'],
  weight: ['400', '500', '700'],
  display: 'block',
  preload: true,
  adjustFontFallback: true,
  variable: '--font-roboto',
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  formatDetection: {
    telephone: false,
    email: false,
    address: false,
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: siteConfig.themeColor,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang={siteConfig.language} suppressHydrationWarning>
      <head>
        <link
          rel="preload"
          href={BEBAS_WOFF}
          as="font"
          type="font/woff"
          crossOrigin="anonymous"
        />
      </head>
      <body className={`page ${roboto.className} ${roboto.variable}`}>
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
