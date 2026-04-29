import { useEffect, useRef } from "react";
import type { RefObject } from "react";

interface ScrollRevealOptions {
  threshold?: number;
  rootMargin?: string;
  once?: boolean;
  delay?: number;
}

export function useScrollReveal<T extends HTMLElement>(
  options: ScrollRevealOptions = {},
): RefObject<T | null> {
  const {
    threshold = 0.15,
    rootMargin = "0px",
    once = true,
    delay = 0,
  } = options;
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReduced) {
      el.style.opacity = "1";
      el.style.transform = "none";
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setTimeout(() => {
              el.classList.add("revealed");
            }, delay);
            if (once) observer.unobserve(el);
          } else if (!once) {
            el.classList.remove("revealed");
          }
        }
      },
      { threshold, rootMargin },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, rootMargin, once, delay]);

  return ref;
}
