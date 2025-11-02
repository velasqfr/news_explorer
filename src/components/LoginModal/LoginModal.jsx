import React, { useEffect } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import "./LoginModal.css";

function LoginModal({ isOpen, onClose, onSignUpClick }) {
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

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Loginsubmitted");
  };

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
          required
        />
      </label>

      <label className="modal__label">
        Password
        <input
          type="password"
          name="password"
          className="modal__input"
          placeholder="Enter password"
          required
        />
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
