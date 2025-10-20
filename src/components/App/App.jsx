import React from "react";

import Header from "../Header/Header";
import About from "../About/About";
import Footer from "../Footer/Footer";
import "./App.css";

function App() {
  return (
    <div className="app">
      <Header />
      <main className="main-content">
        <About />
      </main>
      <Footer />
    </div>
  );
}

export default App;
