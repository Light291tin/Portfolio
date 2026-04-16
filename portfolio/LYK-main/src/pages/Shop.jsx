import React from 'react';
import { Link } from 'react-router-dom';
import { products } from '../data/mockData';

const Shop = () => {
  return (
    <div className="container-fluid" style={{ marginTop: '120px' }}> {/* Marge pour ne pas être sous la navbar */}
      <h1 className="text-center mb-5" style={{ fontFamily: 'Playfair Display, serif' }}>Collection Signature</h1>
      
      <div className="row g-4 px-5">
        {products.map((product) => (
          <div key={product.id} className="col-12 col-md-6 col-lg-4">
            <div className="card border-0 h-100 text-center">
              {/* Le lien entoure l'image pour aller vers la page produit */}
              <Link to={`/products/${product.id}`}>
                <img src={product.image} className="card-img-top bg-light" alt={product.name} style={{ height: '400px', objectFit: 'contain' }} />
              </Link>
              <div className="card-body">
                <h5 className="card-title" style={{ fontFamily: 'Playfair Display, serif' }}>{product.name}</h5>
                <p className="card-text text-muted">{product.price} €</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Shop;