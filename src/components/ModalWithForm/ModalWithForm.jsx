import React from "react";
import "./ModalWithForm.css";
import closeIcon from "../../images/close.svg";

function ModalWithForm({ isOpen, onClose, title, onSubmit, children }) {
  if (!isOpen) return null; //stops the modal from showing unless explicitly "opened"

  return (
    <div className="modal">
      <div className="modal__overlay" onClick={onClose}></div>

      <div className="modal__content">
        <button className="modal__close" onClick={onClose}>
          <img src={closeIcon} alt="Close" className="close__button" />
        </button>

        <h2 className="modal__title"> {title} </h2>

        <form className="modal__form" onSubmit={onSubmit}>
          {children}
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
