import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import Input from "./Input";
import { GoogleLogin } from "react-google-login";
import GoogleIcon from "../../images/google.svg";
import { gapi } from "gapi-script";
import { signup, signin } from "../../actions/auth";
const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
};
function Auth() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState(initialState);
  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const switchMode = () => {
    setIsSignUp(!isSignUp);
    setShowPassword(false);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    if (isSignUp) {
      dispatch(signup(formData, navigate));
    } else {
      dispatch(signin(formData, navigate));
    }
  };
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const googleSuccess = async (res) => {
    const result = res?.profileObj;
    const token = res?.tokenId;
    try {
      dispatch({ type: "AUTH", data: { result, token } });
      navigate("/");
      console.log("Success");
    } catch (error) {
      console.log(error);
    }
  };
  const googleFailure = (error) => {
    console.log(error);
    console.log("Google Sign In was unsuccessful");
  };

  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId:
          "152756066086-qoojt6h5b0a1pqh5nl0kdd62n2b440j7.apps.googleusercontent.com",
        scope: "email",
      });
    }

    gapi.load("client:auth2", start);
  }, []);

  return (
    <Container>
      <CustomPaper>
        <AuthMark><img className="lockSvg" src="./Images/lock-outlined.svg" alt=""></img></AuthMark>
        <Eyebrow>YOUR PRIVATE COLLECTION</Eyebrow>
        <h2>{isSignUp ? "Create your account" : "Welcome back"}</h2>
        <Intro>{isSignUp ? "Start gathering the moments you want to keep close." : "Step back into the moments you have saved."}</Intro>
        <form onSubmit={handleSubmit}>
          <InputWrapper>
            {isSignUp && (
              <>
                <Input
                  label="First Name: "
                  name="firstName"
                  autoFocus
                  handleChange={handleChange}
                />
                <Input
                  label="Last Name: "
                  name="lastName"
                  handleChange={handleChange}
                ></Input>
              </>
            )}
            <Input
              label="E-Mail : "
              name="email"
              handleChange={handleChange}
              type="email"
            ></Input>
            <Input
              label="Password : "
              name="password"
              handleChange={handleChange}
              type={showPassword ? "text" : "password"}
              handleShowPassword={handleShowPassword}
            ></Input>
            {isSignUp && (
              <Input
                label="Confirm Password"
                name="confirmPassword"
                handleChange={handleChange}
                type="password"
              ></Input>
            )}
          </InputWrapper>
          <ButtonWrapper>
            <button type="submit">{isSignUp ? "Signup" : "Signin"}</button>
            <GoogleLogin
              // clientId="152756066086-qoojt6h5b0a1pqh5nl0kdd62n2b440j7.apps.googleusercontent.com"
              render={(renderProps) => (
                <button
                  type="button"
                  onClick={renderProps.onClick}
                  disabled={renderProps.disabled}
                >
                  <img width="20px" src={GoogleIcon} alt=""></img>
                  Google Sign In
                </button>
              )}
              onSuccess={googleSuccess}
              onFailure={googleFailure}
              cookiePolicy="single_host_origin"
            />
          </ButtonWrapper>
          <Grid>
            <button type="button" onClick={switchMode}>
              {isSignUp
                ? "Already have an Account? SignIn"
                : "Don't Have Account? SignUp"}
            </button>
          </Grid>
        </form>
      </CustomPaper>
    </Container>
  );
}
export default Auth;
const Container = styled.div`
  min-height: calc(100vh - 76px);
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding: clamp(2rem, 8vh, 5rem) 1rem 4rem;
`;
const CustomPaper = styled.div`
  width: min(100%, 450px);
  padding: clamp(1.5rem, 5vw, 2.75rem);
  border: 1px solid rgba(255, 255, 255, 0.9);
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.86);
  box-shadow: var(--shadow);
  animation: rise-in 650ms both;
  & h2 { margin: 0.4rem 0 0; color: var(--ink); font-family: "Playfair Display", serif; font-size: 2rem; line-height: 1.15; }
`;
const AuthMark = styled.div`
  display: grid;
  width: 46px;
  height: 46px;
  margin-bottom: 1.35rem;
  place-items: center;
  border-radius: 14px;
  background: #e8eee5;
  & .lockSvg { width: 23px; height: auto; filter: invert(31%) sepia(17%) saturate(1073%) hue-rotate(113deg) brightness(91%); }
`;
const Eyebrow = styled.p`
  margin: 0;
  color: var(--coral);
  font-size: 0.66rem;
  font-weight: 700;
  letter-spacing: 0.13em;
`;
const Intro = styled.p`
  margin: 0.55rem 0 1.8rem;
  color: var(--muted);
  font-size: 0.86rem;
  line-height: 1.55;
`;
const InputWrapper = styled.div`
  margin: 1.6rem 0;
  display: flex;
  flex-direction: column;
  gap: 1.1rem;
`;
const Grid = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 1.2rem;
  & button { padding: 0.4rem; border: 0; background: transparent; color: var(--green); font-size: 0.78rem; font-weight: 700; cursor: pointer; }
`;
const ButtonWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 0.65rem;
  & button { display: flex; width: 100%; min-height: 44px; align-items: center; justify-content: center; gap: 0.55rem; border: 0; border-radius: 5px; cursor: pointer; font-size: 0.84rem; font-weight: 700; }
  & button[type="submit"] { background: var(--green); color: white; transition: background 180ms ease; }
  & button[type="submit"]:hover { background: var(--green-dark); }
  & button:not([type="submit"]) { border: 1px solid var(--line); background: white; color: #42564e; }
  & button:not([type="submit"]):hover { background: #f7f9f5; }
`;
