import React from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import "./RegisterModal.css";

function RegisterModal({ isOpen, onClose, onSignInClick }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Signup Submitted");
    onClose();
  };

  return (
    <ModalWithForm
      title="Sign Up"
      isOpen={isOpen}
      onClose={onClose}
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
          placeholder="Enter Password"
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
          required
        />
      </label>

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
