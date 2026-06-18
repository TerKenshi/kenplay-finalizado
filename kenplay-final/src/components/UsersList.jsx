import { useAuth } from '../context/AuthContext';

export default function UsersList() {
  const { users } = useAuth();
  if (users.length === 0) return null;

  return (
    <section aria-label="Usuarios inscritos" style={{ marginTop: 24 }}>
      <div className="section-title">
        <h2 style={{ margin: 0 }}>👥 Usuarios inscritos</h2>
        <div style={{ color: 'var(--muted)', fontSize: 13 }}>{users.length} usuario(s)</div>
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginTop: 12 }}>
        {users.map(user => (
          <div key={user.email} className="user-card">
            <strong>{user.nombre}</strong>
            <span>{user.email}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
