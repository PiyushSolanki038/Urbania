import styles from "../styles/Overview.module.css";
import Reveal from "./Reveal.jsx";
import { pillars, overviewCards } from "../data/site.js";

export default function Overview() {
  return (
    <section id="overview" className={styles.section}>
      <div aria-hidden="true" className={styles.glow}>
        <div className={styles.glowSpot} />
      </div>
      <div className="u-shell">
        <div className={styles.inner}>
          <div className={styles.grid}>
            <Reveal className={styles.copy}>
              <p className={styles.eyebrow}>Overview</p>
              <h2 className={styles.heading}>Engineered around the people inside it.</h2>
              <p className={styles.lede}>
                Four commitments define the Urbania — and none of them were compromised to hit a price.
              </p>
              <ul className={styles.pillars}>
                {pillars.map((item) => (
                  <li className={styles.pillar} key={item.num}>
                    <span className={styles.pillarNum}>{item.num}</span>
                    <span className={styles.pillarLabel}>{item.label}</span>
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={160} className={styles.imageWrap}>
              <div className={styles.imageGlow} />
              <img
                src="/assets/van.png"
                alt="Force Motors Urbania front three-quarter view with the side door open"
                loading="lazy"
                className={styles.image}
              />
            </Reveal>
          </div>

          <div className={styles.cards}>
            {overviewCards.map((item, i) => (
              <Reveal as="article" delay={120 + i * 90} key={item.num} className={styles.card}>
                <div className={styles.cardImgWrap}>
                  <img src={item.image} alt={item.alt} loading="lazy" className={styles.cardImg} />
                  <div className={styles.cardImgScrim} />
                </div>
                <div className={styles.cardBody}>
                  <span className={styles.cardTag}>Commitment {item.num}</span>
                  <h3 className={styles.cardTitle}>{item.title}</h3>
                  <p className={styles.cardBodyText}>{item.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
