📰 News Explorer 🌍

- News Explorer is a React-based single-page application that allows users to search for news articles via a third-party API and manage a personalized list of saved articles. The application implements client-side routing, authentication, news functionality, and persistent article storage using the browser localStorage.

🧩 Project's Technical Overview 🧠

- This project demonstrates frontend application architecture using React functional components, hooks, and React Router.
- It handles authentication state, session persistence, API-driven data fetching, and per-user data storage.
- User state, registered accounts, and saved articles are stored locally, enabling session continuity and user-specific data separation.

Features:

- Authentication
  - Client-side login and registration flow
  - Credential validation using locally stored user data
  - Persistent login state across sessions
  - Modal-based authentication UI

- Routing
  - / - Home Page for searching and browsing news
  - /saved-news - User-specific saved articles view
  - Conditional header rendering based on route and auth state

- News Search
  - Keyword-based article search via an external news API
  - Asynchronous API requests with loading indicators
  - Graceful handling of empty results and request failures
  - Search term retention for contextual article saving

- Saved Articles
  - Save and unsave articles with toggle behavior
  - Automatic keyword extraction from article titles
  - User-specific saved article lists (keyed by email)
  - Persistent storage using localStorage
  - Delete saved articles directly from the Saved News page

- UI & State Management
  - Centralized state management using React Hooks
  - Conditional rendering for loaders, errors, and empty states
  - Fully responsive layout for desktop and mobile devices.

Tech Stack ⚙️

- Frontend: React, JavaScript(ES6+), HTML5, CSS3
- Routing: React Router
- State Management: React Hooks (useState, useEffect)
- Persistence: Browser localStorage
- API Integration: RESTful third-party news API
- Build Tools: React + Vite
- Version Control: GitHub

Installation and Setup 🛠️

1. Clone the repository:

git clone https://github.com/velasqfr/news_explorer.git

2. Navigate to the project directory:

cd news_explorer

3. Install Dependencies:

npm install

4. Run Locally:

npm run dev

Visit http://localhost:4000/ to test out the app 💻

# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh
