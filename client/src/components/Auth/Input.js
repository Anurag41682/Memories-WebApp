import Visible from "../../images/visibility.svg";
import VisibleOff from "../../images/visibility-off.svg";
import styled from "styled-components";
function Input({
  label,
  name,
  autoFocus,
  handleChange,
  handleShowPassword,
  type,
}) {
  return (
    <Wrapper>
      <label htmlFor={name}>{label}</label>
      <InputAndPass>
        <input
          id={name}
          name={name}
          onChange={handleChange}
          required
          autoFocus={autoFocus}
          type={type}
        ></input>
        {name === "password" && (
          <span>
            <button type="button" onClick={handleShowPassword}>
              {type === "password" ? (
                <img width="20px" src={VisibleOff} alt=""></img>
              ) : (
                <img width="20px" src={Visible} alt=""></img>
              )}
            </button>
          </span>
        )}
      </InputAndPass>
    </Wrapper>
  );
}
export default Input;
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.45rem;
  & label { color: #465d54; font-size: 0.76rem; font-weight: 700; }
`;
const InputAndPass = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  & input {
    min-width: 0;
    width: 100%;
    padding: 0.75rem 0.8rem;
    border: 1px solid var(--line);
    border-radius: 5px;
    background: rgba(250, 251, 247, 0.9);
    color: var(--ink);
    font-size: 0.85rem;
    &:focus { border-color: #7eaa9c; outline: none; box-shadow: 0 0 0 3px rgba(82, 145, 124, 0.12); }
  }
  & button {
    padding: 0.35rem;
    display: flex;
    align-items: center;
    border: 0;
    border-radius: 4px;
    background: transparent;
    cursor: pointer;
  }
  & button:hover { background: #edf2ec; }
  & button img { width: 19px; height: 19px; }
`;
