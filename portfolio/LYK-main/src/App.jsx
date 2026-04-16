import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';

// --- COMPOSANTS ---
import Navbar from './components/NavBar';
import Footer from './components/Footer';

// --- PAGES CLASSIQUES ---
import Home from './pages/Home';
import About from './pages/About';
import Login from './pages/Login';
import Register from './pages/Register';
import Cart from './pages/Cart';
import Wishlist from './pages/Wishlist';

// --- PAGES PRODUITS & COLLECTIONS (Mises à jour) ---
import CollectionPage from './pages/CollectionPage'; // La page grille intelligente (ex: Tous les sacs Cyme)
import CollectionsHome from './pages/CollectionHome'; // La page éditoriale "Nos Collections"

import './App.css'; 

function App() {
  return (
    <Router>
      <Navbar /> 
      
      <Routes>
        {/* Page d'accueil */}
        <Route path="/" element={<Home />} />

        {/* --- NOUVELLES ROUTES POUR LE MEGA MENU --- */}
        
        {/* 1. Page de présentation générale (quand on clique sur "Collections" dans la navbar) */}
        <Route path="/collections-presentation" element={<CollectionsHome />} /> 

        {/* 3. Routes Dynamiques pour les listes de produits */}
        {/* Cela gère : /collections/all, /collections/cyme, /collections/numero-neuf, etc. */}
        <Route path="/collections/:collectionName" element={<CollectionPage />} />
        
        {/* Cela gère les catégories : /category/sacs-main, /category/bandouliere, etc. */}
        <Route path="/category/:collectionName" element={<CollectionPage />} />


        {/* --- PAGES SECONDAIRES --- */}
        <Route path="/about" element={<About />} />
        <Route path="/account/login" element={<Login />} />
        <Route path="/account/register" element={<Register />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/wishlist" element={<Wishlist />} />
        
      </Routes>
      
      <Footer />
    </Router>
  );
}

export default App;