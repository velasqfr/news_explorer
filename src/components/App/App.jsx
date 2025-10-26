import React, { useState } from "react";
import "./App.css";

import Header from "../Header/Header";
import About from "../About/About";
import Footer from "../Footer/Footer";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import LoginModal from "../LoginModal/LoginModal";

function App() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  const handleLoginOpen = () => setIsLoginOpen(true);
  const handleLoginClose = () => setIsLoginOpen(false);

  return (
    <div className="app">
      <Header onSignInClick={handleLoginOpen} />
      <main className="main-content">
        <About />
      </main>
      <Footer />
      <LoginModal isOpen={isLoginOpen} onClose={handleLoginClose} />
    </div>
  );
}

export default App;
