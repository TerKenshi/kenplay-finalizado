import { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [users, setUsers] = useState([]);
  const [activeUser, setActiveUser] = useState(null);

  function isEmailValid(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
  }

  function register(nombre, email, password) {
    const normalizedEmail = email.trim().toLowerCase();
    if (users.some(u => u.email === normalizedEmail)) {
      return { ok: false, field: 'email', msg: 'Este correo ya está registrado.' };
    }
    const newUser = {
      nombre: nombre.trim(),
      email: normalizedEmail,
      fecha: new Date().toLocaleDateString('es-CL'),
    };
    setUsers(prev => [...prev, newUser]);
    setActiveUser(newUser);
    return { ok: true, user: newUser };
  }

  function login(email, password) {
    const normalizedEmail = email.trim().toLowerCase();
    const found = users.find(u => u.email === normalizedEmail);
    if (!found) return { ok: false, field: 'email', msg: 'Correo no encontrado. ¿Ya te registraste?' };
    setActiveUser(found);
    return { ok: true, user: found };
  }

  function logout() {
    setActiveUser(null);
  }

  return (
    <AuthContext.Provider value={{ users, activeUser, register, login, logout, isEmailValid }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
