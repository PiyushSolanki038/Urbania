import styles from "../styles/Pricing.module.css";
import Reveal from "./Reveal.jsx";
import { priceIncludes } from "../data/site.js";

export default function Pricing() {
  return (
    <section id="pricing" className={styles.section}>
      <div aria-hidden="true" className={styles.bgLayer}>
        <div className={styles.glowLeft} />
        <div className={styles.glowRight} />
        <div className={styles.watermark}>URBANIA</div>
      </div>

      <div className={`u-shell ${styles.grid}`}>
        <Reveal>
          <p className={styles.eyebrow}>
            <span className={styles.dash} />
            Introductory Price
          </p>
          <div className={styles.priceRow}>
            <span className={styles.currency}>₹</span>
            <span className={styles.price}>28.97</span>
            <span className={styles.unitCol}>
              <span className={styles.unit}>
                Lakhs<span className={styles.star}>*</span>
              </span>
              <span className={styles.exShowroom}>Ex-showroom</span>
            </span>
          </div>
          <p className={styles.subline}>Starting price · Short Wheelbase variant</p>
          <p className={styles.disclaimer}>
            *Ex-showroom price for the Short Wheelbase variant, indicative and shown for demonstration purposes
            only. Prices vary by variant, state levies and applicable taxes. Register your interest for a
            detailed on-road quotation.
          </p>
        </Reveal>

        <Reveal delay={140}>
          <div className={styles.card}>
            <span className={styles.cardTopbar} />
            <p className={styles.cardLabel}>What&apos;s included as standard</p>
            <ul className={styles.list}>
              {priceIncludes.map((item) => (
                <li className={styles.listItem} key={item.label}>
                  <span className={styles.listLeft}>
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#C8102E" strokeWidth="2.4">
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                    {item.label}
                  </span>
                  <span className={styles.listValue}>{item.value}</span>
                </li>
              ))}
            </ul>
            <a href="#pricing" className={styles.brochureBtn}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
                <path d="M12 3v12m0 0l4-4m-4 4l-4-4M5 21h14" />
              </svg>
              Download Brochure
            </a>
            <a href="#enquire" className={styles.quoteLink}>
              Get an on-road quote
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
