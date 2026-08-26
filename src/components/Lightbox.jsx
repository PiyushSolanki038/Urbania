import { useEffect } from "react";
import styles from "../styles/Gallery.module.css";

export default function Lightbox({ items, index, onClose, onPrev, onNext }) {
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose, onPrev, onNext]);

  const shot = items[index];

  return (
    <div role="dialog" aria-modal="true" onClick={onClose} className={styles.overlay}>
      <button type="button" onClick={onClose} aria-label="Close image" className={styles.closeBtn}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
          <path d="M6 6l12 12M18 6L6 18" />
        </svg>
      </button>
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onPrev();
        }}
        aria-label="Previous"
        className={`${styles.navBtn} ${styles.navPrev}`}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M15 5l-7 7 7 7" />
        </svg>
      </button>
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onNext();
        }}
        aria-label="Next"
        className={`${styles.navBtn} ${styles.navNext}`}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M9 5l7 7-7 7" />
        </svg>
      </button>
      <figure onClick={(e) => e.stopPropagation()} className={styles.figure}>
        <img src={shot.src} alt={shot.alt} className={styles.figureImg} />
        <figcaption className={styles.caption}>{shot.alt}</figcaption>
      </figure>
    </div>
  );
}
