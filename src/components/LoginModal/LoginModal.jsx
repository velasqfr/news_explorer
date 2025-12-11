import React, { useEffect, useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import "./LoginModal.css";

function LoginModal({ isOpen, onClose, onSignUpClick, onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  // Clear inputs whenever modal opens
  useEffect(() => {
    if (!isOpen) {
      setEmail("");
      setPassword("");
      setEmailError("");
      setPasswordError("");
    }
  }, [isOpen]);

  // Escape Key Listener
  useEffect(() => {
    if (!isOpen) return;

    const handleEsc = (event) => {
      if (event.key === "Escape") {
        onClose(); // closes modal on escape
      }
    };

    document.addEventListener("keydown", handleEsc);

    // Cleanup listener when modal closes or unmounts
    return () => {
      document.removeEventListener("keydown", handleEsc);
    };
  }, [isOpen, onClose]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setEmailError("");
    setPasswordError("");

    let hasError = false;

    if (!email) {
      setEmailError("Invalid email address");
      hasError = true;
    } else if (email.length < 8 || email.length > 25) {
      setEmailError("Email must be 8-25 characters long");
      hasError = true;
    }

    if (!password) {
      setPasswordError("Invalid password");
      hasError = true;
    } else if (password.length < 4 || password.length > 30) {
      setPasswordError("Password must be 4-30 characters long");
      hasError = true;
    }

    if (hasError) return;

    try {
      const success = await onLogin({ email, password });
      if (!success) {
        setEmailError("Invalid email address or password");
        setPasswordError("Invalid email address or password");
      }
    } catch (err) {
      setEmailError("Something went wrong. Please try again");
      setPasswordError("Something went wrong. Please try again");
    }
  };

  if (!isOpen) return null;

  return (
    <ModalWithForm
      isOpen={isOpen}
      onClose={onClose}
      title="Sign In"
      onSubmit={handleSubmit}
    >
      <label className="modal__label">
        Email
        <input
          type="email"
          name="email"
          className="modal__input"
          placeholder="Enter email"
          value={email}
          minLength={8}
          maxLength={25}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="username"
          required
        />
        {emailError && <p className="login__error-email">{emailError}</p>}
      </label>

      <label className="modal__label">
        Password
        <input
          type="password"
          name="password"
          className="modal__input"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          minLength={4}
          maxLength={30}
          autoComplete="current-password"
          required
        />
        {passwordError && (
          <p className="login__error-password">{passwordError}</p>
        )}
      </label>

      <button type="submit" className="modal__submit">
        Sign In
      </button>
      <p className="modal__switch">
        or{" "}
        <button
          type="button"
          className="modal__sign-up"
          placeholder="Enter password"
          onClick={onSignUpClick}
        >
          Sign up
        </button>
      </p>
    </ModalWithForm>
  );
}

export default LoginModal;
