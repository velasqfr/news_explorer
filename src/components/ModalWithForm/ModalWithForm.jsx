import React from "react";
import "./ModalWithForm.css";

function ModalWithForm({ title, onClose, onSubmit, children }) {
  return (
    <div className="modal">
      <div className="modal__overlay" onClick={onClose}></div>
      <div className="moda__content">
        <button className="modal__close" onClick={onClose}>
          x
        </button>
        <h2 className="modal__title"> {title} </h2>
        <form className="modal__Form" onSubmit={onSubmit}>
          {children}
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
