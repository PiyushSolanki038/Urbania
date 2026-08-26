import useInView from "../hooks/useInView.js";

/**
 * Generic scroll-reveal wrapper. Mirrors the source's [data-reveal] +
 * data-reveal-delay fade/slide-in behaviour via IntersectionObserver.
 */
export default function Reveal({ as: Tag = "div", delay = 0, className, style, children, ...rest }) {
  const [ref, inView] = useInView();
  return (
    <Tag
      ref={ref}
      data-reveal
      className={[className, inView ? "is-visible" : ""].filter(Boolean).join(" ")}
      style={{ transitionDelay: `${delay}ms`, ...style }}
      {...rest}
    >
      {children}
    </Tag>
  );
}
