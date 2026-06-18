import { useState, useEffect, useRef } from 'react';
import { useTheme } from '../context/ThemeContext';
import styles from './AccessibilityPanel.module.css';

export default function AccessibilityPanel() {
  const [open, setOpen] = useState(false);
  const { theme, toggle, increasFont, decreaseFont, canIncrease, canDecrease, currentFontSize } = useTheme();
  const isLight = theme === 'light';
  const panelRef = useRef(null);

  // Cerrar al hacer click fuera
  useEffect(() => {
    function handleClickOutside(e) {
      if (panelRef.current && !panelRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    if (open) document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [open]);

  // Cerrar con Escape
  useEffect(() => {
    function handleKey(e) {
      if (e.key === 'Escape') setOpen(false);
    }
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, []);

  return (
    <div className={styles.wrapper} ref={panelRef}>
      {/* Botón que abre el panel */}
      <button
        className={styles.trigger}
        onClick={() => setOpen(prev => !prev)}
        aria-label="Opciones de accesibilidad"
        aria-expanded={open}
        title="Accesibilidad"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="5" r="1.5" stroke="currentColor" strokeWidth="1.8"/>
          <path d="M5 8.5h14M12 8.5v11M8 13l4 2 4-2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <span>Accesibilidad</span>
      </button>

      {/* Panel desplegable */}
      {open && (
        <div className={styles.panel} role="dialog" aria-label="Panel de accesibilidad">
          <div className={styles.panelHeader}>
            <span>⚙️ Accesibilidad</span>
            <button className={styles.closeBtn} onClick={() => setOpen(false)} aria-label="Cerrar panel">✕</button>
          </div>

          {/* Modo claro / oscuro */}
          <div className={styles.section}>
            <div className={styles.sectionLabel}>Tema</div>
            <button className={styles.optionBtn} onClick={toggle}>
              {isLight ? (
                <>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Cambiar a modo oscuro
                </>
              ) : (
                <>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth="1.8"/>
                    <path d="M12 2v2M12 20v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M2 12h2M20 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
                  </svg>
                  Cambiar a modo claro
                </>
              )}
            </button>
          </div>

          {/* Tamaño de texto */}
          <div className={styles.section}>
            <div className={styles.sectionLabel}>Tamaño de texto — {currentFontSize}px</div>
            <div className={styles.fontRow}>
              <button
                className={styles.fontBtn}
                onClick={decreaseFont}
                disabled={!canDecrease}
                aria-label="Reducir texto"
                title="Texto más pequeño"
              >
                <span style={{ fontSize: 13 }}>A</span>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                  <path d="M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </button>

              {/* Barra de progreso visual */}
              <div className={styles.fontBar}>
                <div
                  className={styles.fontBarFill}
                  style={{ width: `${((currentFontSize - 14) / (22 - 14)) * 100}%` }}
                />
              </div>

              <button
                className={styles.fontBtn}
                onClick={increasFont}
                disabled={!canIncrease}
                aria-label="Aumentar texto"
                title="Texto más grande"
              >
                <span style={{ fontSize: 17 }}>A</span>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                  <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
