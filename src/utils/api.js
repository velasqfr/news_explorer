/**
 * Fetch news articles based on a search query
 * Uses last 7 days (from -> to)
 * Returns up to 100 results
 * Handles errors correctly
 */

const NEWS_API_BASE_URL =
  import.meta.env.MODE === "production"
    ? "https://nomoreparties.co/news/v2/everything"
    : "https://newsapi.org/v2/everything";

const API_KEY = import.meta.env.VITE_NEWS_API_KEY;

export const searchNews = async (query) => {
  // If the query is empty or contains only spaces, return an empty array
  if (!query.trim()) return [];

  // Calculate data range: today and the last 7 days
  const today = new Date();
  const lastWeek = new Date(today);
  lastWeek.setDate(today.getDate() - 7);

  const from = lastWeek.toISOString().split("T")[0];
  const to = today.toISOString().split("T")[0];

  const params = new URLSearchParams({
    q: query,
    apiKey: API_KEY,
    from,
    to,
    sortBy: "publishedAt",
    pageSize: "100",
  });

  const url = `${NEWS_API_BASE_URL}?${params.toString()}`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`News API Error: ${response.status}`);
    }

    const data = await response.json();
    return data.articles || [];
  } catch (error) {
    console.error("News API fetch error:", error);
    throw error; // IMPORTANT: allows App.jsx to show the required error message
  }
};
