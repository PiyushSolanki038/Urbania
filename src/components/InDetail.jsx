import { useRef } from "react";
import styles from "../styles/InDetail.module.css";
import Reveal from "./Reveal.jsx";
import Film from "./Film.jsx";
import { detailCards } from "../data/site.js";

export default function InDetail() {
  const trackRef = useRef(null);

  const scroll = (dir) => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * Math.max(el.clientWidth * 0.82, 260), behavior: "smooth" });
  };

  return (
    <section id="showcase" className={styles.section}>
      <div className="u-shell">
        <Reveal>
          <p className={styles.eyebrow}>In Detail</p>
          <h2 className={styles.heading}>Explore every detail up close.</h2>
          <p className={styles.lede}>
            Watch the 28-second film, then explore each detail up close — hover a feature, or tap on touch.
          </p>
        </Reveal>

        <Reveal delay={100} className={styles.filmWrap}>
          <div id="u-film-watch" className={styles.filmFrame}>
            <Film />
          </div>
          <div className={styles.filmMeta}>
            <p className={styles.filmCaption}>
              <span className={styles.filmDash} />
              The Film · A guided tour of the Urbania
            </p>
            <a href="/Urbania%20Film.dc.html" target="_blank" rel="noreferrer" className={styles.filmLink}>
              Open full screen
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M7 17L17 7M17 7H9M17 7v8" />
              </svg>
            </a>
          </div>
        </Reveal>

        <Reveal delay={120} className={styles.detailBlock}>
          <div className={styles.detailHead}>
            <div>
              <p className={styles.eyebrow}>
                <span className={styles.detailDash} />
                Signature Details
              </p>
              <h3 className={styles.detailHeading}>The touches you notice every day.</h3>
            </div>
            <div className={styles.detailNav}>
              <button type="button" onClick={() => scroll(-1)} aria-label="Scroll left" className={styles.navBtn}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
                  <path d="M15 5l-7 7 7 7" />
                </svg>
              </button>
              <button type="button" onClick={() => scroll(1)} aria-label="Scroll right" className={styles.navBtn}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
                  <path d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>

          <div ref={trackRef} className={`${styles.scroller} u-scroll`}>
            {detailCards.map((c) => (
              <article key={c.num} className={styles.card}>
                <img src={c.image} alt={c.alt} loading="lazy" className={styles.cardImg} />
                <span className={styles.cardScrim} />
                <span aria-hidden="true" className={styles.cardNum}>
                  {c.num}
                </span>
                <div className={styles.cardBody}>
                  <p className={styles.cardTag}>{c.tag}</p>
                  <h4 className={styles.cardTitle}>{c.title}</h4>
                  <p className={styles.cardCopy}>{c.copy}</p>
                </div>
              </article>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
