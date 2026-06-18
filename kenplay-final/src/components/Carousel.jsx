import { useState, useEffect, useCallback } from 'react';
import { carouselSlides } from '../data/games';
import styles from './Carousel.module.css';

export default function Carousel() {
  const [current, setCurrent] = useState(0);
  const total = carouselSlides.length;

  const move = useCallback((dir) => {
    setCurrent(prev => (prev + dir + total) % total);
  }, [total]);

  const goTo = (idx) => setCurrent(idx);

  useEffect(() => {
    const interval = setInterval(() => move(1), 3500);
    return () => clearInterval(interval);
  }, [move]);

  return (
    <div className={styles.carousel} role="region" aria-label="Carrusel de juegos destacados">
      <div className={styles.track}>
        {carouselSlides.map((slide, i) => (
          <div
            key={i}
            className={`${styles.slide} ${i === current ? styles.active : ''}`}
            style={{
              backgroundImage: `url('${slide.image}')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            <div className={styles.overlay}>
              <span className={styles.badge}>{slide.badge}</span>
              <div className={styles.title}>{slide.title}</div>
            </div>
          </div>
        ))}
      </div>

      <button className={`${styles.btn} ${styles.prev}`} onClick={() => move(-1)} aria-label="Anterior">&#8249;</button>
      <button className={`${styles.btn} ${styles.next}`} onClick={() => move(1)}  aria-label="Siguiente">&#8250;</button>

      <div className={styles.dots}>
        {carouselSlides.map((_, i) => (
          <button
            key={i}
            className={`${styles.dot} ${i === current ? styles.dotActive : ''}`}
            onClick={() => goTo(i)}
            aria-label={`Ir a slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
