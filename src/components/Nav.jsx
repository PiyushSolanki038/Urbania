import { useEffect, useState } from "react";
import styles from "../styles/Nav.module.css";
import { navLinks } from "../data/site.js";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      <header
        className={styles.header}
        style={{
          background: scrolled ? "rgba(15,15,16,.9)" : "transparent",
          borderBottom: `1px solid ${scrolled ? "rgba(255,255,255,.1)" : "transparent"}`,
          backdropFilter: scrolled ? "blur(18px)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(18px)" : "none",
        }}
      >
        <div className={styles.bar} style={{ height: scrolled ? "64px" : "80px" }}>
          <a href="#top" className={styles.logo}>
            <span className={styles.logoMain}>Urbania</span>
            <span className={styles.logoSub}>Force Motors</span>
          </a>
          <nav className={styles.navlinks}>
            {navLinks.map((item) => (
              <a key={item.href} href={item.href} className={styles.navlink}>
                {item.label}
              </a>
            ))}
            <a href="#enquire" className={styles.cta}>
              Book a Test Drive
            </a>
          </nav>
          <button
            className={styles.burger}
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
            aria-expanded={menuOpen}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
              <path d="M3 6h18M3 12h18M3 18h18" />
            </svg>
          </button>
        </div>
      </header>

      <div className={`${styles.menu} ${menuOpen ? styles.open : ""}`} aria-hidden={!menuOpen}>
        <div className={styles.menuTop}>
          <span className={styles.logoMain}>Urbania</span>
          <button className={styles.menuClose} onClick={() => setMenuOpen(false)} aria-label="Close menu">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        </div>
        <nav className={styles.menuNav}>
          {navLinks.map((item) => (
            <a key={item.href} href={item.href} className={styles.menuLink} onClick={() => setMenuOpen(false)}>
              {item.label}
            </a>
          ))}
          <a href="#enquire" className={styles.menuCta} onClick={() => setMenuOpen(false)}>
            Book a Test Drive
          </a>
          <p className={styles.menuPhone}>Toll-free 1800 000 0000</p>
        </nav>
      </div>
    </>
  );
}
