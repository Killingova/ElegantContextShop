import { createContext } from "react";

// Erstelle den CartContext mit einem Standardwert
export const CartContext = createContext({
    items: [] ,
    addItemToCart: () => {},
});    //"CartContext" ist gross geschrieben, weil ein Object erzeugt wird!
