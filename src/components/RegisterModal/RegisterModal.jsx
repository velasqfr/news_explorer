import { useEffect, useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import "./RegisterModal.css";
import RegistrationSuccess from "../RegistrastionSucess/RegistrationSuccess";

function RegisterModal({ isOpen, onClose, onSignInClick, onRegister }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [emailUnavailableError, setEmailUnavailableError] = useState("");
  const [noInfoError, setNoInfoError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [isRegistrationSuccess, setIsRegistrationSuccess] = useState(false);

  // Clear inputs whenever modal opens
  useEffect(() => {
    if (isOpen) {
      setEmail("");
      setPassword("");
      setUsername("");
      // Reset Errors
      setError("");
      setEmailError("");
      setNoInfoError("");
      setEmailUnavailableError("");
      setPasswordError("");
      setUsernameError("");

      setIsRegistrationSuccess(false);
    }
  }, [isOpen, isRegistrationSuccess]);

  // Escape Key Listener
  useEffect(() => {
    if (!isOpen) return;

    const handleEsc = (event) => {
      if (event.key === "Escape") {
        if (isRegistrationSuccess) setIsRegistrationSuccess(false);
        else onClose(); // closes modal on escape
      }
    };

    document.addEventListener("keydown", handleEsc);

    // Cleanup listener when modal closes or unmounts
    return () => {
      document.removeEventListener("keydown", handleEsc);
    };
  }, [isOpen, onClose, isRegistrationSuccess]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Reset Errors
    setError("");
    setEmailError("");
    setNoInfoError("");
    setEmailUnavailableError("");
    setPasswordError("");
    setUsernameError("");

    // Checks if all fields are empty
    if (!email && !password && !username) {
      setNoInfoError("Please enter your information");
      return;
    }

    let hasError = false;

    // Checks individual fields for missing value
    if (!email) {
      setEmailError("Email is required");
      hasError = true;
    } else if (email.length < 8 || email.length > 25) {
      setEmailError("Email must be 8-25 characters long");
      hasError = true;
    }

    if (!password) {
      setPasswordError("Password is required");
      hasError = true;
    } else if (password.length < 4 || password.length > 30) {
      setPasswordError("Password must be 4-30 characters long");
      hasError = true;
    }

    if (!username) {
      setUsernameError("Username is required");
      hasError = true;
    } else if (username.length < 2 || username.length > 15) {
      setUsernameError("Username must be 2-15 characters long");
      hasError = true;
    }

    // Stop if validation failed
    if (hasError) return;

    try {
      const result = await onRegister?.({ email, password, username });

      if (result.success) {
        setIsRegistrationSuccess(true); // shows success component
      } else {
        setEmailUnavailableError(result.message);
      }
    } catch (err) {
      setError("Something went wrong. Please try again");
    }
  };

  useEffect(() => {
    if (isRegistrationSuccess) {
      onClose(); // this will close the background form modal once the registartion is complete
    }
  }, [isRegistrationSuccess, onClose]);

  // Rendering the Registration Success Component
  if (isRegistrationSuccess) {
    return (
      <ModalWithForm
        isOpen={true}
        onClose={() => setIsRegistrationSuccess(false)}
        className="register-success"
      >
        <RegistrationSuccess
          onClose={() => setIsRegistrationSuccess(false)}
          onGoToSignin={() => {
            setIsRegistrationSuccess(false);
            onClose(); // close the registration modal
            onSignInClick(); // switch to login mode
          }}
        />
      </ModalWithForm>
    );
  }

  // Render the regular registration form
  if (!isOpen) return null;

  return (
    <div>
      <ModalWithForm
        title="Sign Up"
        isOpen={isOpen}
        onClose={onClose}
        onSubmit={handleSubmit}
        className="register"
      >
        <label className="modal__label">
          Email
          <input
            type="email"
            name="email"
            className="modal__input"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="username"
            required
          />
          {emailError && <p className="register__error-email">{emailError}</p>}
        </label>

        <label className="modal__label">
          Password
          <input
            type="password"
            name="password"
            className="modal__input"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="new-password"
            required
          />
          {passwordError && (
            <p className="register__error-password">{passwordError}</p>
          )}
        </label>

        <label className="modal__label">
          Username
          <input
            type="text"
            name="username"
            className="modal__input"
            placeholder="Enter Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            autoComplete="username"
            required
          />
          {usernameError && (
            <p className="register__error-username">{usernameError}</p>
          )}
        </label>

        {error && <p className="modal__error-register"> {error}</p>}
        {emailUnavailableError && (
          <p className="register__error-unavailable-email">
            {emailUnavailableError}
          </p>
        )}

        {noInfoError && (
          <p className="register__info-error-email">{noInfoError}</p>
        )}

        <button type="submit" className="modal__submit">
          Sign Up
        </button>
        <p className="modal__switch">
          or{" "}
          <button
            type="button"
            className="modal__sign-in"
            placeholder="Enter password"
            onClick={onSignInClick}
          >
            Sign In
          </button>
        </p>
      </ModalWithForm>
    </div>
  );
}

export default RegisterModal;
