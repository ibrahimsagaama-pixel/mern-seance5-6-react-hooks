import React, { useState, useEffect } from 'react';

/**
 * Séance 5 – Étapes 3, 4, 5 & Défis 1, 2, 3
 * Compteur réactif complet avec :
 *  - useState : count, step, message, totalClics, historique
 *  - useEffect : titre onglet + persistance localStorage
 *  - Défi 1 : bornes min/max ±50
 *  - Défi 2 : sauvegarde/restauration de l'historique dans localStorage
 *  - Défi 3 : contrôle au clavier (ArrowUp / ArrowDown) + nettoyage
 */

const MIN = -50;
const MAX = 50;

export default function Counter() {
  // ── État count : initialisé depuis localStorage ──────────────────────────
  const [count, setCount] = useState(() => {
    const sauvegarde = localStorage.getItem('mon_compteur_valeur');
    return sauvegarde !== null ? parseInt(sauvegarde, 10) : 0;
  });

  // ── Autres états simples ──────────────────────────────────────────────────
  const [step, setStep] = useState(1);
  const [message, setMessage] = useState('Aucun clic pour le moment');
  const [totalClics, setTotalClics] = useState(0);
  const [alerteMessage, setAlerteMessage] = useState('');

  // ── Historique : initialisé depuis localStorage (Défi 2) ─────────────────
  const [historique, setHistorique] = useState(() => {
    try {
      const sauvegarde = localStorage.getItem('mon_compteur_historique');
      return sauvegarde ? JSON.parse(sauvegarde) : [];
    } catch {
      return [];
    }
  });

  // ── Effet A : Synchroniser le titre de l'onglet ───────────────────────────
  useEffect(() => {
    document.title = `Compteur : ${count}`;
  }, [count]);

  // ── Effet B : Sauvegarde automatique de count ────────────────────────────
  useEffect(() => {
    localStorage.setItem('mon_compteur_valeur', count.toString());
  }, [count]);

  // ── Effet C : Sauvegarde automatique de l'historique (Défi 2) ───────────
  useEffect(() => {
    localStorage.setItem('mon_compteur_historique', JSON.stringify(historique));
  }, [historique]);

  // ── Effet D : Contrôle clavier (Défi 3) ─────────────────────────────────
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        incrementer();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        decrementer();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    // Nettoyage obligatoire pour éviter la fuite mémoire
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [count, step]); // Dépend de count et step pour avoir les valeurs à jour

  // ── Helpers ───────────────────────────────────────────────────────────────
  const afficherAlerte = (msg) => {
    setAlerteMessage(msg);
    setTimeout(() => setAlerteMessage(''), 2500);
  };

  const incrementer = () => {
    const nouveau = count + step;
    if (nouveau > MAX) {
      afficherAlerte(`Seuil maximal de ${MAX} atteint !`);
      return;
    }
    setCount(nouveau);
    setMessage(`Ajout de ${step}`);
    setTotalClics((prev) => prev + 1);
    setHistorique((prev) => [...prev, `+${step}`]);
  };

  const decrementer = () => {
    const nouveau = count - step;
    if (nouveau < MIN) {
      afficherAlerte(`Seuil minimal de ${MIN} atteint !`);
      return;
    }
    setCount(nouveau);
    setMessage(`Retrait de ${step}`);
    setTotalClics((prev) => prev + 1);
    setHistorique((prev) => [...prev, `-${step}`]);
  };

  const reinitialiser = () => {
    setCount(0);
    setMessage('Remise à zéro');
    setTotalClics((prev) => prev + 1);
    setHistorique([]);
  };

  // ── Classe CSS dynamique selon le signe ──────────────────────────────────
  const getStyleClass = () => {
    if (count > 0) return 'counter-display positive';
    if (count < 0) return 'counter-display negative';
    return 'counter-display zero';
  };

  const peutIncrementer = count + step <= MAX;
  const peutDecrementer = count - step >= MIN;

  return (
    <div className="counter-card">
      {/* Affichage principal */}
      <div className={getStyleClass()}>{count}</div>

      {/* Boutons d'action */}
      <div className="btn-group">
        <button
          className="btn btn-dec"
          onClick={decrementer}
          disabled={!peutDecrementer}
        >
          -{step}
        </button>
        <button className="btn btn-reset" onClick={reinitialiser}>
          Reset
        </button>
        <button
          className="btn btn-inc"
          onClick={incrementer}
          disabled={!peutIncrementer}
        >
          +{step}
        </button>
      </div>

      {/* Alerte seuil (Défi 1) */}
      {alerteMessage && <div className="alert-message">⚠️ {alerteMessage}</div>}

      {/* Sélecteur de pas */}
      <div className="step-control">
        <label>Pas d'incrémentation :</label>
        <select
          value={step}
          onChange={(e) => setStep(parseInt(e.target.value, 10))}
        >
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="5">5</option>
          <option value="10">10</option>
        </select>
      </div>

      {/* Historique & stats */}
      <div className="history-card">
        <p>
          <strong>Dernière action :</strong> {message}
        </p>
        <p>
          <strong>Total des clics :</strong> {totalClics}
        </p>
        {historique.length > 0 && (
          <p>
            <strong>Historique :</strong> {historique.join(', ')}
          </p>
        )}
      </div>

      {/* Indice clavier (Défi 3) */}
      <p className="keyboard-hint">
        Utilisez <kbd>↑</kbd> et <kbd>↓</kbd> pour contrôler le compteur au clavier
      </p>
    </div>
  );
}
