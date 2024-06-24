import PropTypes from 'prop-types';

// Definiere die Shop-Komponente
export default function Shop({ children }) {
  return (
    <section id="shop">
      {/* Überschrift der Shop-Sektion */}
      <h2>Elegant Clothing For Everyone</h2>
      {/* Liste der Produkte */}
      <ul id="products">{children}</ul>
    </section>
  );
}

// PropTypes-Validierung
Shop.propTypes = {
  children: PropTypes.node.isRequired,
};
