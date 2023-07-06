import memories from "../../images/memories.png";
import styled from "styled-components";
import { Link } from "react-router-dom";
function Navbar() {
	// const user = null;
	return (
		<AppBarWrapper>
			<AppBar>
				<Heading>
					<Link className="lnk" to="/">
						Memories
					</Link>
				</Heading>
				<img src={memories} alt="memories" height="40"></img>
				{/* <ToolBar>
					{user ? (
						<div>
							<Avatar>
								<img alt={user.name}></img>
							</Avatar>
							<h6>{}</h6>
							<button onClick={() => {}}>LogOut</button>
						</div>
					) : (
						<div>
							<button>
								<Link to="/auth">SignIn</Link>
							</button>
						</div>
					)}
				</ToolBar> */}
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
	background-color: #94c7db;
	border-radius: 5px;
	padding: 0.3rem;
	width: 80vw;
	border: 2px solid black;
`;
const Heading = styled.h2`
	& .lnk {
		text-decoration: underline;
		color: #4d657c;
	}
`;
// const ToolBar = styled.div``;
// const Avatar = styled.div``;
