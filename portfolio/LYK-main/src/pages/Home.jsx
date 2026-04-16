import React from 'react';
import { Link } from 'react-router-dom';
import heroVideo from '../assets/Video Project 2.mp4';
import featureImage from '../assets/Carte2Proto.jpeg';

const Home = () => {
  return (
    <div className="w-100 bg-white fade-in">
      
      <div className="position-relative vh-100 w-100 overflow-hidden bg-light">
        <video 
          autoPlay loop muted playsInline 
          className="w-100 h-100"
          style={{ objectFit: 'cover' }}
        >
          <source src={heroVideo} type="video/mp4" />
        </video>

        <div className="position-absolute top-0 start-0 w-100 h-100" style={{ background: 'rgba(0,0,0,0.1)', pointerEvents: 'none' }}></div>

        <div 
          className="position-absolute p-5 bg-white bg-opacity-75 shadow-sm d-flex align-items-center text-center"
          style={{ bottom: '10%', left: '5%', width: '280px', minHeight: '180px', zIndex: 10 }}
        >
          <Link to="/collections/all" className="text-decoration-none text-dark w-100">
            <h6 className="text-uppercase small letter-spacing-2 text-muted mb-3">Nouveauté</h6>
            <h2 className="mb-3" style={{ fontFamily: 'var(--font-title)', fontSize: '1.8rem' }}>
              Collection <br /> Signature
            </h2>
            <div className="border-bottom border-dark d-inline-block pb-1">
              <span className="text-uppercase small letter-spacing-2">Découvrir</span>
            </div>
          </Link>
        </div>
      </div>

      {/* =========================================*/}

      <div className="container-fluid p-0 featured-section">
        <div className="row g-0 align-items-center">
          
          {/* IMAGE */}
          <div className="col-lg-6" style={{ width: '30vw' , height: '100vh' }}>
            <img 
              src={featureImage} 
              alt="Nouvelle Collection" 
              style={{objectFit: 'cover', width: '100%' }}
            />
          </div>

          {/* TEXTE */}
          <div className="col-lg-6 bg-light d-flex flex-column justify-content-center " style={{ width: '70vw', height: '100vh' }}>
            <div className="p-lg-5 text-center text-lg-start mx-auto" style={{height: '100%'}}>
              <p className="text-uppercase letter-spacing-2 mb-3" style={{ color: 'var(--color-primary)' }}>Édition Limitée</p>
              
              <h2 className="display-4 mb-4" style={{ fontFamily: 'var(--font-title)' }}>
                L'Art du détail
              </h2>
              
              <p className="lead text-muted mb-5" style={{ textAlign: 'justify', fontSize: '1rem' }}>
                L’Essence du style
                Une attitude avant tout. Des lignes fluides qui subliment les formes, une matière qui épouse et libère à la fois. 
                <br /><br />Chez LYK, chaque création traduit une vision: celle d’une beauté plurielle, affirmée et sans compromis.
                Plus qu’un vêtement, c’est une expérience de confiance et d’authenticité, où chaque détail célèbre la diversité et la fierté d’être soi.
              </p>

              <Link to="/products/1" className="btn btn-luxe w-auto ">
                Découvrir la campagne
              </Link>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Home;