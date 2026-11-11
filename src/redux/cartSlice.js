import { createSlice } from '@reduxjs/toolkit';

/**
 * Séance 6 – Étape 5 : Slice Panier Redux Toolkit
 * Inclut :
 *  - addItem    : Ajouter / incrémenter la quantité
 *  - removeItem : Décrémenter / supprimer si quantité = 0
 *  - clearCart  : Vider intégralement le panier
 *  - Défi 1    : Persistance automatique dans localStorage
 *  - Défi 2    : Système de code promo (POLY2027 → -20%)
 */

// ── Initialisation depuis le localStorage (Défi 1) ───────────────────────────
const chargerPanierSauvegarde = () => {
  try {
    const sauvegarde = localStorage.getItem('techstore_cart');
    return sauvegarde ? JSON.parse(sauvegarde) : [];
  } catch {
    return [];
  }
};

const sauvegarderPanier = (items) => {
  localStorage.setItem('techstore_cart', JSON.stringify(items));
};

const initialState = {
  items: chargerPanierSauvegarde(),   // Tableau : [{ id, name, price, quantity, icon, stock }]
  totalCount: 0,                       // Nombre total d'articles
  totalPrice: 0,                       // Montant total en DT
  discountPercent: 0,                  // Défi 2 : pourcentage de réduction
  discountAmount: 0,                   // Montant de la réduction calculée
  finalPrice: 0,                       // Prix après réduction
  promoApplied: false,                 // Défi 2 : indicateur promo active
};

// ── Recalcul automatique des totaux ─────────────────────────────────────────
const recalculateTotals = (state) => {
  state.totalCount = state.items.reduce((sum, item) => sum + item.quantity, 0);
  state.totalPrice = state.items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  // Recalcul de la remise si un code promo est actif (Défi 2)
  if (state.discountPercent > 0) {
    state.discountAmount = Math.round(
      (state.totalPrice * state.discountPercent) / 100
    );
    state.finalPrice = state.totalPrice - state.discountAmount;
  } else {
    state.discountAmount = 0;
    state.finalPrice = state.totalPrice;
  }
};

// Initialiser les totaux au démarrage (panier restauré depuis localStorage)
recalculateTotals(initialState);

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    // 1. Ajouter un article (ou incrémenter la quantité si déjà présent)
    //    Défi 3 : respecte le stock maximum
    addItem: (state, action) => {
      const existing = state.items.find((item) => item.id === action.payload.id);
      if (existing) {
        const stockMax = action.payload.stock ?? Infinity;
        if (existing.quantity < stockMax) {
          existing.quantity += 1; // Mutation directe grâce à Immer !
        }
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
      recalculateTotals(state);
      sauvegarderPanier(state.items); // Défi 1 : persistance automatique
    },

    // 2. Diminuer la quantité (ou supprimer si quantité tombe à 0)
    removeItem: (state, action) => {
      const existing = state.items.find((item) => item.id === action.payload);
      if (existing) {
        if (existing.quantity > 1) {
          existing.quantity -= 1;
        } else {
          state.items = state.items.filter((item) => item.id !== action.payload);
        }
      }
      recalculateTotals(state);
      sauvegarderPanier(state.items); // Défi 1
    },

    // 3. Vider intégralement le panier
    clearCart: (state) => {
      state.items = [];
      state.totalCount = 0;
      state.totalPrice = 0;
      state.discountPercent = 0;
      state.discountAmount = 0;
      state.finalPrice = 0;
      state.promoApplied = false;
      sauvegarderPanier([]); // Défi 1
    },

    // 4. Appliquer un code promo (Défi 2)
    // Code valide : "POLY2027" → 20% de réduction
    applyPromoCode: (state, action) => {
      const code = action.payload?.trim().toUpperCase();
      if (code === 'POLY2027') {
        state.discountPercent = 20;
        state.promoApplied = true;
      } else {
        state.discountPercent = 0;
        state.promoApplied = false;
      }
      recalculateTotals(state);
    },
  },
});

export const { addItem, removeItem, clearCart, applyPromoCode } = cartSlice.actions;
export default cartSlice.reducer;
