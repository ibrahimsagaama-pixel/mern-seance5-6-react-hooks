import React, { createContext, useState, useContext, useEffect } from 'react';

/**
 * Séance 6 – Étape 2 : Contexte de Thème (Clair / Sombre)
 * Triptyque : createContext → Provider → useContext
 */

// 1. Création de l'objet Contexte (sentinelle partagée)
export const ThemeContext = createContext();

/**
 * 2. Composant Fournisseur (Provider) qui héberge l'état
 *    et l'injecte à tous ses enfants sans prop drilling.
 */
export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('app_theme') || 'light';
  });

  // Synchroniser l'attribut CSS du <body> pour l'application des variables CSS
  useEffect(() => {
    document.body.className = theme === 'dark' ? 'dark' : '';
    localStorage.setItem('app_theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

/**
 * 3. Hook personnalisé pour une consommation propre et sécurisée
 *    Lance une erreur explicite si utilisé hors du Provider.
 */
export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme doit être utilisé au sein d'un ThemeProvider");
  }
  return context;
}
