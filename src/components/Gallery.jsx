import { useEffect, useState } from "react";
import styles from "../styles/Gallery.module.css";
import Reveal from "./Reveal.jsx";
import Lightbox from "./Lightbox.jsx";
import { gallery } from "../data/site.js";

export default function Gallery() {
  const [openIndex, setOpenIndex] = useState(null);

  useEffect(() => {
    document.body.style.overflow = openIndex !== null ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [openIndex]);

  const prev = () => setOpenIndex((i) => (i - 1 + gallery.length) % gallery.length);
  const next = () => setOpenIndex((i) => (i + 1) % gallery.length);

  return (
    <section id="gallery" className={`u-shell ${styles.section}`}>
      <Reveal>
        <p className={styles.eyebrow}>Gallery</p>
        <h2 className={styles.heading}>Look closer. It holds up.</h2>
      </Reveal>

      <div className={styles.grid}>
        {gallery.map((item, i) => (
          <button
            type="button"
            key={item.src}
            onClick={() => setOpenIndex(i)}
            aria-label="Expand image"
            className={styles.item}
          >
            <img src={item.src} alt={item.alt} loading="lazy" className={styles.img} />
            <span className={styles.scrim} />
          </button>
        ))}
      </div>

      {openIndex !== null && (
        <Lightbox
          items={gallery}
          index={openIndex}
          onClose={() => setOpenIndex(null)}
          onPrev={prev}
          onNext={next}
        />
      )}
    </section>
  );
}
