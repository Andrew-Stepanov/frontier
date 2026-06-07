export interface NavLink {
  label: string;
  href: string;
}

export interface Cta {
  label: string;
  href: string;
}

export interface PageMeta {
  title: string;
  description: string;
  canonical?: string;
  ogImage?: string;
  keywords?: string[];
}

export interface PageHeader {
  logo: string;
  logoHref?: string;
  nav: NavLink[];
  cta: Cta;
}

export interface PageFooter {
  links?: NavLink[];
  copyright: string;
}

export interface FaqItem {
  question: string;
  answerHtml: string;
}

export interface FaqBlock {
  type: 'faq';
  id: string;
  title: string;
  items: FaqItem[];
}

export interface PageBlock {
  type: string;
  id: string;
  [key: string]: unknown;
}

export interface PageContent {
  meta: PageMeta;
  header: PageHeader;
  blocks: PageBlock[];
  footer: PageFooter;
}
