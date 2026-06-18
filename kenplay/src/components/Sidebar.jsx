import styles from './Sidebar.module.css';

const filters = ['Ofertas del día', 'Nuevo lanzamiento', 'Bundles'];
const categories = ['Acción', 'RPG', 'Deportes', 'Indie'];

export default function Sidebar() {
  return (
    <aside className={styles.controls} role="complementary" aria-label="Filtros y promociones">
      <div className={styles.filterGroup}>
        <h4>Filtrar por</h4>
        <div className={styles.filterList}>
          {filters.map(f => <button key={f}>{f}</button>)}
        </div>
      </div>

      <div className={styles.filterGroup}>
        <h4>Categorías</h4>
        <div className={styles.filterList}>
          {categories.map(c => <button key={c}>{c}</button>)}
        </div>
      </div>

      <div className={styles.promo} aria-hidden="true">
        <strong>Bundle estrella</strong>
        <p>Ahorra hasta 75% en selección limitada. Oferta válida hasta agotar stock.</p>
        <button className="btn" style={{ width: '100%' }}>Ver Bundle</button>
      </div>
    </aside>
  );
}
