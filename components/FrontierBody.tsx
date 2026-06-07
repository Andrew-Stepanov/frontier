interface FrontierBodyProps {
  html: string;
}

/** SSR-рендер BEM-разметки из design-system (1:1 с frontier-global-ds) */
export function FrontierBody({ html }: FrontierBodyProps) {
  return (
    <div
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
