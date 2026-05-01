import { ImgHTMLAttributes } from "react";
import type { ResponsiveImageSource } from "@/assets/optimized";

interface ResponsiveImageProps extends Omit<ImgHTMLAttributes<HTMLImageElement>, "src" | "srcSet"> {
  /** Source set bundle generated in src/assets/optimized */
  source: ResponsiveImageSource;
  /** `sizes` attribute — describe how wide the image renders at each breakpoint */
  sizes: string;
  alt: string;
  /** When true, hint the browser to fetch eagerly with high priority (use for above-the-fold) */
  priority?: boolean;
}

/**
 * Renders a <picture> with AVIF → WebP → JPEG fallbacks and responsive srcset/sizes.
 * Use for any image that already has variants in `src/assets/optimized`.
 */
const ResponsiveImage = ({
  source,
  sizes,
  alt,
  priority = false,
  className,
  ...rest
}: ResponsiveImageProps) => (
  <picture>
    <source type="image/avif" srcSet={source.avif} sizes={sizes} />
    <source type="image/webp" srcSet={source.webp} sizes={sizes} />
    <img
      src={source.src}
      srcSet={source.jpg}
      sizes={sizes}
      alt={alt}
      width={source.width}
      height={source.height}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
      fetchPriority={priority ? "high" : "auto"}
      className={className}
      {...rest}
    />
  </picture>
);

export default ResponsiveImage;