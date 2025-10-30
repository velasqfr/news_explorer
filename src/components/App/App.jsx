import React, { useState } from "react";
import "./App.css";

import Header from "../Header/Header";
import About from "../About/About";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import LoginModal from "../LoginModal/LoginModal";
import RegisterModal from "../RegisterModal/RegisterModal";
import NewsCardList from "../NewsCardList/NewsCardList";

function App() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);

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

  return (
    <div className="app">
      <Header onSignInClick={handleLoginOpen} />
      <main className="main-content">
        <Main />
        <NewsCardList />
        <About />
      </main>

      <Footer />

      <LoginModal
        isOpen={isLoginOpen}
        onClose={closeAllModals}
        onSignUpClick={handleRegisterOpen}
      />

      <RegisterModal
        isOpen={isRegisterOpen}
        onClose={closeAllModals}
        onSignInClick={openLoginFromRegister}
      />
    </div>
  );
}

export default App;
