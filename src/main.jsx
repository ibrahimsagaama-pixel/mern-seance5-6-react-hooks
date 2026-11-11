import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { ThemeProvider } from './context/ThemeContext';
import App from './App';
import './index.css';

/**
 * Séance 6 – Étape 5 : Point d'entrée de l'application
 * Double encapsulation au sommet de l'arbre :
 *   1. <Provider store={store}> → injecte le Store Redux dans tout l'arbre
 *   2. <ThemeProvider>          → injecte le Contexte Thème dans tout l'arbre
 */
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* 1. Injection du Store Redux Toolkit à la racine */}
    <Provider store={store}>
      {/* 2. Injection du Contexte Thème natif React */}
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>
);
