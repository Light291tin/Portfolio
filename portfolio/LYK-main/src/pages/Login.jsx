import React from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
  return (
    <div className="container d-flex justify-content-center align-items-center" style={{ height: '80vh', marginTop: '50px' }}>
      <div className="col-md-5">
        <h2 className="text-center mb-5" style={{ fontFamily: 'Playfair Display, serif' }}>Connexion</h2>
        <form>
          <div className="mb-3">
            <label className="form-label text-uppercase small">Email</label>
            <input type="email" className="form-control" />
          </div>
          <div className="mb-4">
            <label className="form-label text-uppercase small">Mot de passe</label>
            <input type="password" className="form-control" />
          </div>
          <button type="submit" className="btn btn-dark w-100 py-2 text-uppercase">Se connecter</button>
        </form>
        <div className="text-center mt-3">
          <Link to="/account/register" className="text-muted small">Pas de compte ? Créer un compte</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;