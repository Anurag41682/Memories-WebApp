import Visible from "../../images/visibility.svg";
import VisibleOff from "../../images/visibility-off.svg";

function Input({
  label,
  name,
  autoFocus,
  handleChange,
  handleShowPassword,
  type,
}) {
  return (
    <div>
      <label>{label}</label>
      <input
        name={name}
        onChange={handleChange}
        required
        autoFocus={autoFocus}
        type={type}
      ></input>
      {name == "password" && (
        <span>
          <button onClick={handleShowPassword}>
            {type == "password" ? (
              <img width="20px" src={VisibleOff}></img>
            ) : (
              <img width="20px" src={Visible}></img>
            )}
          </button>
        </span>
      )}
    </div>
  );
}
export default Input;
