import { useEffect, useRef, useState } from "react";
import styles from "../styles/FeaturesAnatomy.module.css";
import Reveal from "./Reveal.jsx";
import useReducedMotion from "../hooks/useReducedMotion.js";
import { parts } from "../data/site.js";

const TOUR_MS = 4500;
const TICK_MS = 50;

export default function FeaturesAnatomy() {
  const [part, setPart] = useState(0);
  const [progress, setProgress] = useState(0);
  const [playing, setPlaying] = useState(true);
  const reducedMotion = useReducedMotion();
  const intervalRef = useRef(null);

  useEffect(() => {
    if (reducedMotion) return undefined;
    intervalRef.current = setInterval(() => {
      if (!playing) return;
      setProgress((p) => {
        const next = p + TICK_MS / TOUR_MS;
        if (next >= 1) {
          setPart((cur) => (cur + 1) % parts.length);
          return 0;
        }
        return next;
      });
    }, TICK_MS);
    return () => clearInterval(intervalRef.current);
  }, [playing, reducedMotion]);

  const goPart = (i) => {
    setPart((i + parts.length) % parts.length);
    setProgress(0);
    setPlaying(false);
  };
  const toggleTour = () => setPlaying((p) => !p);

  const current = parts[part];
  const tourBarPct = ((part + progress) / parts.length) * 100;

  return (
    <section id="features" className={styles.section}>
      <div className="u-shell">
        <div className={styles.inner}>
          <Reveal className={styles.head}>
            <div>
              <p className={styles.eyebrow}>
                <span className={styles.eyebrowBar} />
                Anatomy
              </p>
              <h2 className={styles.heading}>Every part, engineered to earn its place.</h2>
              <p className={styles.lede}>
                The Urbania, taken apart. Trace the spotlight through each system — hover a marker, or let the tour
                walk you round.
              </p>
            </div>
            <span className={styles.counter}>
              {current.num} <span className={styles.counterMax}>/ 06</span>
            </span>
          </Reveal>

          <Reveal delay={120} className={styles.diagramBlock}>
            <div className={styles.diagram}>
              <img
                src="/assets/urbania-exploded.png"
                alt="Exploded view of the Force Motors Urbania showing engine, cockpit, seats, glass, doors and chassis"
                className={styles.diagramImg}
                loading="lazy"
                decoding="async"
              />

              <div
                className={styles.spotlight}
                style={{
                  left: current.x,
                  top: current.y,
                  width: current.spot,
                  paddingBottom: current.spot,
                }}
              />

              {parts.map((p, i) => {
                const active = i === part;
                return (
                  <button
                    key={p.num}
                    type="button"
                    onClick={() => goPart(i)}
                    onMouseEnter={() => goPart(i)}
                    aria-label={p.title}
                    className={`${styles.marker} ${active ? styles.markerActive : ""}`}
                    style={{ left: p.x, top: p.y }}
                  >
                    {p.num}
                  </button>
                );
              })}

              <div key={current.num} className={styles.panel}>
                <div className={styles.panelHead}>
                  <span className={styles.panelNum}>{current.num}</span>
                  <span className={styles.panelTag}>{current.tag}</span>
                </div>
                <h3 className={styles.panelTitle}>{current.title}</h3>
                <p className={styles.panelCopy}>{current.copy}</p>
              </div>

              <div className={styles.controls}>
                <button type="button" onClick={() => goPart(part - 1)} aria-label="Previous part" className={styles.ctrlBtn}>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path d="M15 5l-7 7 7 7" />
                  </svg>
                </button>
                <button type="button" onClick={toggleTour} aria-label="Toggle tour" className={styles.ctrlBtn}>
                  {playing ? (
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                      <rect x="6" y="5" width="4" height="14" />
                      <rect x="14" y="5" width="4" height="14" />
                    </svg>
                  ) : (
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M7 5l12 7-12 7z" />
                    </svg>
                  )}
                </button>
                <button type="button" onClick={() => goPart(part + 1)} aria-label="Next part" className={styles.ctrlBtn}>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>

              <div className={styles.progressTrack}>
                <div className={styles.progressBar} style={{ width: `${tourBarPct}%` }} />
              </div>
            </div>

            <div className={styles.tabs}>
              {parts.map((p, i) => {
                const active = i === part;
                return (
                  <button
                    key={p.num}
                    type="button"
                    onClick={() => goPart(i)}
                    onMouseEnter={() => goPart(i)}
                    className={`${styles.tab} ${active ? styles.tabActive : ""}`}
                  >
                    <span className={styles.tabBar} />
                    <span className={styles.tabNum}>{p.num}</span>
                    <span className={styles.tabLabel}>{p.label}</span>
                  </button>
                );
              })}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
