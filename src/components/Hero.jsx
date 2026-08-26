import styles from "../styles/Hero.module.css";
import Reveal from "./Reveal.jsx";
import { heroSpecs } from "../data/site.js";

export default function Hero() {
  return (
    <section className={styles.hero}>
      <img
        src="/assets/real-hero.jpg"
        alt="Force Motors Urbania parked at dusk beside a modern building with business travellers boarding"
        className={styles.bgImg}
        fetchPriority="high"
        decoding="async"
      />
      <div className={styles.scrim} />

      <div className={styles.inner}>
        <Reveal as="p" className={styles.eyebrow}>
          Force Motors · Urbania
        </Reveal>
        <h1 className={styles.title}>
          <Reveal as="span" delay={90} className={styles.titleLine}>
            Why Just Travel
          </Reveal>
          <Reveal as="span" delay={200} className={styles.titleLine}>
            When You Can
          </Reveal>
          <Reveal as="span" delay={310} className={styles.titleLine}>
            Travel <span className={styles.accent}>World-Class?</span>
          </Reveal>
        </h1>
        <Reveal as="p" delay={440} className={styles.lede}>
          Aircraft-grade cabin space, recliner seating and a monocoque body engineered for silence. The
          Urbania turns every journey into first class — for up to 16 guests.
        </Reveal>
        <Reveal delay={560} className={styles.actions}>
          <a href="#enquire" className={styles.btnPrimary}>
            Enquire Now
          </a>
          <a href="#pricing" className={styles.btnGhost}>
            Download Brochure
          </a>
        </Reveal>

        <Reveal delay={700} className={styles.specs}>
          {heroSpecs.map((item) => (
            <div key={item.label}>
              <div className={styles.specValue}>{item.value}</div>
              <div className={styles.specLabel}>{item.label}</div>
            </div>
          ))}
        </Reveal>
      </div>

      <a href="#overview" aria-label="Scroll to overview" className={styles.scrollHint}>
        <span className={styles.scrollLabel}>Scroll</span>
        <span className={styles.scrollTrack}>
          <span className={styles.scrollDot} />
        </span>
      </a>
    </section>
  );
}
