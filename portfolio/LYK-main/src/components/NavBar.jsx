import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import collectionPreview from '../assets/Carte1Proto.jpeg';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  
  // --- GESTION DE L'IMAGE DYNAMIQUE ---
  // Image par défaut (celle qui s'affiche à l'ouverture)
  const defaultImage = "https://fr.polene-paris.com/cdn/shop/files/Polene_Sacs_Cyme_Mini_Graine_Camel_p_f2468305-6490-449e-990a-a56762299863.jpg?v=1729090620&width=600";
  
  // État de l'image active
  const [activeImage, setActiveImage] = useState(defaultImage);

  const location = useLocation();
  const isHomePage = location.pathname === '/';

  // Remet l'image par défaut quand le menu se ferme
  useEffect(() => {
    if (!showMenu) {
      const timer = setTimeout(() => setActiveImage(defaultImage), 300);
      return () => clearTimeout(timer);
    }
  }, [showMenu]);

  // Détection du scroll
  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isTransparent = isHomePage && !scrolled && !showMenu;

  const navbarClasses = isTransparent 
    ? 'navbar navbar-expand-md fixed-top w-100 p-4 bg-transparent border-bottom border-white border-opacity-25' 
    : 'navbar navbar-expand-md fixed-top w-100 p-4 bg-white shadow-sm transition-all';

  const textClasses = isTransparent ? 'text-white' : 'text-dark';

  // Fonction pour changer l'image
  const changeImage = (url) => {
    setActiveImage(url);
  };

  return (
    <header className={showMenu ? 'mega-menu-active' : ''}>
      <nav className={navbarClasses}>
        <div className="container-fluid">
          
          {/* === MENU GAUCHE === */}
          <div className="d-none d-md-flex gap-4 text-uppercase small fw-bold align-items-center h-100">
            
            {/* LIEN COLLECTIONS */}
            <div 
              className="position-static h-100 d-flex align-items-center"
              onMouseEnter={() => setShowMenu(true)}
              onMouseLeave={() => setShowMenu(false)}
            >
              <Link to="/collections-presentation" className={`text-decoration-none ${textClasses} py-3`}>
                Collections
              </Link>

              {/* --- LE MEGA MENU --- */}
              <div className="mega-menu-container text-start">
                <div className="container">
                  <div className="row">
                    
                    {/* Colonne 1 : Par Collection */}
                    <div className="col-3">
                      <span className="mega-menu-title">Par collection</span>
                      
                      <Link 
                        to="/collections/signature" 
                        className="mega-menu-link"
                        onMouseEnter={() => changeImage(collectionPreview)} 
                      >
                        Signature
                      </Link>
                      
                      <Link 
                        to="/collections/green" 
                        className="mega-menu-link"
                        onMouseEnter={() => changeImage("URL_IMAGE_GREEN_ICI")}
                      >
                        Green
                      </Link>
                      
                      <Link 
                        to="/collections/burgundy" 
                        className="mega-menu-link"
                        onMouseEnter={() => changeImage("URL_IMAGE_BURGUNDY_ICI")}
                      >
                        Burgundy
                      </Link>
                      
                      <Link 
                        to="/collections/tonca" 
                        className="mega-menu-link"
                        onMouseEnter={() => changeImage("URL_IMAGE_TONCA_ICI")}
                      >
                        Tonca
                      </Link>
                      
                      <Link 
                        to="/collections/sunshine" 
                        className="mega-menu-link"
                        onMouseEnter={() => changeImage("URL_IMAGE_SUNSHINE_ICI")}
                      >
                        Sunshine
                      </Link>
                      
                      <Link to="/collections/all" className="mega-menu-link fw-bold mt-3">Voir tout</Link>
                    </div>

                    {/* Colonne 2 : Par Catégorie */}
                    <div className="col-3">
                      <span className="mega-menu-title">Par catégorie</span>
                      
                      <Link 
                        to="/category/robe" 
                        className="mega-menu-link"
                        onMouseEnter={() => changeImage("URL_IMAGE_ROBE_ICI")}
                      >
                        Robe
                      </Link>
                      
                      <Link 
                        to="/category/haut" 
                        className="mega-menu-link"
                        onMouseEnter={() => changeImage("URL_IMAGE_HAUT_ICI")}
                      >
                        Haut
                      </Link>
                      
                      <Link 
                        to="/category/bas" 
                        className="mega-menu-link"
                        onMouseEnter={() => changeImage("URL_IMAGE_BAS_ICI")}
                      >
                        Bas
                      </Link>
                      
                      <Link 
                        to="/category/chaussure" 
                        className="mega-menu-link"
                        onMouseEnter={() => changeImage("URL_IMAGE_CHAUSSURE_ICI")}
                      >
                        Chaussure
                      </Link>
                      
                      <Link 
                        to="/category/petite-maroquinerie" 
                        className="mega-menu-link"
                        onMouseEnter={() => changeImage("URL_IMAGE_MAROQUINERIE_ICI")}
                      >
                        Petite maroquinerie
                      </Link>
                    </div>

                    {/* Colonne 3 : Image Visuelle Dynamique */}
                    <div className="col-4 d-flex align-items-center justify-content-center">
                        <img 
                          src={activeImage} 
                          alt="Aperçu Collection" 
                          className="img-fluid fade-in" 
                          style={{
                            mixBlendMode: 'multiply', 
                            maxHeight: '300px', // Limite la hauteur
                            transition: 'opacity 0.3s ease'
                          }}
                          // 'key' force le React à redessiner l'image pour l'effet fade-in
                          key={activeImage}
                        />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* FIN LIEN COLLECTIONS */}

            <Link to="/about" className={`text-decoration-none ${textClasses}`}>La Maison</Link>
          </div>

          {/* === LOGO CENTRÉ === */}
          <Link to="/" className={`navbar-brand position-absolute start-50 translate-middle-x mx-auto ${textClasses}`}>
            <span className="h2" style={{ fontFamily: 'Playfair Display, serif' }}>LYK</span>
          </Link>

          {/* === MENU DROITE === */}
          <div className={`d-flex gap-3 align-items-center ${textClasses}`}>
            <Link to="/account/login" className={`text-decoration-none small text-uppercase fw-bold ${textClasses}`}>Compte</Link>
            <Link to="/wishlist" className={`text-decoration-none ${textClasses}`}>♥</Link>
            <Link to="/cart" className={`text-decoration-none ${textClasses}`}>Panier (0)</Link>
          </div>

        </div>
      </nav>
    </header>
  );
};

export default Navbar;