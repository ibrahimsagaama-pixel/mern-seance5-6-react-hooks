import React, { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';
import { useSelector } from 'react-redux';

/**
 * Séance 6 – Étape 6 : Barre de navigation
 * Coexistence parfaite : useContext (thème) + useSelector (panier Redux)
 */
export default function Navbar() {
  // Consommation de l'état léger (thème) via useContext
  const { theme, toggleTheme } = useContext(ThemeContext);

  // Consommation ciblée de l'état Redux via useSelector
  // Sélecteur minimal → seul ce composant re-rend si totalCount change
  const totalCount = useSelector((state) => state.cart.totalCount);

  return (
    <nav className="navbar">
      <div className="nav-brand">
        <span className="logo-icon">🛒</span>
        <h2>
          TechStore <span className="badge-mern">MERN S6</span>
        </h2>
      </div>

      <div className="nav-actions">
        <button className="btn-theme-toggle" onClick={toggleTheme}>
          {theme === 'light' ? '🌙 Mode Sombre' : '☀️ Mode Clair'}
        </button>

        <div className="cart-badge">
          <span className="cart-icon">🛍️</span>
          <span className="badge-count">{totalCount}</span>
        </div>
      </div>
    </nav>
  );
}
