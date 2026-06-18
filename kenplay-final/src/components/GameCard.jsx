import styles from './GameCard.module.css';

export default function GameCard({ game }) {
  function playSound() {
    try {
      const audio = new Audio('/SONIDO/Buying Sound effect.mp3');
      audio.play().catch(() => {});
    } catch (e) {}
  }

  return (
    <article className={styles.card} role="listitem" aria-label={game.title}>
      <div
        className={styles.thumb}
        style={{
          backgroundImage: `linear-gradient(180deg, rgba(0,0,0,0.28), rgba(0,0,0,0.2)), url('${game.image}')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {/* fallback color si el .ico no carga */}
        <div
          className={styles.thumbFallback}
          style={{ background: game.fallbackColor }}
        />
      </div>
      <div className={styles.body}>
        <div>
          <div className={styles.meta}>
            <div className={styles.gameTitle}>{game.title}</div>
            <div className={styles.price}>{game.price}</div>
          </div>
          <div className={styles.subtitle}>{game.subtitle}</div>
        </div>
        <div className={styles.footer}>
          <div className={styles.tags}>
            {game.tags.map(tag => (
              <span key={tag} className={styles.tag}>{tag}</span>
            ))}
          </div>
          <button className="btn btn-small" onClick={playSound}>Comprar</button>
        </div>
      </div>
    </article>
  );
}
