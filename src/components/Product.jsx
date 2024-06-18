import { useContext } from 'react';
import { CartContext } from '../store/shopping-cart-context.jsx';

// Definiere die Product-Komponente und de-strukturiere die Props
export default function Product({ id, image, title, price, description }) {
  const { addItemToCart } = useContext(CartContext);

  const defaultImage = "path_to_default_image"; // Pfad zum Standardbild
  const formattedPrice = `$${price.toFixed(2)}`; // Formatierung des Preises

  return (
    <article className="product">
      {/* Bild des Produkts */}
      <img src={image || defaultImage} alt={title || "Product image"} />
      <div className="product-content">
        <div>
          {/* Titel des Produkts */}
          <h3>{title || "No Title"}</h3>
          {/* Preis des Produkts */}
          <p className="product-price">{formattedPrice}</p>
          {/* Beschreibung des Produkts */}
          <p>{description || "No description available"}</p>
        </div>
        <p className="product-actions">
          {/* Button, um das Produkt zum Warenkorb hinzuzufügen, ruft die addItemToCart-Funktion mit der Produkt-ID auf */}
          <button onClick={() => addItemToCart(id)}>Add to Cart</button>
        </p>
      </div>
    </article>
  );
}
