import { useState, useEffect, useCallback } from "react";
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
  const logout = useCallback(() => {
    dispatch({ type: "LOGOUT" });
    navigate("/");
    setUser(null);
  }, [dispatch, navigate]);
  useEffect(() => {
    const token = user?.token;
    if (token) {
      const decodedToken = decode(token);
      if (decodedToken.exp * 1000 < new Date().getTime()) logout();
    }
    setUser(JSON.parse(localStorage.getItem("profile")));
  }, [location, logout, user?.token]);
  return (
    <AppBarWrapper>
      <AppBar>
        <Heading>
          <Link className="lnk" to="/">
            <span className="brand-mark"><img src={memories} alt="" /></span>
            Memories
          </Link>
        </Heading>
        <Descriptor>Keep the moments that make you, you.</Descriptor>
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
                <button onClick={logout}>Sign out</button>
              </Button>
            </User>
          ) : (
            <Button>
              <button>
                <Link className="lnk" to="/auth">
                  Sign in
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
  position: sticky;
  z-index: 10;
  top: 0;
  width: 100%;
  padding: 0.85rem clamp(1rem, 4vw, 3.5rem);
  background: rgba(248, 247, 241, 0.76);
  border-bottom: 1px solid rgba(209, 220, 211, 0.72);
  backdrop-filter: blur(18px);
`;
const AppBar = styled.div`
  display: flex;
  width: min(1440px, 100%);
  margin: 0 auto;
  justify-content: space-between;
  align-items: center;
  gap: 1.25rem;
  min-height: 42px;
  @media (max-width: 620px) {
    gap: 0.6rem;
  }
`;
const Heading = styled.h2`
  font-family: "Playfair Display", serif;
  font-size: 1.45rem;
  font-weight: 600;
  white-space: nowrap;
  & .lnk {
    display: flex;
    align-items: center;
    gap: 0.65rem;
    text-decoration: none;
    color: var(--ink);
  }
  & .brand-mark {
    display: grid;
    width: 36px;
    height: 36px;
    place-items: center;
    border-radius: 12px;
    background: #e8eee5;
  }
  & img {
    width: 23px;
    height: 23px;
    object-fit: contain;
  }
  @media (max-width: 620px) {
    font-size: 1.2rem;
    & .brand-mark { width: 32px; height: 32px; }
  }
`;
const Descriptor = styled.p`
  margin: 0 auto 0 1.2rem;
  color: var(--muted);
  font-size: 0.82rem;
  @media (max-width: 620px) { display: none; }
`;
const User = styled.div`
  display: flex;
  align-items: center;
  color: var(--ink);
  gap: 0.75rem;
  & h6 { margin: 0; font-size: 0.84rem; font-weight: 600; }
  @media (max-width: 480px) { & h6 { display: none; } }
`;
const ToolBar = styled.div`flex-shrink: 0;`;
const Avatar = styled.div`
  width: 34px;
  height: 34px;
  overflow: hidden;
  border-radius: 50%;
  background: #e6ede6;
  & img { display: block; width: 100%; height: 100%; object-fit: cover; }
`;
const Button = styled.div`
  & button {
    padding: 0.65rem 1rem;
    color: white;
    background-color: var(--green);
    border: none;
    border-radius: 999px;
    font-size: 0.82rem;
    font-weight: 700;
    cursor: pointer;
    transition: background 180ms ease, transform 180ms ease;
    &:hover { background: var(--green-dark); transform: translateY(-1px); }
    & .lnk { text-decoration: none; color: inherit; }
  }
  @media (max-width: 480px) { & button { padding: 0.58rem 0.82rem; } }
`;
