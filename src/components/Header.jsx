import React from 'react';

/**
 * Séance 5 – Étape 2 : Composant d'en-tête
 * Reçoit deux props : titre et sousTitre
 * Démontre la zone logique JS + retour JSX
 */
export default function Header({ titre, sousTitre }) {
  // --- Zone A : Logique JavaScript pure ---
  const dateDuJour = new Date().toLocaleDateString('fr-FR', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  // --- Zone B : Retour JSX ---
  return (
    <header className="header">
      <h1>{titre}</h1>
      <p>{sousTitre}</p>
      <small style={{ color: 'rgba(255,255,255,0.7)', display: 'block', marginTop: '6px' }}>
        Date de la session : {dateDuJour}
      </small>
    </header>
  );
}
