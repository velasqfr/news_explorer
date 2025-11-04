import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

import Header from "../Header/Header";
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
                  user={user}
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
          <Route path="/saved-news" element={<SavedNews />} />
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
