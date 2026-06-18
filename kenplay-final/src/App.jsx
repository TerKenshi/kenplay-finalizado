import { useEffect } from 'react';
import { AuthProvider } from './context/AuthContext';
import { ModalProvider, useModal } from './context/ModalContext';
import { ThemeProvider } from './context/ThemeContext';

import Header from './components/Header';
import Hero from './components/Hero';
import GameCard from './components/GameCard';
import ContactForm from './components/ContactForm';
import Sidebar from './components/Sidebar';
import UsersList from './components/UsersList';
import WelcomeModal from './components/WelcomeModal';
import LoginModal from './components/LoginModal';
import RegisterModal from './components/RegisterModal';

import { featuredGames } from './data/games';
import './index.css';

function AppContent() {
  const { modal, openWelcome } = useModal();

  useEffect(() => {
    const timer = setTimeout(openWelcome, 400);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <div className="container">
        <Header />

        <main role="main" aria-labelledby="destacados" style={{ gridColumn: '1 / 2' }}>
          <Hero />

          <section style={{ marginTop: 18 }} aria-label="Juegos destacados">
            <div className="section-title">
              <h2 style={{ margin: 0 }}>Destacados</h2>
              <div style={{ color: 'var(--muted)', fontSize: 13 }}>Más Reseñados</div>
            </div>
            <ul style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14, listStyle: 'none', margin: 0, padding: 0 }}>
              {featuredGames.map(game => (
                <li key={game.id} style={{ listStyle: 'none' }}>
                  <GameCard game={game} />
                </li>
              ))}
            </ul>
          </section>

          <ContactForm />
          <UsersList />
        </main>

        <Sidebar />

        <footer className="site-footer" role="contentinfo">
          <div>© <strong>KenPlay</strong> — Matias Gonzalez Programacion front end IEI-N3-P2-C1 Victor Vasquez </div>
          <div style={{ color: 'var(--muted)' }}>Soporte · Términos · Privacidad</div>
        </footer>
      </div>

      {modal === 'welcome'  && <WelcomeModal />}
      {modal === 'login'    && <LoginModal />}
      {modal === 'register' && <RegisterModal />}
    </>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <ModalProvider>
          <AppContent />
        </ModalProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
