import styles from "../styles/Footer.module.css";
import { navLinks } from "../data/site.js";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div aria-hidden="true" className={styles.glowLeft} />
      <div aria-hidden="true" className={styles.glowRight} />
      <div aria-hidden="true" className={styles.watermark}>URBANIA</div>

      <div className={`u-shell ${styles.ctaRow}`}>
        <p className={styles.ctaText}>Ready to travel world-class?</p>
        <a href="#enquire" className={styles.ctaBtn}>
          Book a Test Drive
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </a>
      </div>

      <div className={`u-shell ${styles.cols}`}>
        <div>
          <p className={styles.brand}>
            <span className={styles.brandMain}>Urbania</span>
            <span className={styles.brandSub}>Force Motors</span>
          </p>
          <p className={styles.brandCopy}>
            A portfolio demonstration microsite. Not an official Force Motors property; all contact details
            are placeholders.
          </p>
          <div className={styles.social}>
            <a href="#top" aria-label="Instagram" className={styles.socialLink}>
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
                <rect x="3" y="3" width="18" height="18" rx="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" stroke="none" />
              </svg>
            </a>
            <a href="#top" aria-label="Facebook" className={styles.socialLink}>
              <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
                <path d="M14 8.5h2.5V5.2A28 28 0 0 0 13.8 5C11.3 5 9.7 6.5 9.7 9.3v2H6.7v3.4h3v8.3h3.6v-8.3h2.9l.5-3.4h-3.4V9.6c0-.8.3-1.1 1.2-1.1Z" />
              </svg>
            </a>
            <a href="#top" aria-label="YouTube" className={styles.socialLink}>
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
                <rect x="2.5" y="5.5" width="19" height="13" rx="4" />
                <path d="M10 9.2l5 2.8-5 2.8z" fill="currentColor" stroke="none" />
              </svg>
            </a>
            <a href="#top" aria-label="LinkedIn" className={styles.socialLink}>
              <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
                <path d="M6.9 8.2H4.1V20h2.8V8.2ZM5.5 3.8a1.7 1.7 0 1 0 0 3.4 1.7 1.7 0 0 0 0-3.4ZM20 20h-2.8v-5.8c0-1.4-.5-2.3-1.7-2.3-.9 0-1.5.6-1.7 1.2-.1.2-.1.5-.1.8V20H9.9s0-9.6 0-11.8h2.8v1.7c.4-.6 1-1.4 2.6-1.4 1.9 0 3.3 1.2 3.3 3.9V20Z" />
              </svg>
            </a>
          </div>
        </div>

        <nav>
          <h3 className={styles.colHeading}>Explore</h3>
          <ul className={styles.linkList}>
            {navLinks.map((item) => (
              <li key={item.href}>
                <a href={item.href} className={styles.link}>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h3 className={styles.colHeading}>Contact</h3>
          <ul className={styles.contactList}>
            <li className={styles.contactItem}>
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#E6516A"
                strokeWidth="1.7"
                className={styles.contactIcon}
              >
                <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3.1-8.6A2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2Z" />
              </svg>
              <span>
                Toll-free{" "}
                <a href="tel:18000000000" className={styles.contactLink}>
                  1800 000 0000
                </a>
                <br />
                <span className={styles.contactDim}>Mon–Sat, 9:00–19:00 IST</span>
              </span>
            </li>
            <li className={styles.contactItem}>
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#E6516A"
                strokeWidth="1.7"
                className={styles.contactIcon}
              >
                <rect x="3" y="5" width="18" height="14" rx="2" />
                <path d="m3 7 9 6 9-6" />
              </svg>
              <a href="mailto:hello@urbania-demo.in" className={styles.contactLink}>
                hello@urbania-demo.in
              </a>
            </li>
            <li className={styles.contactItem}>
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#E6516A"
                strokeWidth="1.7"
                className={styles.contactIcon}
              >
                <path d="M20 10c0 5-8 12-8 12s-8-7-8-12a8 8 0 0 1 16 0Z" />
                <circle cx="12" cy="10" r="2.6" />
              </svg>
              <span className={styles.contactDim}>Experience Centre, 12 Industrial Estate Road, Pune 411 000</span>
            </li>
          </ul>
        </div>
      </div>

      <div className={styles.legalWrap}>
        <div className={`u-shell ${styles.legal}`}>
          <p>© {year} Urbania demo microsite. All rights reserved.</p>
          <p>Specifications and prices are indicative and for demonstration only.</p>
        </div>
      </div>
    </footer>
  );
}
