import { useEffect, useRef, DependencyList } from "react";

export function useScrollReveal(deps: DependencyList = []) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Small delay to let newly rendered elements settle in the DOM
    const timeout = setTimeout(() => {
      const children = el.querySelectorAll(".reveal:not(.revealed)");
      if (children.length === 0) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("revealed");
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.05, rootMargin: "0px 0px -20px 0px" }
      );

      children.forEach((child) => observer.observe(child));

      // Cleanup observer on next effect run
      return () => observer.disconnect();
    }, 50);

    return () => clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return ref;
}
