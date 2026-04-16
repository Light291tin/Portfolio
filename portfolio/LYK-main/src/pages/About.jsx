import React from 'react';

const About = () => {
  return (
    <div className="container-fluid p-0 fade-in" style={{ marginTop: '120px', paddingBottom: '100px' }}>

      {/* === LE GRAND TITRE === */}
      <div className="container mb-5 pb-5 text-center">
        <h6 className="text-uppercase letter-spacing-2 text-muted mb-4">La Maison</h6>
        <h1 className="display-1 text-uppercase fw-normal" style={{ fontFamily: 'var(--font-title)', fontSize: 'clamp(3rem, 8vw, 6rem)', lineHeight: 1 }}>
          Like Your <br /> Curves
        </h1>
      </div>


      {/* === PREMIÈRE SECTION === */}
      <div className="container mb-5">
        <div className="row align-items-center g-5">
          <div className="col-lg-6 ps-lg-0"> 
            <img
              src="https://images.unsplash.com/photo-1490452323032-b8f9d3311916?q=80&w=1000&auto=format&fit=crop"
              alt="Les fondatrices Lina, Yamina et Kimberley"
              className="w-100 shadow-sm"
              style={{ minHeight: '600px', objectFit: 'cover' }}
            />
          </div>

           {/* Texte "Un peu de nous" */}
          <div className="col-lg-6">
            <div className="p-lg-5">
              <h2 className="h4 text-uppercase letter-spacing-2 mb-4" style={{ color: 'var(--color-primary)' }}>
                Un peu de nous
              </h2>
              <p className="lead text-muted mb-4" style={{ textAlign: 'justify' }}>
                LYK, c’est avant tout l’histoire de trois amies — Lina, Yamina et Kimberley — réunies par une passion commune pour la mode, mais aussi par une même frustration : ne jamais trouver leurs tailles en magasin.
              </p>
              <p className="text-muted" style={{ textAlign: 'justify' }}>
                Lassées de se sentir exclues d’un univers qui devrait célébrer toutes les beautés, elles ont décidé de créer leur propre marque. Ainsi est née LYK, une ode à la diversité, à la confiance en soi et à la féminité sous toutes ses formes. Chez LYK, nous croyons que la mode doit être inclusive et libératrice. Notre mission : offrir à chaque femme, quelle que soit sa morphologie, des vêtements dans lesquels elle se sent belle, forte et pleinement elle-même.
              </p>
            </div>
          </div>
        </div>
      </div>


      {/* === DEUXIÈME SECTION === */}
      <div className="bg-light py-5 my-5">
        <div className="container py-lg-5">
          <div className="row justify-content-center">
            <div className="col-lg-8 text-center">
              <h2 className="h4 text-uppercase letter-spacing-2 mb-4 pt-5" style={{ color: 'var(--color-primary)' }}>
                Notre mission
              </h2>
              <p className="fw-bold mb-3 text-uppercase small ls-2">Notre univers</p>
              
              <p className="lead text-muted mb-4">
                Chez LYK, chaque collection est une expérience pensée pour célébrer le style, la diversité et la liberté d’expression. Nous croyons qu’être authentique, c’est embrasser pleinement qui l’on est — avec ses courbes, sa personnalité et sa confiance.
              </p>
              <p className="text-muted pb-5">
                Être curvy, c’est être unique, et notre passion pour la mode inclusive se reflète dans chaque détail, chaque coupe et chaque tissu. Notre mission ? Créer un espace où la mode rime avec acceptation, où chacune peut se sentir belle, forte et libre d’affirmer son style.
              </p>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default About;