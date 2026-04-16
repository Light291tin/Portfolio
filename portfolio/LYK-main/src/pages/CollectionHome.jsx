import React from 'react';
import { Link } from 'react-router-dom';
import collectionVideo from '../assets/Video Project 2.mp4';
import signatureImage from '../assets/Carte1Proto.jpeg';

const CollectionsPresentation = () => {
  return (
    <div className="container-fluid p-0 fade-in" style={{ marginTop: '100px' }}>
      
      {/* Hero Banner */}
      <div className="position-relative bg-light mb-5" style={{ height: '60vh' }}>
        <video 
          autoPlay loop muted playsInline 
          className="w-100 h-100"
          style={{ objectFit: 'cover', objectPosition: 'center' }}
        >
          <source src={collectionVideo} type="video/mp4" />
        </video>
        <div className="position-absolute top-50 start-50 translate-middle text-center text-white">
          <h1 className="display-3 mb-4" style={{ fontFamily: 'var(--font-title)' }}>Nos Collections</h1>
          <p className="lead mb-4">Une exploration de la forme et de la matière.</p>
        </div>
      </div>

      {/* Liste des collections vedettes */}
      <div className="container py-5">
        <div className="row g-5 align-items-center mb-5">
          <div className="col-md-6">
            <img src={signatureImage} className="img-fluid" alt="Collection Signature" />
          </div>
          <div className="col-md-6 text-center text-md-start">
            <h2 className="display-5 mb-3" style={{ fontFamily: 'var(--font-title)' }}>Collection Signature</h2>
            <p className="text-muted mb-4">Des courbes sculpturales pour un quotidien sublimé.</p>
            <Link to="/collections/signature" className="btn btn-luxe w-auto">Découvrir Signature</Link>
          </div>
        </div>

        {/* Inverse l'ordre pour le rythme visuel */}
        <div className="row g-5 align-items-center">
          <div className="col-md-6 order-md-2">
            <img src="https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800" className="img-fluid" alt="Collection Numéro Neuf" />
          </div>
          <div className="col-md-6 order-md-1 text-center text-md-start">
            <h2 className="display-5 mb-3" style={{ fontFamily: 'var(--font-title)' }}>Numéro Neuf</h2>
            <p className="text-muted mb-4">L'art du drapé cuir, une signature unique.</p>
            <Link to="/collections/numero-neuf" className="btn btn-luxe w-auto">Découvrir Numéro Neuf</Link>
          </div>
        </div>
      </div>

    </div>
  );
};

export default CollectionsPresentation;