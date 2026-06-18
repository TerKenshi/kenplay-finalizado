import Carousel from './Carousel';
import styles from './Hero.module.css';

export default function Hero() {
  return (
    <section className={styles.hero} aria-label="Promoción principal">
      <Carousel />
      <div className={styles.info}>
        <h1 id="destacados">¡Nuevos Lanzamientos!</h1>
        <p>Descubre descuentos, bundles y lanzamientos. Creados para jugadores Casuales</p>
      </div>
      <div className={styles.cta}>
        <button className="btn">Ver ofertas</button>
        <button className="btn secondary">Explorar categorías</button>
      </div>
    </section>
  );
}
