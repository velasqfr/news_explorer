import React, { useEffect, useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import "./RegisterModal.css";

function RegisterModal({ isOpen, onClose, onSignInClick, onRegister }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");

  // Clear inputs whenever modal opens
  useEffect(() => {
    if (isOpen) {
      setEmail("");
      setPassword("");
      setUsername("");
      setError("");
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

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!email) return setError("This email is not available");
    if (!password) return setError("Password is required");
    if (!username) return setError("Username is required");

    try {
      onRegister?.({ email, password, username });
      onClose();
    } catch {
      setError("Something went wrong. Please try again");
    }
  };

  if (!isOpen) return null;

  return (
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
      </label>

      {error && <p className="modal__error-register"> {error}</p>}

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
  );
}

export default RegisterModal;
