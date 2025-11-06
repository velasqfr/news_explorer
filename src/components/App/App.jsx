import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

import Header from "../Header/Header";
import SavedNewsHeader from "../SavedNews/SavedNewsHeader";
import About from "../About/About";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import LoginModal from "../LoginModal/LoginModal";
import RegisterModal from "../RegisterModal/RegisterModal";
import NewsCardList from "../NewsCardList/NewsCardList";
import SavedNews from "../SavedNews/SavedNews";

function App() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null); // null -> no one is logged in
  const [savedArticles, setSavedArticles] = useState([
    { id: 1, title: "Yellowstone Wonders", keyword: "Yellowstone" },
    { id: 2, title: "Nature Photography Tips", keyword: "Nature" },
    { id: 3, title: "AI in Daily Life", keyword: "AI" },
    { id: 4, title: "Wildlife Conservation", keyword: "Nature" },
    { id: 5, title: "Travel Guide 2025", keyword: "Travel" },
  ]);

  const handleLoginOpen = () => setIsLoginOpen(true);
  const handleRegisterOpen = () => setIsRegisterOpen(true);

  const openLoginFromRegister = () => {
    setIsRegisterOpen(false);
    setIsLoginOpen(true);
  };

  const closeAllModals = () => {
    setIsLoginOpen(false);
    setIsRegisterOpen(false);
  };

  const handleLogin = ({ email }) => {
    setUser({ email });
    setIsLoggedIn(true);
    closeAllModals();
  };

  const handleRegister = ({ email, username }) => {
    setUser({ email, username });
    setIsLoggedIn(true);
    closeAllModals();
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  const handleDeleteArticle = (id) => {
    setSavedArticles((prev) => prev.filter((article) => article.id !== id));
  };

  return (
    <Router>
      <div className="app">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Header
                  onSignInClick={handleLoginOpen}
                  isLoggedIn={isLoggedIn}
                  onLogout={handleLogout}
                  onSignOutClick={handleLogout}
                  currentUser={user}
                  isSavedNewsPage={false}
                />
                <main className="main-content">
                  <Main />
                  <NewsCardList />
                  <About />
                </main>
                <Footer />
              </>
            }
          />
          <Route
            path="/saved-news"
            element={
              <>
                <SavedNewsHeader
                  onSignOutClick={handleLogout}
                  currentUser={user}
                />
                <main className="main-content">
                  <SavedNews
                    currentUser={user}
                    savedArticles={savedArticles}
                    onDeleteArticle={handleDeleteArticle}
                  />
                </main>
                <Footer />
              </>
            }
          />
        </Routes>

        <LoginModal
          isOpen={isLoginOpen}
          onClose={closeAllModals}
          onSignUpClick={handleRegisterOpen}
          onLogin={handleLogin}
        />

        <RegisterModal
          isOpen={isRegisterOpen}
          onClose={closeAllModals}
          onSignInClick={openLoginFromRegister}
          onRegister={handleRegister}
        />
      </div>
    </Router>
  );
}

export default App;
