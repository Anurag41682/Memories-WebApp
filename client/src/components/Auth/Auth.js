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
        <Avatar>
          <img className="lockSvg" src="./Images/lock-outlined.svg"></img>
        </Avatar>
        <h2>{isSignUp ? `Signup` : `Signin`}</h2>
        <form onSubmit={handleSubmit}>
          <InputWrapper>
            {isSignUp && (
              <>
                <Input
                  label="First Name: "
                  name="firstName"
                  autofocus
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
                  onClick={renderProps.onClick}
                  disabled={renderProps.disabled}
                >
                  <img width="20px" src={GoogleIcon}></img>
                  Google Sign In
                </button>
              )}
              onSuccess={googleSuccess}
              onFailure={googleFailure}
              cookiePolicy="single_host_origin"
            />
          </ButtonWrapper>
          <Grid>
            <button onClick={switchMode}>
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
  margin-top: 8.2rem;
  display: flex;
  justify-content: center;
  & button {
    background-color: #023a75;
    color: white;
  }
  margin-bottom: 10rem;
`;
const CustomPaper = styled.div`
  background-color: #0d111e;
  color: #9aa3b4;
  box-shadow: 1px 1px 8px #9ca4ac;
  border-radius: 4px;
  padding: 2rem;
  width: 25rem;
  @media (max-width: 480px) {
    width: 15rem;
  }
`;
const Avatar = styled.div`
  display: flex;
  justify-content: center;
  & .lockSvg {
    width: 3rem;
    height: auto;
  }
`;
const InputWrapper = styled.div`
  margin: 2rem 0;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;
const Grid = styled.div`
  display: flex;
  justify-content: center;
`;
const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  margin: 1rem;

  & button {
    display: flex;
    align-items: center;
  }
`;
