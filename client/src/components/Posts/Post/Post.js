import React from "react";
import { styled } from "styled-components";
import moment from "moment";
import { useDispatch } from "react-redux";
import { deletePost, likePost } from "../../../actions/posts";
const Post = ({ post, setCurrentId }) => {
	const dispatch = useDispatch();
	return (
		<Card>
			<CardMedia>
				<img className="IMG" src={post.selectedFile}></img>
				<div className="dot">
					<button onClick={() => setCurrentId(post._id)}>
						<img src="./Images/more_horiz.svg"></img>
					</button>
				</div>
			</CardMedia>
			<CardContent>
				<Title>{post.title}</Title>
				<div>
					<h6>{post.creator}</h6>
					<h5>{moment(post.createdAt).fromNow()}</h5>
				</div>
				<div>
					<h4>{post.tags.map((tag) => `#${tag} `)}</h4>
				</div>
				<CardMessage>
					<h5 className="msg"> {post.message}</h5>
				</CardMessage>
				<CardAction>
					<button className="btn" onClick={() => dispatch(likePost(post._id))}>
						<img src="./Images/thumb-up.svg"></img>
						<div> Like {post.likeCount}</div>
					</button>
					<button
						className="btn"
						onClick={() => dispatch(deletePost(post._id))}
					>
						<img src="./Images/delete-32-filled.svg"></img> delete
					</button>
				</CardAction>
			</CardContent>
		</Card>
	);
};
export default Post;
const Card = styled.div`
	border: 1px solid black;
	border-radius: 5px;
	overflow: hidden;
	background-color: #94c7db;
`;
const CardMedia = styled.div`
	position: relative;
	& .IMG {
		width: 100%;
		height: auto;
	}
	& .dot {
		/* position: relative;
		left: 192px;
		top: -132px; */
		position: absolute;
		right: 10px;
		top: 10px;
	}
`;
const Title = styled.div``;
const CardContent = styled.div`
	padding: 1rem;
	& * {
		line-height: 25px;
	}
	& .msg {
		padding: 0.4rem 0;
		line-height: 15px;
	}
`;
const CardMessage = styled.div``;
const CardAction = styled.div`
	padding-top: 0.6rem;
	display: flex;
	justify-content: space-between;
	& .btn {
		width: 5rem;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
`;
