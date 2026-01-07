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

// Get saved articles for a specific user - allows own separate list of articles
export function getSavedArticles(userEmail) {
  if (!userEmail) return [];
  const data = localStorage.getItem(`savedArticles_${userEmail}`);
  return data ? JSON.parse(data) : [];
}
// Save articles array into localStorage
export function saveArticleList(userEmail, articles) {
  if (!userEmail) return;
  localStorage.setItem(`savedArticles_${userEmail}`, JSON.stringify(articles));
}
