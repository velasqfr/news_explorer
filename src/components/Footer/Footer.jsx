import "./Footer.css";
import { Link } from "react-router-dom";
import githubIcon from "../../images/github.svg";
import linkedIcon from "../../images/linkedIn.svg";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__container">
        <p className="footer__copyright">
          &copy; 2025 Supersite, Powered by News API
        </p>
        <div className="footer__right-group">
          <nav className="footer__nav">
            <Link
              to="/"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            >
              Home
            </Link>
            <a href="https://tripleten.com/">Tripleten</a>
          </nav>
          <div className="footer__social-icons">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={githubIcon} alt="GitHub" className="footer__icon" />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={linkedIcon} alt="LinkedIn" className="footer__icon" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
