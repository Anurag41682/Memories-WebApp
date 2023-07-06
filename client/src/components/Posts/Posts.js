import React from "react";
import Post from "./Post/Post";
import { useSelector } from "react-redux";
import { styled } from "styled-components";
const Posts = ({ setCurrentId }) => {
	const posts = useSelector((state) => state.posts);
	//console.log(posts);
	return !posts.length ? (
		<CircularProgress></CircularProgress>
	) : (
		<Grid>
			{posts.map((post) => (
				<GridII key={post._id}>
					<Post post={post} setCurrentId={setCurrentId} />
				</GridII>
			))}
		</Grid>
	);
};
export default Posts;
const CircularProgress = styled.div``;
const Grid = styled.div`
	margin: 1rem;
	display: flex;
	gap: 2rem;
	flex-wrap: wrap;
`;
const GridII = styled.div``;
