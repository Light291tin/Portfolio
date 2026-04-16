import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { products } from '../data/mockData';

const CollectionPage = () => {
  // On récupère le nom de la collection depuis l'URL (ex: "cyme" ou "all")
  const { collectionName } = useParams();

  // FILTRAGE
  const filteredProducts = collectionName === 'all' 
    ? products // Si c'est "all", on garde tout
    : products.filter(p => p.collection === collectionName || p.category === collectionName);

  // Titre propre (ex: "numero-neuf" devient "Numéro Neuf")
  const formatTitle = (slug) => {
    if (slug === 'all') return 'Toute la collection';
    return slug.replace(/-/g, ' '); // Remplace les tirets par des espaces
  };

  return (
    <div className="container fade-in" style={{ marginTop: '120px', marginBottom: '100px' }}>
      
      {/* En-tête de la collection */}
      <div className="text-center mb-5">
        <h6 className="text-uppercase text-muted letter-spacing-2 mb-3">Collection</h6>
        <h1 className="display-4 text-uppercase" style={{ fontFamily: 'var(--font-title)' }}>
          {formatTitle(collectionName)}
        </h1>
        <p className="text-muted mx-auto mt-3" style={{ maxWidth: '600px' }}>
          Découvrez nos pièces iconiques, fabriquées à la main en Espagne.
        </p>
      </div>

      {/* Grille de produits */}
      <div className="row g-4">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div key={product.id} className="col-6 col-md-4 col-lg-3">
              <Link to={`/products/${product.id}`} className="text-decoration-none text-dark">
                <div className="product-card position-relative mb-3">
                  {/* Image */}
                  <div className="overflow-hidden bg-light mb-3" style={{ aspectRatio: '3/4' }}>
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-100 h-100"
                      style={{ objectFit: 'cover', mixBlendMode: 'multiply', transition: 'transform 0.5s ease' }}
                      onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                      onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
                    />
                  </div>
                  
                  {/* Infos */}
                  <div className="text-center">
                    <h3 className="h6 text-uppercase mb-1" style={{ letterSpacing: '1px' }}>{product.name}</h3>
                    <p className="text-muted small">{product.price} €</p>
                  </div>
                </div>
              </Link>
            </div>
          ))
        ) : (
          <div className="col-12 text-center py-5">
            <p>Aucun produit trouvé dans cette collection pour le moment.</p>
            <Link to="/collections/all" className="btn btn-luxe w-auto">Voir tout</Link>
          </div>
        )}
      </div>

    </div>
  );
};

export default CollectionPage;