import { useAuth } from '../context/AuthContext';
import { useModal } from '../context/ModalContext';
import AccessibilityPanel from './AccessibilityPanel';
import styles from './Header.module.css';

export default function Header() {
  const { activeUser, logout } = useAuth();
  const { openLogin } = useModal();

  return (
    <header className={styles.header} role="banner">
      <a className={styles.brand} href="#">
        <div className={styles.logo}>K</div>
        <div style={{ lineHeight: 1 }}>
          <div style={{ fontWeight: 700 }}>KenPlay</div>
          <div style={{ fontSize: 12, color: 'var(--muted)' }}>Principal</div>
        </div>
      </a>

      <nav className={styles.nav} role="navigation" aria-label="Navegación principal">
        <a href="#">Inicio</a>
        <a href="#">Ofertas</a>
        <a href="#">Novedades</a>
        <a href="#">Categorías</a>
      </nav>

      <button
        className={`${styles.loginBtn} ${activeUser ? styles.loggedIn : ''}`}
        onClick={activeUser ? logout : openLogin}
        title={activeUser ? 'Cerrar sesión' : ''}
      >
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }}>
          <path d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8z" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M20 21v-1a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v1" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <span>{activeUser ? `👤 ${activeUser.nombre}` : 'Iniciar sesión'}</span>
      </button>

      {/* Panel de accesibilidad (tema + tamaño de texto) */}
      <AccessibilityPanel />

      <div className={styles.search} role="search">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" style={{ opacity: .8, flexShrink: 0 }}>
          <path d="M21 21l-4.35-4.35" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
          <circle cx="11" cy="11" r="6" stroke="currentColor" strokeWidth="1.6"/>
        </svg>
        <input type="search" placeholder="Buscar juegos, títulos o ediciones" aria-label="Buscar" />
      </div>
    </header>
  );
}
