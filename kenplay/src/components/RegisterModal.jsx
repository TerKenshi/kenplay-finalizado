import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useModal } from '../context/ModalContext';

export default function RegisterModal() {
  const { register, isEmailValid } = useAuth();
  const { closeAll, openLogin } = useModal();

  const [form, setForm] = useState({ nombre: '', email: '', pass: '', pass2: '' });
  const [errors, setErrors] = useState({});
  const [msg, setMsg] = useState(null);

  function set(field, value) {
    setForm(prev => ({ ...prev, [field]: value }));
    setErrors(prev => ({ ...prev, [field]: '' }));
  }

  function handleRegister() {
    const newErrors = {};
    if (!form.nombre.trim()) newErrors.nombre = 'Campo obligatorio.';
    if (!form.email.trim()) newErrors.email = 'Campo obligatorio.';
    else if (!isEmailValid(form.email)) newErrors.email = 'Formato de correo inválido.';
    if (!form.pass || form.pass.length < 6) newErrors.pass = 'Mínimo 6 caracteres.';
    if (form.pass !== form.pass2) newErrors.pass2 = 'Las contraseñas no coinciden.';

    if (Object.keys(newErrors).length) { setErrors(newErrors); return; }

    const result = register(form.nombre, form.email, form.pass);
    if (!result.ok) {
      setErrors({ [result.field]: result.msg });
      return;
    }

    setMsg({ text: `✅ ¡Cuenta creada! Bienvenido/a, ${result.user.nombre}.`, type: 'ok' });
    setTimeout(closeAll, 1200);
  }

  return (
    <div className="modal-overlay" role="dialog" aria-modal="true" aria-labelledby="modal-registro-titulo" onClick={e => { if (e.target === e.currentTarget) closeAll(); }}>
      <div className="modal-box">
        <button className="modal-close" onClick={closeAll} aria-label="Cerrar">✕</button>
        <div className="modal-icon">📝</div>
        <h2 id="modal-registro-titulo" style={{ margin: '0 0 16px', fontSize: 18 }}>Crear cuenta</h2>

        {[
          { field: 'nombre', label: 'Nombre completo', type: 'text', placeholder: 'Ej: Juan Pérez', autoComplete: 'name' },
          { field: 'email',  label: 'Correo electrónico', type: 'email', placeholder: 'correo@ejemplo.com', autoComplete: 'email' },
          { field: 'pass',   label: 'Contraseña', type: 'password', placeholder: 'Mínimo 6 caracteres', autoComplete: 'new-password' },
          { field: 'pass2',  label: 'Confirmar contraseña', type: 'password', placeholder: 'Repite tu contraseña', autoComplete: 'new-password' },
        ].map(({ field, label, type, placeholder, autoComplete }) => (
          <div key={field} className="form-group">
            <label htmlFor={`mr-${field}`}>{label}</label>
            <input
              id={`mr-${field}`}
              type={type}
              placeholder={placeholder}
              value={form[field]}
              onChange={e => set(field, e.target.value)}
              className={errors[field] ? 'input-error' : ''}
              autoComplete={autoComplete}
            />
            {errors[field] && <span className="form-error">{errors[field]}</span>}
          </div>
        ))}

        <button className="btn" style={{ width: '100%', marginTop: 4 }} onClick={handleRegister}>
          Crear cuenta
        </button>
        {msg && <div className={`form-msg ${msg.type}`}>{msg.text}</div>}

        <p style={{ textAlign: 'center', margin: '14px 0 0', fontSize: 13, color: 'var(--muted)' }}>
          ¿Ya tienes cuenta?{' '}
          <button style={{ background: 'none', border: 'none', color: 'var(--accent)', cursor: 'pointer', fontSize: 13, padding: 0 }} onClick={openLogin}>
            Inicia sesión
          </button>
        </p>
      </div>
    </div>
  );
}
