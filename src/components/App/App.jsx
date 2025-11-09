import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import { mockArticles } from "../../utils/mockArticles";

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
  const [searchTerm, setSearchTerm] = useState("");
  const [articles, setArticles] = useState(mockArticles);
  const [savedArticles, setSavedArticles] = useState(mockArticles.slice(0, 3));
  const [isLoading, setIsLoading] = useState(false);
  const [noResults, setNoResults] = useState(false);

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

  const handleRegister = ({ name, email, username }) => {
    setUser({ name, email, username });
    setIsLoggedIn(true);
    closeAllModals();
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUser(null);
  };

  const handleDeleteArticle = (url) => {
    setSavedArticles((prev) => prev.filter((article) => article.url !== url));
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
    setIsLoading(true); // show preloader
    setNoResults(false); // reset no results

    setTimeout(() => {
      // simulate API call later on
      const filtered = mockArticles.filter((article) =>
        article.title.toLowerCase().includes(term.toLowerCase())
      );
      setArticles(filtered);
      setIsLoading(false); // hide preloader
      if (filtered.length === 0) setNoResults(true);
    }, 1000); // simulate is loading
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
                  <Main onSearch={handleSearch} />
                  <NewsCardList
                    articles={articles}
                    isLoading={isLoading}
                    noResults={noResults}
                  />
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
