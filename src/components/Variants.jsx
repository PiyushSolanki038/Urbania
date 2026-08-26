import styles from "../styles/Variants.module.css";
import Reveal from "./Reveal.jsx";
import { variants } from "../data/site.js";

export default function Variants() {
  return (
    <section id="variants" className={`u-shell ${styles.section}`}>
      <Reveal>
        <p className={styles.eyebrow}>Variants</p>
        <h2 className={styles.heading}>Three wheelbases. One standard of comfort.</h2>
      </Reveal>

      <div className={styles.grid}>
        {variants.map((v, i) => {
          const featured = v.seats === 16;
          const fill = featured ? "#C8102E" : "rgba(200,16,46,.42)";
          const lenPct = Math.round((parseInt(v.length, 10) / 6215) * 100) + "%";

          return (
            <Reveal
              as="article"
              key={v.code}
              delay={i * 120}
              className={`${styles.card} ${featured ? styles.cardFeatured : ""}`}
            >
              <span className={styles.topbar} />
              {featured && <span className={styles.badge}>Most Popular</span>}

              <p className={styles.tag}>{v.tag}</p>
              <h3 className={styles.name}>{v.name}</h3>

              <div className={styles.seatsRow}>
                <span className={styles.seatsValue}>{v.seats}</span>
                <span className={styles.seatsLabel}>
                  Guest
                  <br />
                  Seats
                </span>
              </div>

              <div className={styles.cabin}>
                <div className={styles.cabinLabelRow}>
                  <span className={styles.cabinLine} />
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="rgba(247,247,248,.4)" strokeWidth="1.6">
                    <circle cx="12" cy="12" r="9" />
                    <path d="M12 8v4l2.5 2.5" />
                  </svg>
                  <span className={styles.cabinLabel}>Cabin</span>
                  <span className={styles.cabinLine} />
                </div>
                <div className={styles.rows}>
                  {v.rows.map((n, ri) => (
                    <div className={styles.row} key={ri}>
                      {Array.from({ length: n }).map((_, si) => (
                        <span key={si} className={styles.seat} style={{ background: fill }} />
                      ))}
                    </div>
                  ))}
                </div>
              </div>

              <div className={styles.wheelbaseBlock}>
                <div className={styles.wheelbaseRow}>
                  <span>Wheelbase</span>
                  <span className={styles.wheelbaseValue}>{v.wheelbase}</span>
                </div>
                <div className={styles.lenTrack}>
                  <div className={styles.lenBar} style={{ width: lenPct }} />
                </div>
                <p className={styles.lenNote}>Overall length {v.length}</p>
              </div>

              <p className={styles.note}>{v.note}</p>

              <a
                href="#enquire"
                className={styles.cta}
                style={{
                  background: featured ? "#C8102E" : "transparent",
                  color: featured ? "#fff" : "#F7F7F8",
                  borderColor: featured ? "#C8102E" : "rgba(247,247,248,.28)",
                }}
              >
                Enquire about {v.code}
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </a>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
