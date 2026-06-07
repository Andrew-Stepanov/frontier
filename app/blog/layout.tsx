import { ClientScripts } from '@/components/ClientScripts';
import { SiteHeader } from '@/components/SiteHeader';
import '@/styles/blog.css';

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <SiteHeader />
      {children}
      <ClientScripts />
    </>
  );
}
