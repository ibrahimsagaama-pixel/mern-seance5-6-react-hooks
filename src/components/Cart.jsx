import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addItem, removeItem, clearCart, applyPromoCode } from '../redux/cartSlice';

/**
 * Séance 6 – Étape 6 : Panier réactif Redux
 * Inclut :
 *  - Affichage des articles avec contrôle des quantités
 *  - Total articles et montant total
 *  - Défi 1 : données persistées automatiquement via le slice
 *  - Défi 2 : champ code promo + affichage de la réduction
 */
export default function Cart() {
  const { items, totalCount, totalPrice, discountPercent, discountAmount, finalPrice, promoApplied } =
    useSelector((state) => state.cart);
  const dispatch = useDispatch();

  // État local pour le champ de saisie du code promo
  const [promoCode, setPromoCode] = useState('');
  const [promoError, setPromoError] = useState('');

  const handleApplyPromo = () => {
    if (items.length === 0) {
      setPromoError('Ajoutez des articles avant d\'appliquer un code promo.');
      return;
    }
    dispatch(applyPromoCode(promoCode));
    if (promoCode.trim().toUpperCase() !== 'POLY2027') {
      setPromoError('Code invalide. Essayez POLY2027 🎓');
    } else {
      setPromoError('');
    }
  };

  return (
    <div className="cart-card">
      {/* En-tête */}
      <div className="cart-header">
        <h3>🛒 Mon Panier Redux</h3>
        {items.length > 0 && (
          <button className="btn-clear" onClick={() => dispatch(clearCart())}>
            🗑️ Vider
          </button>
        )}
      </div>

      {/* Panier vide */}
      {items.length === 0 ? (
        <div className="cart-empty">
          <p>Le panier est actuellement vide.</p>
          <span className="empty-subtext">
            Ajoutez un article pour observer la réactivité de Redux.
          </span>
        </div>
      ) : (
        <div className="cart-body">
          {/* Liste des articles */}
          <div className="cart-items-container">
            {items.map((item) => (
              <div key={item.id} className="cart-row">
                <span className="cart-item-icon">{item.icon}</span>
                <div className="cart-item-details">
                  <span className="cart-item-name">{item.name}</span>
                  <span className="cart-item-price">
                    {item.price} DT × {item.quantity} ={' '}
                    <strong>{item.price * item.quantity} DT</strong>
                  </span>
                </div>
                <div className="cart-item-qty">
                  <button
                    className="btn-qty"
                    onClick={() => dispatch(removeItem(item.id))}
                  >
                    −
                  </button>
                  <span className="qty-number">{item.quantity}</span>
                  <button
                    className="btn-qty"
                    onClick={() => dispatch(addItem(item))}
                    disabled={item.quantity >= (item.stock ?? Infinity)}
                  >
                    +
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Zone code promo (Défi 2) */}
          <div className="promo-section">
            <input
              type="text"
              className="promo-input"
              placeholder="Code promo (ex. POLY2027)"
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleApplyPromo()}
            />
            <button className="btn-promo" onClick={handleApplyPromo}>
              Appliquer
            </button>
          </div>
          {promoError && (
            <p style={{ fontSize: '0.8rem', color: 'var(--danger)', marginTop: '4px' }}>
              {promoError}
            </p>
          )}

          {/* Totaux */}
          <div className="cart-total-box">
            <div className="total-row">
              <span>Nombre total d'articles :</span>
              <strong>{totalCount}</strong>
            </div>
            <div className="total-row">
              <span>Sous-total :</span>
              <strong>{totalPrice} DT</strong>
            </div>

            {/* Remise (Défi 2) */}
            {promoApplied && (
              <>
                <div className="total-row discount-info">
                  <span>🎉 Remise {discountPercent}% (POLY2027) :</span>
                  <strong>-{discountAmount} DT</strong>
                </div>
                <div className="total-row total-highlight">
                  <span>Montant Total :</span>
                  <strong className="total-amount">{finalPrice} DT</strong>
                </div>
              </>
            )}

            {!promoApplied && (
              <div className="total-row total-highlight">
                <span>Montant Total :</span>
                <strong className="total-amount">{totalPrice} DT</strong>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
