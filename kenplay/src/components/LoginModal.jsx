import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useModal } from '../context/ModalContext';

export default function LoginModal() {
  const { login, isEmailValid } = useAuth();
  const { closeAll, openRegister } = useModal();

  const [email, setEmail] = useState('');
  const [pass, setPass]   = useState('');
  const [errors, setErrors] = useState({});
  const [msg, setMsg] = useState(null);

  function handleLogin() {
    const newErrors = {};
    if (!email.trim()) newErrors.email = 'Campo obligatorio.';
    else if (!isEmailValid(email)) newErrors.email = 'Formato de correo inválido.';
    if (!pass.trim()) newErrors.pass = 'Campo obligatorio.';

    if (Object.keys(newErrors).length) { setErrors(newErrors); return; }

    const result = login(email, pass);
    if (!result.ok) {
      setErrors({ [result.field]: result.msg });
      return;
    }

    setMsg({ text: `✅ ¡Bienvenido/a, ${result.user.nombre}!`, type: 'ok' });
    setTimeout(closeAll, 1200);
  }

  return (
    <div className="modal-overlay" role="dialog" aria-modal="true" aria-labelledby="modal-login-titulo" onClick={e => { if (e.target === e.currentTarget) closeAll(); }}>
      <div className="modal-box">
        <button className="modal-close" onClick={closeAll} aria-label="Cerrar">✕</button>
        <div className="modal-icon">🔑</div>
        <h2 id="modal-login-titulo" style={{ margin: '0 0 16px', fontSize: 18 }}>Iniciar sesión</h2>

        <div className="form-group">
          <label htmlFor="ml-email">Correo electrónico</label>
          <input
            id="ml-email"
            type="email"
            placeholder="correo@ejemplo.com"
            value={email}
            onChange={e => { setEmail(e.target.value); setErrors(p => ({ ...p, email: '' })); }}
            className={errors.email ? 'input-error' : ''}
            autoComplete="email"
          />
          {errors.email && <span className="form-error">{errors.email}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="ml-pass">Contraseña</label>
          <input
            id="ml-pass"
            type="password"
            placeholder="Tu contraseña"
            value={pass}
            onChange={e => { setPass(e.target.value); setErrors(p => ({ ...p, pass: '' })); }}
            className={errors.pass ? 'input-error' : ''}
            autoComplete="current-password"
          />
          {errors.pass && <span className="form-error">{errors.pass}</span>}
        </div>

        <button className="btn" style={{ width: '100%', marginTop: 4 }} onClick={handleLogin}>Ingresar</button>
        {msg && <div className={`form-msg ${msg.type}`}>{msg.text}</div>}

        <p style={{ textAlign: 'center', margin: '14px 0 0', fontSize: 13, color: 'var(--muted)' }}>
          ¿No tienes cuenta?{' '}
          <button style={{ background: 'none', border: 'none', color: 'var(--accent)', cursor: 'pointer', fontSize: 13, padding: 0 }} onClick={openRegister}>
            Regístrate
          </button>
        </p>
      </div>
    </div>
  );
}
