/** Нативный img для absolute-холста (Next/Image добавляет wrapper и ломает stacking). */
export function CanvasImg({
  className,
  src,
  alt = '',
  width,
  height,
}: {
  className?: string;
  src: string;
  alt?: string;
  width?: number;
  height?: number;
}) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      className={className}
      src={src}
      alt={alt}
      width={width}
      height={height}
      loading="lazy"
      decoding="async"
    />
  );
}
