import { useState } from 'react';

function useForm(initialValues) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [msg, setMsg] = useState(null);

  function set(field, value) {
    setValues(prev => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: '' }));
  }

  function reset() {
    setValues(initialValues);
    setErrors({});
  }

  return { values, errors, msg, set, reset, setErrors, setMsg };
}

export default function ContactForm() {
  const { values, errors, msg, set, reset, setErrors, setMsg } = useForm({
    nombre: '', email: '', mensaje: '',
  });

  function isEmailValid(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
  }

  function handleSubmit() {
    const newErrors = {};
    if (!values.nombre.trim()) newErrors.nombre = 'El campo "Nombre" es obligatorio.';
    if (!values.email.trim()) newErrors.email = 'El campo "Email" es obligatorio.';
    else if (!isEmailValid(values.email)) newErrors.email = 'Formato de correo inválido.';
    if (!values.mensaje.trim()) newErrors.mensaje = 'El campo "Mensaje" es obligatorio.';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    reset();
    setMsg({ text: '✅ Mensaje enviado. Te responderemos pronto.', type: 'ok' });
  }

  return (
    <section aria-label="Formulario de contacto" style={{ marginTop: 28 }}>
      <div className="section-title">
        <h2 style={{ margin: 0 }}>✉️ Contacto</h2>
        <div style={{ color: 'var(--muted)', fontSize: 13 }}>Envíanos tu mensaje</div>
      </div>

      <div style={{ marginTop: 14 }}>
        <div className="form-group">
          <label htmlFor="cont-nombre">Nombre</label>
          <input
            id="cont-nombre"
            type="text"
            placeholder="Tu nombre"
            value={values.nombre}
            onChange={e => set('nombre', e.target.value)}
            className={errors.nombre ? 'input-error' : ''}
            autoComplete="name"
          />
          {errors.nombre && <span className="form-error">{errors.nombre}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="cont-email">Email</label>
          <input
            id="cont-email"
            type="email"
            placeholder="correo@ejemplo.com"
            value={values.email}
            onChange={e => set('email', e.target.value)}
            className={errors.email ? 'input-error' : ''}
            autoComplete="email"
          />
          {errors.email && <span className="form-error">{errors.email}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="cont-mensaje">Mensaje</label>
          <textarea
            id="cont-mensaje"
            rows={3}
            placeholder="Escribe tu mensaje aquí..."
            value={values.mensaje}
            onChange={e => set('mensaje', e.target.value)}
            className={errors.mensaje ? 'input-error' : ''}
          />
          {errors.mensaje && <span className="form-error">{errors.mensaje}</span>}
        </div>

        <button
          className="btn"
          style={{ width: '100%', marginTop: 4 }}
          onClick={handleSubmit}
        >
          Enviar mensaje
        </button>

        {msg && <div className={`form-msg ${msg.type}`}>{msg.text}</div>}
      </div>
    </section>
  );
}
