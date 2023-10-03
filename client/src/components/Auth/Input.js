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
      <label>{label}</label>
      <InputAndPass>
        <input
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
                <img width="20px" src={VisibleOff}></img>
              ) : (
                <img width="20px" src={Visible}></img>
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
  justify-content: space-between;
  & label {
    flex: 1;
  }
`;
const InputAndPass = styled.div`
  display: flex;
  align-items: center;
  flex: 1;
  /* gap: 1rem; */
  & input {
    padding: 5px;
    width: 10rem;
    @media (max-width: 480px) {
      width: 5rem;
    }
  }
  & input:focus {
    outline: none;
  }
  & button {
    padding: 1px;
    display: flex;
    align-items: center;
  }
`;
