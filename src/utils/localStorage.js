// Saves or removes current user
export function setUser(user) {
  if (user) {
    localStorage.setItem("currentUser", JSON.stringify(user));
  } else {
    localStorage.removeItem("currentUser");
  }
}
// getUser reads the current user from localStorage
export function getUser() {
  const data = localStorage.getItem("currentUser");
  return data ? JSON.parse(data) : null;
}

// Get all registered users
export function getRegisteredUsers() {
  return JSON.parse(localStorage.getItem("registeredUsers") || "{}");
}

// Save all registered users
export function setRegisteredUsers(users) {
  localStorage.setItem("registeredUsers", JSON.stringify(users));
}

// Reads saved articles
export function getSavedArticles() {
  return JSON.parse(localStorage.getItem("savedArticles") || "[]");
}
// Save articles array into localStorage
export function saveArticleList(articles) {
  localStorage.setItem("savedArticles", JSON.stringify(articles));
}
