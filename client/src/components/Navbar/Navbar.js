import { useState, useEffect } from "react";
import memories from "../../images/memories.png";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import decode from "jwt-decode";
function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const logout = () => {
    dispatch({ type: "LOGOUT" });
    navigate("/");
    setUser(null);
  };
  useEffect(() => {
    const token = user?.token;
    if (token) {
      const decodedToken = decode(token);
      if (decodedToken.exp * 1000 < new Date().getTime()) logout();
    }
    setUser(JSON.parse(localStorage.getItem("profile")));
  }, [location]);
  return (
    <AppBarWrapper>
      <AppBar>
        <Heading>
          <Link className="lnk" to="/">
            Memories
          </Link>
        </Heading>
        <img src={memories} alt="memories" height="40"></img>
        <ToolBar>
          {user ? (
            <User>
              <Avatar>
                <img
                  width="30px"
                  src={user.result.imageUrl}
                  alt={user.name}
                ></img>
              </Avatar>
              <h6>{user.result.name}</h6>
              <button onClick={logout}>LogOut</button>
            </User>
          ) : (
            <LoginButton>
              <button>
                <Link className="lnk" to="/auth">
                  Login
                </Link>
              </button>
            </LoginButton>
          )}
        </ToolBar>
      </AppBar>
    </AppBarWrapper>
  );
}
export default Navbar;
const AppBarWrapper = styled.div`
  margin-top: 1rem;
  display: flex;
  justify-content: center;
`;
const AppBar = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  background-color: #00709c;
  border-radius: 5px;
  padding: 0.3rem;
  width: 94vw;
  border: 2px solid black;
`;
const Heading = styled.h2`
  & .lnk {
    text-decoration: none;
    color: #e9e9e9;
  }
`;
const User = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
`;
const ToolBar = styled.div``;
const Avatar = styled.div``;
const LoginButton = styled.div`
  & button {
    padding: 10px 20px;
    background-color: #012953;
    color: white;
    border: none;
    border-radius: 5px;
    font-size: 16px;
    cursor: pointer;
    & .lnk {
      text-decoration: none;
      color: #ffffff;
    }
  }
  & button:hover {
    background-color: #02438a;
  }
`;
