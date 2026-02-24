import { useEffect, useRef } from 'react';

/**
 * useScrollAnimation
 * Adds a "visible" class to elements with fade-up / fade-left / fade-right / fade-in
 * classes as they enter the viewport.
 *
 * Usage:
 *   const ref = useScrollAnimation();
 *   <section ref={ref}> ... children with .fade-up ... </section>
 */
export function useScrollAnimation(threshold = 0.15) {
  const ref = useRef(null);

  useEffect(() => {
    const container = ref.current;
    if (!container) return;

    const animatables = container.querySelectorAll(
      '.fade-up, .fade-left, .fade-right, .fade-in'
    );

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            // Unobserve after triggering to save resources
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold }
    );

    animatables.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [threshold]);

  return ref;
}

/**
 * useSingleScrollAnimation
 * For a single element (not a container).
 */
export function useSingleScrollAnimation(threshold = 0.2) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('visible');
          observer.unobserve(el);
        }
      },
      { threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return ref;
}
