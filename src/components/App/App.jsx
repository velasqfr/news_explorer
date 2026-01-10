// --------------------------------------------------
// IMPORTS
// --------------------------------------------------
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {
  getUser,
  setUser,
  getSavedArticles,
  saveArticleList,
  getRegisteredUsers,
  setRegisteredUsers,
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
  const [currentSearchTerm, setCurrentSearchTerm] = useState("");
  const [articles, setArticles] = useState([]);
  const [savedArticles, setSavedArticles] = useState(
    getSavedArticles(user?.email || "")
  );
  const [isLoading, setIsLoading] = useState(false);
  const [noResults, setNoResults] = useState(false);
  const [apiError, setApiError] = useState(false);

  useEffect(() => {
    if (user?.email) {
      saveArticleList(user.email, savedArticles); // updates saved articles to localstorage
    }
  }, [savedArticles, user?.email]);

  // --------------------------------------------------
  // MODAL HANDLERS
  // --------------------------------------------------
  const switchToLoginFromRegister = () => {
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
  const handleLoginOpen = () => {
    setIsLoginOpen(true);
    setIsRegisterOpen(false);
  };

  const handleRegisterOpen = () => setIsRegisterOpen(true);

  const handleLogin = ({ email, password }) => {
    const registeredUsers = getRegisteredUsers(); // Get all registered users
    const existingUser = registeredUsers[email];

    if (!existingUser || existingUser.password !== password) {
      return false; // wrong email or password
    }

    const newUser = { email, username: existingUser.username };
    setUserState(newUser);
    setUser(newUser); // localStorage
    setIsLoggedIn(true);

    // Load this user’s saved articles
    setSavedArticles(getSavedArticles(email));

    closeAllModals();
    return true;
  };

  const handleRegister = ({ email, password, username }) => {
    const registeredUsers = getRegisteredUsers(); // Get the current list of registered users

    // Checks if the email already exists
    if (registeredUsers[email]) {
      return { success: false, message: "This email is not available" };
    }
    // Add the new user to the list
    registeredUsers[email] = { email, username, password };
    setRegisteredUsers(registeredUsers); // save updated users list to localStorage

    // Proceed wth login after registering
    // **Do NOT log in automatically**
    // const newUser = { email, username };
    // setUserState(newUser);
    // setUser(newUser);
    // setIsLoggedIn(true);
    // closeAllModals();

    return { success: true };
  };

  const handleLogout = () => {
    setUserState(null);
    setIsLoggedIn(false);
    setUser(null); // clears user data from localStorage
    setSavedArticles([]); // clear saved articles in state
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
  const handleSaveArticle = (article, searchTerm) => {
    const keyword = searchTerm || extractKeyword(article.title); // Extracts search word
    const articleWithKeyword = { ...article, keyword }; // For keyword badge

    setSavedArticles((prev) => {
      const alreadySaved = prev.find((a) => a.url === article.url);
      if (alreadySaved) {
        // remove if already saved - "unsaving"
        return prev.filter((a) => a.url !== article.url);
      } else {
        return [...prev, articleWithKeyword];
      }
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
    setCurrentSearchTerm(term);
    if (!term.trim()) {
      setArticles([]); // clears previous results
      setNoResults(false); //reset "Nothing Found"
      setApiError(false); // resets error
      return;
    }
    setIsLoading(true); // show preloader
    setNoResults(false); // hide "Nothing Found"
    setApiError(false); // resets error

    try {
      const results = await searchNews(term); // calls the real API

      if (results.length === 0) {
        setNoResults(true); // Shows "Nothing Found"
      }

      setArticles(results); // Updates state for NewsCardList
    } catch (error) {
      console.error("Search error", error);

      setApiError(true); // Show API eror msgs
      setArticles([]); // Clears previous results
      setNoResults(false); // Hides "Nothing Found"
      // shows a user-friendly message to users:
      alert("Sorry, there was an error fetching news. Please try again later.");
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
        {/*  Conditionally render content based on apiError*/}
        {apiError ? (
          <div className="api__error-msg">
            {" "}
            <p>
              {" "}
              Sorry, something went wrong during the request. Please try again
              later{" "}
            </p>{" "}
          </div>
        ) : (
          // Otherwise, render the routes and page content
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

                    {/* CONDITIONAL RENDERING OF "NEWSCARDLIST" */}
                    {(articles.length > 0 || isLoading || noResults) && (
                      <NewsCardList
                        articles={articles}
                        isLoading={isLoading}
                        noResults={noResults}
                        onSaveArticle={handleSaveArticle}
                        savedArticles={savedArticles}
                        isLoggedIn={isLoggedIn}
                        apiError={apiError}
                        currentSearchTerm={currentSearchTerm}
                      />
                    )}
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
        )}
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
          onSignInClick={switchToLoginFromRegister}
          onRegister={handleRegister}
        />
      </div>
    </Router>
  );
}

export default App;
