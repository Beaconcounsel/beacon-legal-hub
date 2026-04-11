import { useEffect, useRef, DependencyList } from "react";

export function useScrollReveal(deps: DependencyList = []) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let observer: IntersectionObserver | null = null;

    // Use setTimeout to ensure React has flushed DOM updates
    const timeout = setTimeout(() => {
      const children = el.querySelectorAll(".reveal:not(.revealed)");
      if (children.length === 0) return;

      // Immediately reveal elements already in viewport
      children.forEach((child) => {
        const rect = child.getBoundingClientRect();
        if (rect.top < window.innerHeight + 40 && rect.bottom > 0) {
          child.classList.add("revealed");
        }
      });

      // Observe remaining unrevealed elements for scroll
      const remaining = el.querySelectorAll(".reveal:not(.revealed)");
      if (remaining.length === 0) return;

      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("revealed");
              observer?.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
      );

      remaining.forEach((child) => observer!.observe(child));
    }, 100);

    return () => {
      clearTimeout(timeout);
      observer?.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return ref;
}
