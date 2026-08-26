import { useEffect, useRef, useState } from "react";
import styles from "../styles/Film.module.css";
import useReducedMotion from "../hooks/useReducedMotion.js";
import { filmScenes, filmStandardScenes, filmOpening, filmClose } from "../data/site.js";

const lerp = (a, b, t) => a + (b - a) * t;
const clamp = (v, a, b) => Math.min(Math.max(v, a), b);
const sstep = (e0, e1, x) => clamp((x - e0) / (e1 - e0 || 1e-6), 0, 1);
// easeOutCubic
const easeOut = (t) => 1 - Math.pow(1 - t, 3);

// Build named cue points (scene start times) + total duration from the
// authored scene list, exactly mirroring urbania-film.js's CompositionStage.
function buildCues(scenes) {
  const cues = {};
  let t = 0;
  scenes.forEach((s) => {
    cues[s.name] = t;
    t += s.dur;
  });
  return { cues, total: t };
}

const { cues: CUES, total: TOTAL } = buildCues(filmScenes);

function seg(name) {
  const order = filmScenes.map((s) => s.name);
  const i = order.indexOf(name);
  return [CUES[name], i < order.length - 1 ? CUES[order[i + 1]] : TOTAL];
}

function KenImage({ src, start, end, focal, z, x, y, T }) {
  const p = sstep(start, end, T);
  const op = sstep(start, start + 0.55, T) * clamp((end - T) / 0.45, 0, 1);
  return (
    <img
      src={src}
      alt=""
      className={styles.kenImg}
      style={{
        objectPosition: focal,
        opacity: op,
        transform: `scale(${lerp(z[0], z[1], p)}) translate(${lerp(x[0], x[1], p)}%, ${lerp(y[0], y[1], p)}%)`,
      }}
    />
  );
}

function Inset({ src, start, end, T }) {
  const ap = easeOut(sstep(start + 0.6, start + 1.3, T));
  const op = ap * clamp((end - T) / 0.4, 0, 1);
  return (
    <div className={styles.inset} style={{ opacity: op, transform: `translateY(${lerp(40, 0, ap)}px)` }}>
      <img
        src={src}
        alt=""
        className={styles.insetImg}
        style={{ transform: `scale(${lerp(1.14, 1.02, sstep(start, end, T))})` }}
      />
    </div>
  );
}

function Plate({ d, start, end, T }) {
  const base = start + 0.5;
  const inP = easeOut(sstep(base, base + 0.6, T));
  const op = inP * clamp((end - T) / 0.4, 0, 1);
  return (
    <div className={styles.plate} style={{ opacity: op, transform: `translateY(${lerp(46, 0, inP)}px)` }}>
      <div className={styles.plateEyebrowRow}>
        <span className={styles.plateBar} />
        <span className={styles.plateEyebrow}>{d.eyebrow}</span>
      </div>
      <h2 className={styles.plateTitle}>{d.title}</h2>
      <ul className={styles.plateSpecs}>
        {d.specs.map((s, i) => {
          const sp = easeOut(sstep(base + 0.35 + i * 0.16, base + 0.95 + i * 0.16, T));
          return (
            <li key={s} className={styles.plateSpecItem} style={{ opacity: sp, transform: `translateX(${lerp(-26, 0, sp)}px)` }}>
              <span className={styles.plateDot} />
              {s}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function SceneBlock({ d, start, end, T }) {
  return (
    <div className={styles.scene}>
      <KenImage src={d.img} start={start} end={end} focal={d.focal} z={d.z} x={d.x} y={d.y} T={T} />
      <div className={styles.grade} />
      {d.inset && <Inset src={d.inset} start={start} end={end} T={T} />}
      <Plate d={d} start={start} end={end} T={T} />
    </div>
  );
}

function OpeningScene({ start, end, T }) {
  const p = sstep(start, end, T);
  const wm = easeOut(sstep(start + 0.4, start + 1.6, T));
  const tag = easeOut(sstep(start + 1.1, start + 2.1, T));
  const out = clamp((end - T) / 0.5, 0, 1);
  return (
    <div className={styles.scene}>
      <img
        src={filmOpening.bg}
        alt=""
        className={styles.openingImg}
        style={{ transform: `scale(${lerp(1.14, 1.24, p)})`, opacity: sstep(start, start + 0.6, T) * out }}
      />
      <div className={styles.openingScrim} />
      <div className={styles.openingCenter} style={{ opacity: out }}>
        <span className={styles.openingEyebrow} style={{ opacity: wm, transform: `translateY(${lerp(20, 0, wm)}px)` }}>
          {filmOpening.eyebrow}
        </span>
        <span className={styles.openingWordmark} style={{ opacity: wm, transform: `scale(${lerp(1.08, 1, wm)})` }}>
          {filmOpening.wordmark}
        </span>
        <span className={styles.openingTag} style={{ opacity: tag, transform: `translateY(${lerp(20, 0, tag)}px)` }}>
          {filmOpening.tagline}
        </span>
      </div>
    </div>
  );
}

function CloseScene({ start, end, T }) {
  const p = sstep(start, end, T);
  const a = easeOut(sstep(start + 0.4, start + 1.2, T));
  const b = easeOut(sstep(start + 0.9, start + 1.7, T));
  const c = easeOut(sstep(start + 1.5, start + 2.2, T));
  return (
    <div className={styles.scene}>
      <img
        src="/assets/real-exterior-clean.jpg"
        alt=""
        className={styles.closeImg}
        style={{ transform: `scale(${lerp(1.16, 1.06, p)})`, opacity: sstep(start, start + 0.55, T) }}
      />
      <div className={styles.closeScrim} />
      <div className={styles.closeContent}>
        <span className={styles.closeEyebrow} style={{ opacity: a }}>
          {filmClose.eyebrow}
        </span>
        <div className={styles.closePriceRow} style={{ opacity: a, transform: `translateY(${lerp(24, 0, a)}px)` }}>
          <span className={styles.closeCurrency}>₹</span>
          <span className={styles.closePrice}>{filmClose.price}</span>
          <span className={styles.closeUnit}>
            {filmClose.priceUnit}
            <span className={styles.closeStar}>*</span>
          </span>
        </div>
        <div className={styles.closeCta} style={{ opacity: b, transform: `translateY(${lerp(22, 0, b)}px)` }}>
          {filmClose.cta}
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </div>
        <p className={styles.closeSignoff} style={{ opacity: c }}>
          {filmClose.signoff}
        </p>
      </div>
    </div>
  );
}

function Persistent({ T }) {
  const wmOp = sstep(CUES.Presence - 0.3, CUES.Presence + 0.4, T) * clamp((CUES.Close - T) / 0.4, 0, 1);
  const prog = clamp(T / TOTAL, 0, 1);
  return (
    <>
      <div className={styles.wordmarkFixed} style={{ opacity: wmOp }}>
        <span className={styles.wordmarkFixedMain}>Urbania</span>
        <span className={styles.wordmarkFixedSub}>Force Motors</span>
      </div>
      <div className={styles.vignette} />
      <div className={styles.progressTrack}>
        <div className={styles.progressBar} style={{ width: `${prog * 100}%` }} />
      </div>
    </>
  );
}

/**
 * Self-contained requestAnimationFrame-driven film. Reimplements the
 * authored timeline from urbania-film.js (7 scenes, Ken-Burns transforms,
 * spec callouts, price/CTA close, progress bar) in idiomatic React —
 * loops, and restarts from 0 whenever it scrolls back into view.
 */
export default function Film() {
  const containerRef = useRef(null);
  const [T, setT] = useState(0);
  const reducedMotion = useReducedMotion();
  const rafRef = useRef(null);
  const startRef = useRef(null);
  const visibleRef = useRef(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return undefined;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !visibleRef.current) {
            visibleRef.current = true;
            startRef.current = null;
            setT(0);
          } else if (!entry.isIntersecting) {
            visibleRef.current = false;
          }
        });
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (reducedMotion) {
      setT(0);
      return undefined;
    }

    const tick = (now) => {
      if (visibleRef.current) {
        if (startRef.current === null) startRef.current = now;
        const elapsed = (now - startRef.current) / 1000;
        setT(elapsed % TOTAL);
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [reducedMotion]);

  const op = seg("Opening");
  const clo = seg("Close");

  return (
    <div ref={containerRef} className={styles.stage}>
      <OpeningScene start={op[0]} end={op[1]} T={T} />
      {filmStandardScenes.map((d) => {
        const s = seg(d.name);
        return <SceneBlock key={d.name} d={d} start={s[0]} end={s[1]} T={T} />;
      })}
      <CloseScene start={clo[0]} end={clo[1]} T={T} />
      <Persistent T={T} />
    </div>
  );
}
