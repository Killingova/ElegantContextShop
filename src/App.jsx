// Importiere die Header-Komponente
import Header from './components/Header.jsx';
// Importiere die Shop-Komponente
import Shop from './components/Shop.jsx';
import Product from './components/Product.jsx';
// Importiere die Dummy-Produktdaten
import { DUMMY_PRODUCTS } from './dummy-products.js';
import CartContextProvider from './store/shopping-cart-context.jsx';

function App() {
  return (
    <CartContextProvider>
      {/* Header-Komponente mit den aktuellen Einkaufswagen-Daten und der Funktion zum Aktualisieren der Artikelmenge */}
      <Header />
      {/* Shop-Komponente */}
      <Shop>
        {/* Iteriere über die Dummy-Produkte und rendere für jedes Produkt eine Product-Komponente */}
        {DUMMY_PRODUCTS.map((product) => (
          <li key={product.id}>
            {/* Übergibt alle Produkteigenschaften (name, price, description, etc.) an die Product-Komponente */}
            <Product {...product} />
          </li>
        ))}
      </Shop>
    </CartContextProvider>
  );
}

export default App;
