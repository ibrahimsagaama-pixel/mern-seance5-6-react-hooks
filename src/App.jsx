import React, { useState } from 'react';
import './index.css';

// ── Séance 5 ───────────────────────────────────────────
import Header from './components/Header';
import Counter from './components/Counter';
import AutoTimer from './components/AutoTimer';

// ── Séance 6 ───────────────────────────────────────────
import Navbar from './components/Navbar';
import ProductList from './components/ProductList';
import Cart from './components/Cart';

/**
 * Composant racine – App.jsx
 * Assemble l'ensemble des composants des Séances 5 et 6
 */
export default function App() {
  // État local pour afficher/masquer le chronomètre (Séance 5 – Étape 6)
  const [showTimer, setShowTimer] = useState(true);

  return (
    <>
      {/* ── Séance 6 : Navbar avec thème et badge panier ── */}
      <Navbar />

      <div className="app-container">
        {/* ── Séance 5 : En-tête avec props ── */}
        <Header
          titre="Mon Super Compteur React"
          sousTitre="Maîtrise des Hooks fondamentaux useState et useEffect"
        />

        {/* ── Séance 5 : Compteur réactif (useState + useEffect + Défis 1,2,3) ── */}
        <Counter />

        {/* ── Séance 5 : Chronomètre masquable (useEffect + cleanup) ── */}
        <button
          className="show-timer-btn"
          onClick={() => setShowTimer((prev) => !prev)}
        >
          {showTimer ? '⏸ Masquer le Chronomètre' : '▶ Afficher le Chronomètre'}
        </button>

        {showTimer && <AutoTimer />}

        {/* ── Séance 6 : Catalogue produits (Redux dispatch) ── */}
        <ProductList />

        {/* ── Séance 6 : Panier Redux (useSelector + Défis 1,2,3) ── */}
        <Cart />
      </div>
    </>
  );
}
