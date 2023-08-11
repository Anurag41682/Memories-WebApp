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
              <Button>
                <button onClick={logout}>Logout</button>
              </Button>
            </User>
          ) : (
            <Button>
              <button>
                <Link className="lnk" to="/auth">
                  Login
                </Link>
              </button>
            </Button>
          )}
        </ToolBar>
      </AppBar>
    </AppBarWrapper>
  );
}
export default Navbar;
const AppBarWrapper = styled.div`
  position: fixed;
  display: flex;
  justify-content: center;
  z-index: 1;
  top: 0;
  left: 50%;
  transform: translate(-50%);
  width: 100vw;
`;
const AppBar = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  background-color: #0d111e;
  border-radius: 5px;
  padding: 0.3rem;
  border: 2px solid #39475f;
`;
const Heading = styled.h2`
  & .lnk {
    text-decoration: none;
    color: #9aa3b4;
  }
`;
const User = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: #9aa3b4;
  gap: 0.5rem;
`;
const ToolBar = styled.div``;
const Avatar = styled.div``;
const Button = styled.div`
  & button {
    padding: 10px 20px;
    color: white;
    /* background-color: #364154; */
    background-color: #023a75;
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
    /* background-color: #647c96; */
    background-color: #02438a;
  }
`;
