import closeIcon from "../../images/close.svg";
import "./RegistrationSuccess.css";

function RegistrationSuccess({ onClose, onGoToSignin }) {
  return (
    <div className="registration">
      <div className="registration__modal">
        <img
          src={closeIcon}
          alt="close"
          className="registration__close-btn"
          onClick={onClose}
        />
        <h1 className="registration__title">
          Registration Successfully Completed!
        </h1>
        <button className="registration__signin-btn" onClick={onGoToSignin}>
          Sign In
        </button>
      </div>
    </div>
  );
}

export default RegistrationSuccess;
