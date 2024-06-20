import { createContext , useState , useReducer} from "react";
import { DUMMY_PRODUCTS } from "../dummy-products.js";

// Erstelle den CartContext mit einem Standardwert
export const CartContext = createContext({
    items: [] ,
    addItemToCart: () => {},
    updateItemQuantity: () => {},
});    //"CartContext" ist gross geschrieben, weil ein Object erzeugt wird!

function shoppingCartReducer(state, action) {
  return state;
} 

export default function CartContextProvider({children}) {
  const [ shoppingCartState , shoppingCartDispatch] = useReducer(
    shoppingCartReducer, 
    {items: [], // Initialisiere den Einkaufswagen mit einem leeren Array 
  });
      // Definiere den Zustand für den Einkaufswagen mit useState-Hook
  const [shoppingCart, setShoppingCart] = useState({
    items: [], // Initialisiere den Einkaufswagen mit einem leeren Array
  });

  // Funktion zum Hinzufügen eines Artikels zum Einkaufswagen
  function handleAddItemToCart(id) {
    // Aktualisiere den Zustand des Einkaufswagens
    setShoppingCart((prevShoppingCart) => {
      const updatedItems = [...prevShoppingCart.items]; // Erstelle eine Kopie der vorhandenen Artikel im Einkaufswagen

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
        items: updatedItems,
      };
    });
  }

  // Funktion zum Aktualisieren der Menge eines Artikels im Einkaufswagen
  function handleUpdateCartItemQuantity(productId, amount) {
    // Aktualisiere den Zustand des Einkaufswagens
    setShoppingCart((prevShoppingCart) => {
      const updatedItems = [...prevShoppingCart.items]; // Erstelle eine Kopie der vorhandenen Artikel im Einkaufswagen
      const updatedItemIndex = updatedItems.findIndex(
        (item) => item.id === productId
      );

      const updatedItem = {
        ...updatedItems[updatedItemIndex],
      };

      // Aktualisiere die Menge des Artikels
      updatedItem.quantity += amount;

      if (updatedItem.quantity <= 0) {
        // Entferne den Artikel aus dem Einkaufswagen, wenn die Menge <= 0 ist
        updatedItems.splice(updatedItemIndex, 1);
      } else {
        // Andernfalls aktualisiere den Artikel im Einkaufswagen
        updatedItems[updatedItemIndex] = updatedItem;
      }

      // Gib den aktualisierten Zustand zurück
      return {
        items: updatedItems,
      };
    });
  }

  const ctxValue = {
    items: shoppingCartState.items,
    addItemToCart: handleAddItemToCart,
    updateItemQuantity: handleUpdateCartItemQuantity
  };
  return (
    <CartContext.Provider value={ctxValue}>
        {children}
    </CartContext.Provider>
  )
}
