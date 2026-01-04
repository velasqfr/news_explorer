import "./ModalWithForm.css";
import closeIcon from "../../images/close.svg";

function ModalWithForm({
  isOpen,
  onClose,
  title,
  onSubmit,
  children,
  className,
}) {
  if (!isOpen) return null; //stops the modal from showing unless explicitly "opened"

  return (
    <div className="modal">
      <div className="modal__overlay" onClick={onClose}></div>

      <div className={`modal__content ${className || ""}`}>
        <div className="modal__header">
          <button className="modal__close-btn" onClick={onClose}>
            <img src={closeIcon} alt="Close" />
          </button>
        </div>
        <h2 className="modal__title"> {title} </h2>

        <form className="modal__form" onSubmit={onSubmit} noValidate>
          {children}
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
