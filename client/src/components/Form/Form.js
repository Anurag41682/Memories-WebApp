import React, { useState, useEffect } from "react";
import { styled } from "styled-components";
import FileBase from "react-file-base64";
import { useDispatch, useSelector } from "react-redux";
import { createPost, updatePost } from "../../actions/posts";

const Form = ({ currentId, setCurrentId }) => {
	const [postData, setPostData] = useState({
		creator: "",
		title: "",
		message: "",
		tags: "",
		selectedFile: "",
	});
	const dispatch = useDispatch();
	const post = useSelector((state) =>
		currentId ? state.posts.find((p) => p._id === currentId) : null
	);
	useEffect(() => {
		if (post) setPostData(post);
	}, [post]);

	const handleSubmit = (e) => {
		e.preventDefault();

		if (currentId) {
			dispatch(updatePost(currentId, postData));
		} else {
			dispatch(createPost(postData));
		}
		clear();
	};
	const clear = () => {
		setCurrentId(null);
		setPostData({
			creator: "",
			title: "",
			message: "",
			tags: "",
			selectedFile: "",
		});
	};

	return (
		<Container>
			<form autoComplete="off" noValidate onSubmit={handleSubmit}>
				<Heading>{currentId ? "Editing" : "Creating"} a memory</Heading>
				<InputWrapper>
					<Input>
						<input
							name="creator"
							value={postData.creator}
							onChange={(e) => {
								setPostData({ ...postData, creator: e.target.value });
							}}
						></input>
						<label>Creator</label>
					</Input>
					<Input>
						<input
							name="title"
							value={postData.title}
							onChange={(e) => {
								setPostData({ ...postData, title: e.target.value });
							}}
						></input>
						<label>Title</label>
					</Input>
					<Input>
						<textarea
							className="msg"
							name="message"
							value={postData.message}
							onChange={(e) => {
								setPostData({ ...postData, message: e.target.value });
							}}
						></textarea>
						<label>Message</label>
					</Input>
					<Input>
						<input
							name="tags"
							value={postData.tags}
							onChange={(e) => {
								setPostData({ ...postData, tags: e.target.value.split(",") });
							}}
						></input>
						<label>Tags</label>
					</Input>
					<FileWrapper className="input-file">
						<FileBase
							className="file"
							type="file"
							multiple={false}
							onDone={({ base64 }) =>
								setPostData({ ...postData, selectedFile: base64 })
							}
						></FileBase>
					</FileWrapper>
				</InputWrapper>
				<ButtonWrapper>
					<button type="submit">Submit</button>
					<button type="button" onClick={clear}>
						Clear
					</button>
				</ButtonWrapper>
			</form>
		</Container>
	);
};
export default Form;

const Container = styled.div`
	display: flex;
	margin: 1rem;
	border: 1px solid black;
	padding: 1rem;
	border-radius: 5px;
	background-color: #94c7db;
	height: 70vh;
	& form {
		width: 250px;
	}
	@media (max-width: 768px) {
		& form {
			width: 186px;
		}
	}
	@media (max-width: 530px) {
		& form {
			width: 380px;
		}
	}
`;
const Heading = styled.h3`
	padding-bottom: 1rem;
`;
const InputWrapper = styled.div`
	display: flex;
	flex-direction: column;
	gap: 0.5rem;
	& .msg {
		height: 7rem;
		width: 169px;
	}
	@media (max-width: 768px) {
		& .msg {
			height: 5rem;
			width: 102px;
		}
	}
	@media (max-width: 530px) {
		& .msg {
			width: 122px;
		}
	}
	& .input-file input[type="file" i]::-webkit-file-upload-button {
		display: flex;
		text-align: center;
	}
`;
const Input = styled.div`
	display: flex;
	flex-direction: row-reverse;
	justify-content: space-between;
	& input {
		width: 167px;
	}
	@media (max-width: 768px) {
		& input {
			width: 100px;
		}
	}
	@media (max-width: 530px) {
		& input {
			width: 120px;
		}
	}
`;
const FileWrapper = styled.div``;
const ButtonWrapper = styled.div`
	margin-top: 1rem;
	display: flex;
	gap: 1rem;
	justify-content: center;
`;
