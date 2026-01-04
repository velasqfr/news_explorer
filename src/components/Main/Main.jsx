import "./Main.css";
import SearchForm from "../SearchForm/SearchForm";

function Main({ onSearch }) {
  return (
    <main className="hero">
      <SearchForm onSearch={onSearch} />
    </main>
  );
}

export default Main;
