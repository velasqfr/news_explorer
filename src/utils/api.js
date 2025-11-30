/**
 * Fetch news articles on a query.
 * @param {string} query - Search term provided by the user
 * @returns {Promise<Array>} - Returns a promise that resolves to an array of news articles
 */

const NEWS_API_BASE_URL = import.meta.env.PROD
  ? "https://nomoreparties.co/news/v2/everything"
  : "https://newsapi.org/v2/everything";

const API_KEY = import.meta.env.VITE_NEWS_API_KEY;

export const searchNews = async (query) => {
  // If the query is empty or contains only spaces, return an empty array
  if (!query.trim()) return [];

  // Get the current date
  const fromDate = new Date();

  // Subtract 7 days from the current date
  fromDate.setDate(fromDate.getDate() - 7);

  // Convert the "from" date to the correct format (---/--/---)
  const from = fromDate.toISOString().split("T")[0];

  // Construct the URL w/ the API endpoint, query, and date parameters
  const url = `${NEWS_API_BASE_URL}?q=${encodeURIComponent(query)}&from=${from}&sortBy=publishedAt&apiKey=${API_KEY}`;

  try {
    // Fetch the response from the NEWS API
    const response = await fetch(url);

    // If the response is not ok, log the error and return an empty array
    if (!response.ok) {
      console.error("News API HTTP errors:", response.status);
      return [];
    }

    // Parse the JSON data from the response
    const data = await response.json();

    // Return the list of articles (if any) or an empty array
    return data.articles || [];
  } catch (error) {
    // If there is an error during the fetch, log the error and return an empty array
    console.error("News API fetch error:", error);
    return [];
  }
};
