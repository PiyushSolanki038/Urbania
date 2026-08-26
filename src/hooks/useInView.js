import { useEffect, useRef, useState } from "react";

/**
 * IntersectionObserver-driven scroll-reveal hook.
 * Returns a ref to attach to an element and a boolean that flips to true
 * once the element crosses the given threshold, then stays true (mirrors
 * the source's one-shot data-reveal behaviour).
 */
export default function useInView({ threshold = 0.12, rootMargin = "0px 0px -6% 0px" } = {}) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setInView(true);
            io.unobserve(entry.target);
          }
        });
      },
      { threshold, rootMargin }
    );

    io.observe(el);
    return () => io.disconnect();
  }, [threshold, rootMargin]);

  return [ref, inView];
}
