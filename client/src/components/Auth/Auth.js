import styled from "styled-components";

function Auth() {
	const isSignUp = false;
	const handleSubmit = () => {};
	const handleChange = () => {};
	return (
		<Container>
			<CustomPaper>
				<Avatar>
					<img className="lockSvg" src="./Images/lock-outlined.svg"></img>
				</Avatar>
				<h5>{isSignUp ? `SignOut` : `SignIn`}</h5>
				<form onSubmit={handleSubmit}>
					{/* <Grid>{isSignUp && <><Input /></>}</Grid> */}
				</form>
			</CustomPaper>
		</Container>
	);
}
export default Auth;
const Container = styled.div`
	margin-top: 2rem;
	display: flex;
	justify-content: center;
`;
const CustomPaper = styled.div`
	background-color: #94c7db;
	box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
	border-radius: 4px;
	padding: 16px;
`;
const Avatar = styled.div`
	& .lockSvg {
		width: 3rem;
		height: auto;
	}
`;
// const Grid = styled.div``;
