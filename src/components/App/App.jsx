// --------------------------------------------------
// IMPORTS
// --------------------------------------------------
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {
  getUser,
  setUser,
  getSavedArticles,
  saveArticleList,
} from "../../utils/localStorage";
import "./App.css";
import { searchNews } from "../../utils/api";

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
  // --------------------------------------------------
  // STATE: User, Auth, Search, Articles, Modals
  // --------------------------------------------------
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(!!getUser());
  const [user, setUserState] = useState(getUser()); // loads saved user
  const [searchTerm, setSearchTerm] = useState("");
  const [articles, setArticles] = useState([]);
  const [savedArticles, setSavedArticles] = useState(getSavedArticles()); // loads saved articles
  const [isLoading, setIsLoading] = useState(false);
  const [noResults, setNoResults] = useState(false);

  // --------------------------------------------------
  // MODAL HANDLERS
  // --------------------------------------------------
  const openLoginFromRegister = () => {
    setIsRegisterOpen(false);
    setIsLoginOpen(true);
  };

  const closeAllModals = () => {
    setIsLoginOpen(false);
    setIsRegisterOpen(false);
  };

  // --------------------------------------------------
  // AUTH HANDLERS (Login, Register, Logout)
  // --------------------------------------------------
  const handleLoginOpen = () => setIsLoginOpen(true);
  const handleRegisterOpen = () => setIsRegisterOpen(true);

  const handleLogin = ({ email }) => {
    const newUser = { email };
    setUserState(newUser); // state
    setUser(newUser); // localStorage
    setIsLoggedIn(true);
    closeAllModals();
    return true;
  };

  const handleRegister = ({ name, email, username }) => {
    const newUser = { name, email, username };
    setUserState(newUser);
    setUser(newUser);
    setIsLoggedIn(true);
    closeAllModals();
  };

  const handleLogout = () => {
    setUserState(null);
    setIsLoggedIn(false);
    setUser(null); // clears user data from localStorage
  };

  // --------------------------------------------------
  // KEYWORD EXTRACTION (For Saved Articles Feature)
  // --------------------------------------------------
  const extractKeyword = (title) => {
    if (!title) return "News";
    const words = title.split(" ");

    // Find meaningful capitalized words (minimum 4 letters)
    const meaningful = words.find((w) => /^[A-Z][a-zA-Z]{3,}/.test(w));

    if (meaningful) return meaningful;

    return words[0] || "News";
  };

  // --------------------------------------------------
  // SAVING & DELETING ARTICLES
  // --------------------------------------------------
  const handleSaveArticle = (article) => {
    const keyword = extractKeyword(article.title); // Extracts keyword from title
    const articleWithKeyword = { ...article, keyword }; // For keyword badge

    setSavedArticles((prev) => {
      const alreadySaved = prev.find((a) => a.url === article.url);
      let updatedArticles;

      if (alreadySaved) {
        // remove if already saved
        updatedArticles = prev.filter((a) => a.url !== article.url);
      } else {
        // Add new article w/ keyword
        updatedArticles = [...prev, articleWithKeyword];
      }
      saveArticleList(updatedArticles); // updates localStorage
      return updatedArticles;
    });
  };

  const handleDeleteArticle = (url) => {
    setSavedArticles((prev) => {
      const updatedArticles = prev.filter((article) => article.url !== url);
      saveArticleList(updatedArticles); // updates localStorage
      return updatedArticles;
    });
  };

  // --------------------------------------------------
  // SEARCH / API REQUEST
  // --------------------------------------------------

  const handleSearch = async (term) => {
    if (!term.trim()) {
      setArticles([]); // clears previous results
      setNoResults(false); //reset "Nothing Found"
      return;
    }
    setIsLoading(true); // show preloader
    setNoResults(false); // hide "Nothing Found"

    try {
      const results = await searchNews(term); // calls the real API

      if (results.length === 0) {
        setNoResults(true); // Shows "Nothing Found"
      }

      setArticles(results); // Updates state for NewsCardList
    } catch (error) {
      console.error("Search error", error);
      setNoResults(true); // Show "Nothing Found"
      setArticles([]); // CLear previous results
    } finally {
      setIsLoading(false); // hide preloader
    }
  };

  // --------------------------------------------------
  // RENDER
  // --------------------------------------------------
  return (
    <Router>
      <div className="app">
        <Routes>
          {/* HOME PAGE */}
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
                    onSaveArticle={handleSaveArticle}
                    savedArticles={savedArticles}
                    isLoggedIn={isLoggedIn}
                  />
                  <About />
                </main>
                <Footer />
              </>
            }
          />

          {/* SAVED NEWS PAGE */}
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

        {/* MODALS */}
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
