import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from '../redux/cartSlice';

/**
 * Séance 6 – Étape 6 : Catalogue produits
 * Chaque bouton déclenche dispatch(addItem(produit))
 * Défi 3 : stock limité → bouton désactivé si stock épuisé
 */

const PRODUCTS = [
  { id: 1, name: 'Écran UltraWide 4K 34"',      price: 850, category: 'Affichage',    icon: '🖥️',  stock: 3 },
  { id: 2, name: 'Clavier Mécanique RGB',         price: 180, category: 'Périphérique', icon: '⌨️',  stock: 3 },
  { id: 3, name: 'Souris Sans Fil Ergonomique',   price: 95,  category: 'Accessoire',   icon: '🖱️',  stock: 3 },
  { id: 4, name: 'Casque Haute Fidélité ANC',     price: 320, category: 'Audio',        icon: '🎧', stock: 3 },
];

export default function ProductList() {
  const dispatch = useDispatch();

  // Défi 3 : lire le panier pour vérifier les quantités vs stock
  const cartItems = useSelector((state) => state.cart.items);

  const getQuantiteEnPanier = (productId) => {
    const item = cartItems.find((i) => i.id === productId);
    return item ? item.quantity : 0;
  };

  return (
    <div className="product-section">
      <div className="section-title-box">
        <h3>🛍️ Catalogue Produits</h3>
        <p className="subtitle-hint">
          Chaque clic déclenche une action via dispatch(addItem(p)).
        </p>
      </div>

      <div className="product-grid">
        {PRODUCTS.map((product) => {
          const qteEnPanier = getQuantiteEnPanier(product.id);
          const enRupture = qteEnPanier >= product.stock; // Défi 3

          return (
            <div key={product.id} className="product-card">
              <div className="card-top">
                <span className="product-icon">{product.icon}</span>
                <span className="product-category">{product.category}</span>
              </div>

              <h4 className="product-title">{product.name}</h4>

              <div className="card-bottom">
                <span className="product-price">{product.price} DT</span>
                <button
                  className="btn btn-add"
                  onClick={() => dispatch(addItem(product))}
                  disabled={enRupture}
                  title={enRupture ? 'Stock épuisé' : `Ajouter au panier`}
                >
                  {enRupture ? '🚫 Rupture' : '+ Ajouter'}
                </button>
              </div>

              {/* Indicateur de stock (Défi 3) */}
              <span className="stock-badge">
                Stock : {product.stock - qteEnPanier}/{product.stock}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
