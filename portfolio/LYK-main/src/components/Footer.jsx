import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-white pt-3 pb-3 fade-in" style={{ borderTop: '1px solid #f0f0f0' }}>
      <div className="container-fluid px-5">
        
        {/* --- PARTIE 1 : NEWSLETTER --- */}
        <div className="row mb-3 justify-content-between align-items-end">
          <div className="col-md-6 mb-4 mb-md-0">
            <p className="mb-2" style={{ fontFamily: 'var(--font-title)', fontSize: '1.2rem' }}>
              Découvrez les dernières actualités, collections et lancements exclusifs
            </p>
            
            {/* Input Newsletter Style Luxe (Ligne seule) */}
            <form className="position-relative" style={{ maxWidth: '400px' }}>
              <input 
                type="email" 
                placeholder="VOTRE EMAIL" 
                className="footer-input w-100 pb-2"
                required
              />
              <button type="submit" className="footer-submit-btn text-uppercase">
                Valider
              </button>
            </form>
            
            <p className="text-muted mt-2" style={{ fontSize: '0.65rem', maxWidth: '400px' }}>
              En validant mon inscription, j'accepte de recevoir la newsletter. 
              Pour plus d'informations, lire la <Link to="/privacy" className="text-dark text-decoration-underline">Politique de Confidentialité</Link>.
            </p>
          </div>
        </div>

        {/* --- PARTIE 2 : LIENS DE NAVIGATION --- */}
        <div className="row mb-1">
          
          {/* Colonne 1 */}
          <div className="col-6 col-md-2 mb-4">
            <ul className="list-unstyled d-flex flex-column gap-2">
              <li><Link to="/about" className="footer-link">MARQUE</Link></li>
              <li><Link to="/collections/all" className="footer-link">BOUTIQUES</Link></li>
              <li><Link to="/craftsmanship" className="footer-link">SAVOIR-FAIRE</Link></li>
            </ul>
          </div>

          {/* Colonne 2 */}
          <div className="col-6 col-md-2 mb-4">
            <ul className="list-unstyled d-flex flex-column gap-2">
              <li><Link to="/shipping" className="footer-link">LIVRAISON & TAXES</Link></li>
              <li><Link to="/returns" className="footer-link">EFFECTUER UN RETOUR</Link></li>
              <li><Link to="/help" className="footer-link">AIDE & QUESTIONS</Link></li>
            </ul>
          </div>

          {/* Colonne 3 */}
          <div className="col-6 col-md-3 mb-4">
            <ul className="list-unstyled d-flex flex-column gap-2">
              <li><Link to="/terms" className="footer-link">CONDITIONS GÉNÉRALES DE VENTE</Link></li>
              <li><Link to="/legal" className="footer-link">MENTIONS LÉGALES</Link></li>
              <li><Link to="/privacy" className="footer-link">POLITIQUE DE CONFIDENTIALITÉ</Link></li>
            </ul>
          </div>

          {/* Colonne 4 : Réseaux */}
          <div className="col-6 col-md-2 mb-4">
            <ul className="list-unstyled d-flex flex-column gap-2">
              <li><a href="#" className="footer-link">INSTAGRAM</a></li>
              <li><a href="#" className="footer-link">TIKTOK</a></li>
            </ul>
          </div>

          {/* Colonne 5 : Paiement (Alignée à droite sur desktop) */}
          <div className="col-md-3 d-flex justify-content-md-end align-items-start gap-3 mt-4 mt-md-0">
            <svg style={{width:'35px'}} viewBox="0 0 32 20" xmlns="http://www.w3.org/2000/svg"><path d="M12 10.1C12 13 13.3 15.6 15.2 17.3 13.5 18.4 11.5 19 9.3 19 4.2 19 0 14.8 0 9.7 0 4.6 4.2.4 9.3.4c2.2 0 4.2.7 5.9 1.7C13.3 3.9 12 6.4 12 9.3V10.1z" fill="#1a1a1a"/><path d="M22.7.4c5.1 0 9.3 4.2 9.3 9.3 0 5.1-4.2 9.3-9.3 9.3-2.2 0-4.2-.7-5.9-1.7 1.9-1.8 3.2-4.3 3.2-7.2 0-2.9-1.3-5.4-3.2-7.2C18.5 1 20.5.4 22.7.4z" fill="#1a1a1a"/><path d="M15.2 2.1C17.1 3.9 18.4 6.4 18.4 9.3c0 2.9-1.3 5.4-3.2 7.2C13.3 14.7 12 12.2 12 9.3c0-2.9 1.3-5.4 3.2-7.2z" fill="#1a1a1a"/></svg>
            <span className="small fw-bold">PayPal</span>
            <span className="small fw-bold">Klarna.</span>
          </div>

        </div>

        {/* --- PARTIE 3 : COPYRIGHT --- */}
        <div className="row border-top border-light pt-4">
          <div className="col-12 text-center">
            <p className="text-muted text-uppercase" style={{ fontSize: '0.65rem', letterSpacing: '2px' }}>
              © LYK 2026
            </p>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;