import React, { useState, useEffect } from 'react';

/**
 * Séance 5 – Étape 6 : Chronomètre automatique
 * Démontre useEffect avec fonction de nettoyage (cleanup)
 * pour éviter les fuites mémoire (memory leaks)
 */
export default function AutoTimer() {
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(true);

  useEffect(() => {
    let intervalId = null;

    if (isRunning) {
      // 1. Démarrage du timer
      intervalId = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
    }

    // 2. Fonction de nettoyage OBLIGATOIRE
    // Appelée automatiquement quand isRunning change ou au démontage
    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [isRunning]); // Se relance uniquement si isRunning change

  return (
    <div className="timer-box">
      <span>
        ⏱️ Chronomètre automatique : <strong>{seconds}s</strong>
      </span>
      <button
        className="timer-toggle-btn"
        onClick={() => setIsRunning((prev) => !prev)}
      >
        {isRunning ? '⏸ Pause' : '▶ Reprendre'}
      </button>
    </div>
  );
}
