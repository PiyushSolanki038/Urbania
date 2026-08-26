import styles from "../styles/Marquee.module.css";
import { marquee } from "../data/site.js";

const loop = [...marquee, ...marquee];

export default function Marquee() {
  return (
    <div className={styles.wrap}>
      <div className={styles.track}>
        {loop.map((text, i) => (
          <span className={styles.item} key={`${text}-${i}`}>
            <span className={styles.text}>{text}</span>
            <span className={styles.dot} />
          </span>
        ))}
      </div>
    </div>
  );
}
