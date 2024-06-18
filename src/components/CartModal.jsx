// Importiere notwendige Hooks und Funktionen aus React
import { forwardRef, useImperativeHandle, useRef } from 'react';
// Importiere createPortal aus react-dom, um das Modal in einen bestimmten DOM-Knoten zu rendern
import { createPortal } from 'react-dom';
// Importiere die Cart-Komponente
import Cart from './Cart';

// Definiere die CartModal-Komponente mit forwardRef, um die Weiterleitung von Ref zu ermöglichen
const CartModal = forwardRef(function Modal(
  { cartItems, onUpdateCartItemQuantity, title, actions }, // Destrukturiere die Props
  ref // Ref wird als zweites Argument übergeben
) {
  const dialog = useRef(); // Erstelle eine Referenz für das dialog-Element

  // Verwende useImperativeHandle, um Methoden für die Ref bereitzustellen
  useImperativeHandle(ref, () => ({
    open: () => {
      if (dialog.current) {
        dialog.current.showModal(); // Methode zum Öffnen des Modals
      }
    },
  }));

  // Erstelle ein Portal, um das Modal in einen bestimmten DOM-Knoten zu rendern
  return createPortal(
    <dialog id="modal" ref={dialog}>
      <h2>{title}</h2>
      {/* Cart-Komponente, die die Artikel im Einkaufswagen anzeigt und die Funktion zum Aktualisieren der Artikelmenge erhält */}
      <Cart items={cartItems} onUpdateItemQuantity={onUpdateCartItemQuantity} />
      <form method="dialog" id="modal-actions">
        {/* Aktionen (Buttons) des Modals, wie "Close" und "Checkout" */}
        {actions}
      </form>
    </dialog>,
    document.getElementById('modal') // DOM-Knoten, in den das Modal gerendert wird
  );
});

export default CartModal;
