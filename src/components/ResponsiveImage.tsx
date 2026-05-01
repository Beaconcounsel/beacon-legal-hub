import { forwardRef, ImgHTMLAttributes } from "react";
import type { ResponsiveImageSource } from "@/assets/optimized";

interface ResponsiveImageProps extends Omit<ImgHTMLAttributes<HTMLImageElement>, "src" | "srcSet"> {
  /** Source set bundle generated in src/assets/optimized */
  source: ResponsiveImageSource;
  /** `sizes` attribute — describe how wide the image renders at each breakpoint */
  sizes: string;
  alt: string;
  /** When true, hint the browser to fetch eagerly with high priority (use for above-the-fold) */
  priority?: boolean;
  /** Optional wrapper className applied to the <picture> element */
  pictureClassName?: string;
}

/**
 * Renders a <picture> with AVIF → WebP → JPEG/PNG fallbacks and responsive srcset/sizes.
 * Source bundles are generated in `src/assets/optimized`. Forwards refs to the
 * inner <img> so callers can attach effects (e.g. parallax transforms).
 */
const ResponsiveImage = forwardRef<HTMLImageElement, ResponsiveImageProps>(
  ({ source, sizes, alt, priority = false, className, pictureClassName, ...rest }, ref) => {
    const fallbackType = source.fallbackType ?? "image/jpeg";
    const fallbackSrcSet = source.fallback ?? source.jpg;
    return (
      <picture className={pictureClassName}>
        <source type="image/avif" srcSet={source.avif} sizes={sizes} />
        <source type="image/webp" srcSet={source.webp} sizes={sizes} />
        <img
          ref={ref}
          src={source.src}
          srcSet={fallbackSrcSet}
          sizes={sizes}
          alt={alt}
          width={source.width}
          height={source.height}
          loading={priority ? "eager" : "lazy"}
          decoding="async"
          fetchPriority={priority ? "high" : "auto"}
          className={className}
          data-fallback-type={fallbackType}
          {...rest}
        />
      </picture>
    );
  }
);
ResponsiveImage.displayName = "ResponsiveImage";

export default ResponsiveImage;