import { createContext, useReducer } from 'react';
import { DUMMY_PRODUCTS } from '../dummy-products.js';

// Erstelle den CartContext mit einem Standardwert
export const CartContext = createContext({
  items: [],
  addItemToCart: () => {},
  updateItemQuantity: () => {},
}); // "CartContext" ist groß geschrieben, weil ein Objekt erzeugt wird!

// Der Reducer für den Einkaufswagen
function shoppingCartReducer(state, action) {
  switch (action.type) {
    case 'ADD_ITEM': {
      const updatedItems = [...state.items]; // Erstelle eine Kopie der vorhandenen Artikel im Einkaufswagen
      const id = action.payload; // Hole die Produkt-ID aus der Aktion

      // Überprüfe, ob der Artikel bereits im Einkaufswagen ist
      const existingCartItemIndex = updatedItems.findIndex(
        (cartItem) => cartItem.id === id
      );
      const existingCartItem = updatedItems[existingCartItemIndex];

      if (existingCartItem) {
        // Wenn der Artikel bereits im Einkaufswagen ist, erhöhe die Menge
        const updatedItem = {
          ...existingCartItem,
          quantity: existingCartItem.quantity + 1,
        };
        updatedItems[existingCartItemIndex] = updatedItem;
      } else {
        // Wenn der Artikel noch nicht im Einkaufswagen ist, füge ihn hinzu
        const product = DUMMY_PRODUCTS.find((product) => product.id === id);
        updatedItems.push({
          id: id,
          name: product.title,
          price: product.price,
          quantity: 1,
        });
      }

      // Gib den aktualisierten Zustand zurück
      return {
        ...state, // zuerst den alten Zustand ausbreiten und kopieren
        items: updatedItems, // dann aktualisieren wir einfach den einen Wert in unserem Status
      };
    }
    case 'UPDATE_ITEM': {
      const updatedItems = [...state.items]; // Erstelle eine Kopie der vorhandenen Artikel im Einkaufswagen
      const { productId, amount } = action.payload; // Hole die Produkt-ID und Menge aus der Aktion

      const updatedItemIndex = updatedItems.findIndex(
        (item) => item.id === productId
      );
      const updatedItem = { ...updatedItems[updatedItemIndex] };

      updatedItem.quantity += amount;

      // Entferne den Artikel, wenn die Menge 0 oder weniger wird
      if (updatedItem.quantity <= 0) {
        updatedItems.splice(updatedItemIndex, 1);
      } else {
        updatedItems[updatedItemIndex] = updatedItem;
      }

      // Gib den aktualisierten Zustand zurück
      return {
        ...state, // zuerst den alten Zustand ausbreiten und kopieren
        items: updatedItems, // dann aktualisieren wir einfach den einen Wert in unserem Status
      };
    }
    default:
      return state; // Falls keine Aktion zutrifft, den Zustand unverändert zurückgeben
  }
}

export default function CartContextProvider({ children }) {
  // Initialisiere den Einkaufswagenzustand mit useReducer
  const [shoppingCartState, shoppingCartDispatch] = useReducer(
    shoppingCartReducer,
    {
      items: [], // Initialisiere den Einkaufswagen mit einem leeren Array
    }
  );

  // Funktion zum Hinzufügen eines Artikels zum Einkaufswagen
  function handleAddItemToCart(id) {
    shoppingCartDispatch({
      // eine Aktion kann alles sein, aber in den meisten Fällen ist es ein Objekt
      // Eigenschaft, die angibt, welche Art von Änderung vorgenommen werden soll
      type: 'ADD_ITEM',
      // Payload sind zusätzliche Daten, die für die Zustandsänderung erforderlich sind und als weitere Eigenschaften hinzugefügt werden.
      payload: id,
    });
  }

  // Funktion zum Aktualisieren der Menge eines Artikels im Einkaufswagen
  function handleUpdateCartItemQuantity(productId, amount) {
    shoppingCartDispatch({
      type: 'UPDATE_ITEM',
      payload: {
        productId,
        amount,
      },
    });
  }

  // Kontextwert, der in den Provider eingefügt wird
  const ctxValue = {
    items: shoppingCartState.items,
    addItemToCart: handleAddItemToCart,
    updateItemQuantity: handleUpdateCartItemQuantity,
  };

  return (
    <CartContext.Provider value={ctxValue}>
      {children}
    </CartContext.Provider>
  );
}
