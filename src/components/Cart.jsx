import { useContext } from 'react';
import { CartContext } from '../store/shopping-cart-context.jsx';

// Definiere die Cart-Komponente
export default function Cart() {
  const { items, updateItemQuantity } = useContext(CartContext);

  // Berechne den Gesamtpreis der Artikel im Einkaufswagen
  const totalPrice = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  // Formatiere den Gesamtpreis auf zwei Dezimalstellen
  const formattedTotalPrice = `$${totalPrice.toFixed(2)}`;

  return (
    <div id="cart">
      {/* Zeige eine Nachricht an, wenn keine Artikel im Einkaufswagen sind */}
      {items.length === 0 && <p>No items in cart!</p>}
      {/* Zeige die Artikel im Einkaufswagen an, wenn welche vorhanden sind */}
      {items.length > 0 && (
        <ul id="cart-items">
          {items.map((item) => {
            // Formatiere den Preis des einzelnen Artikels auf zwei Dezimalstellen
            const formattedPrice = `$${item.price.toFixed(2)}`;

            return (
              <li key={item.id}>
                <div>
                  <span>{item.name}</span>
                  <span> ({formattedPrice})</span>
                </div>
                {/* Bereich für die Aktionen an den Einkaufswagenartikeln (Menge erhöhen/verringern) */}
                <div className="cart-item-actions">
                  {/* Button zum Verringern der Menge */}
                  <button onClick={() => updateItemQuantity(item.id, -1)}>
                    -
                  </button>
                  {/* Anzeige der aktuellen Menge */}
                  <span>{item.quantity}</span>
                  {/* Button zum Erhöhen der Menge */}
                  <button onClick={() => updateItemQuantity(item.id, 1)}>
                    +
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      )}
      {/* Anzeige des Gesamtpreises des Einkaufswagens */}
      <p id="cart-total-price">
        Cart Total: <strong>{formattedTotalPrice}</strong>
      </p>
    </div>
  );
}
