import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartSlice';

/**
 * Séance 6 – Étape 5 : Store Redux Toolkit centralisé
 * Point d'entrée unique de tout l'état métier de l'application
 */
export const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
});
