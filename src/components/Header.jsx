// Importiere useRef-Hook aus React
import { useRef, useContext } from 'react';

// Importiere die CartModal-Komponente
import CartModal from './CartModal.jsx';

import { CartContext } from '../store/shopping-cart-context.jsx';

export default function Header() {
  // Erstelle eine Referenz für das Modal
  const modal = useRef();
  const { items } = useContext(CartContext);

  // Berechne die Anzahl der Artikel im Einkaufswagen
  const cartQuantity = items?.length || 0;

  // Funktion zum Öffnen des Einkaufswagen-Modals
  function handleOpenCartClick() {
    if (modal.current) {
      modal.current.open();
    }
  }

  // Standardmäßig wird nur ein "Close"-Button angezeigt
  let modalActions = <button>Close</button>;

  // Wenn der Einkaufswagen Artikel enthält, füge den "Checkout"-Button hinzu
  if (cartQuantity > 0) {
    modalActions = (
      <>
        <button>Close</button>
        <button>Checkout</button>
      </>
    );
  }

  return (
    <>
      {/* CartModal-Komponente mit Referenz und übergebenen Props */}
      <CartModal ref={modal} title="Your Cart" actions={modalActions} />
      {/* Header-Bereich der Seite */}
      <header id="main-header">
        <div id="main-title">
          {/* Logo und Titel der Seite */}
          <img src="logo.png" alt="Elegant model" />
          <h1>Elegant Context</h1>
        </div>
        <p>
          {/* Einkaufswagen-Button mit der Anzahl der Artikel */}
          <button onClick={handleOpenCartClick}>Cart ({cartQuantity})</button>
        </p>
      </header>
    </>
  );
}
