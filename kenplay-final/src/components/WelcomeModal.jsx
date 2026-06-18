import { useModal } from '../context/ModalContext';

export default function WelcomeModal() {
  const { closeAll, openLogin, openRegister } = useModal();

  return (
    <div className="modal-overlay" role="dialog" aria-modal="true" aria-labelledby="modal-bienvenida-titulo" onClick={e => { if (e.target === e.currentTarget) closeAll(); }}>
      <div className="modal-box">
        <button className="modal-close" onClick={closeAll} aria-label="Cerrar">✕</button>
        <div className="modal-icon">🎮</div>
        <h2 id="modal-bienvenida-titulo" style={{ margin: '0 0 6px', fontSize: 20 }}>¡Bienvenido a KenPlay!</h2>
        <p style={{ color: 'var(--muted)', fontSize: 14, margin: '0 0 20px' }}>
          Crea una cuenta para guardar tus juegos favoritos y acceder a ofertas exclusivas.
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <button className="btn" style={{ width: '100%' }} onClick={openRegister}>📝 Crear cuenta gratis</button>
          <button className="btn secondary" style={{ width: '100%' }} onClick={openLogin}>🔑 Ya tengo cuenta</button>
          <button
            style={{ background: 'none', border: 'none', color: 'var(--muted)', fontSize: 13, cursor: 'pointer', padding: 4 }}
            onClick={closeAll}
          >
            Ahora no, gracias
          </button>
        </div>
      </div>
    </div>
  );
}
