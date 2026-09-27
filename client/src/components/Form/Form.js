import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { createPost, updatePost } from "../../actions/posts";
import { Link } from "react-router-dom";

const Form = ({ currentId, setCurrentId }) => {
  const [postData, setPostData] = useState({
    title: "",
    message: "",
    tags: "",
    selectedFile: "",
  });
  const dispatch = useDispatch();
  const post = useSelector((state) =>
    currentId ? state.posts.find((p) => p._id === currentId) : null
  );
  const user = JSON.parse(localStorage.getItem("profile"));
  useEffect(() => {
    if (post) setPostData({ ...post, tags: post.tags.join(", ") });
  }, [post]);
  const clear = () => {
    setCurrentId(null);
    setPostData({
      title: "",
      message: "",
      tags: "",
      selectedFile: "",
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const tags = postData.tags.split(",").map((tag) => tag.trim()).filter(Boolean);

    if (currentId) {
      dispatch(
        updatePost(currentId, { ...postData, tags, name: user?.result?.name })
      );
    } else {
      dispatch(createPost({ ...postData, tags, name: user?.result?.name }));
    }
    clear();
  };
  const onFileSelect = ({ file, base64Data }) => {
    // Handle the selected file and its Base64 data
    setPostData({ ...postData, selectedFile: base64Data });
    // console.log(base64Data);
  };
  const convertFileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };
  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    // setSelectedFile(file);
    if (file) {
      const base64Data = await convertFileToBase64(file);
      onFileSelect({ file, base64Data });
    }
  };

  if (!user?.result?.name) {
    return (
      <ContainerToLogin>
        <Panel className="signed-out">
          <FormEyebrow>YOUR JOURNAL</FormEyebrow>
          <h2>Make room for a new memory.</h2>
          <p>Sign in to add a moment to your collection and leave a little note for your future self.</p>
          <Link to="/auth">Sign in to continue <span aria-hidden="true">↗</span></Link>
        </Panel>
      </ContainerToLogin>
    );
  }
  return (
    <Container>
      <Panel>
        <form autoComplete="off" noValidate onSubmit={handleSubmit}>
          <FormEyebrow>{currentId ? "MAKE AN EDIT" : "ADD TO YOUR ALBUM"}</FormEyebrow>
          <Heading>{currentId ? "Edit this memory" : "A new memory"}</Heading>
          <FormIntro>Little details are the ones worth keeping.</FormIntro>
          <InputWrapper>
            <Input>
              <input
                name="title"
                id="memory-title"
                placeholder="Give this moment a name"
                value={postData.title}
                onChange={(e) => {
                  setPostData({ ...postData, title: e.target.value });
                }}
              ></input>
              <label htmlFor="memory-title">Title</label>
            </Input>
            <Input>
              <input
                name="tags"
                id="memory-tags"
                placeholder="family, travel, sunday"
                value={postData.tags}
                onChange={(e) => {
                  setPostData({ ...postData, tags: e.target.value });
                }}
              ></input>
              <label htmlFor="memory-tags">Tags <span>Separate with commas</span></label>
            </Input>
            <Input>
              <textarea
                className="msg"
                name="message"
                id="memory-message"
                placeholder="What do you want to remember about it?"
                value={postData.message}
                onChange={(e) => {
                  setPostData({ ...postData, message: e.target.value });
                }}
              ></textarea>
              <label htmlFor="memory-message">A few words</label>
            </Input>
            <FileWrapper className="input-file">
              {/* <FileBase
                className="file"
                type="file"
                multiple={false}
                onDone={({ base64 }) =>
                  setPostData({ ...postData, selectedFile: base64 })
                }
              ></FileBase> */}
              <label htmlFor="memory-photo">Add a photo</label>
              <input id="memory-photo" type="file" accept="image/*" onChange={handleFileChange} />
              {postData.selectedFile && (
                <PhotoPreview>
                  <img src={postData.selectedFile} alt="Selected memory preview" />
                  <span>Photo attached</span>
                </PhotoPreview>
              )}
            </FileWrapper>
          </InputWrapper>
          <ButtonWrapper>
            <button className="save" type="submit">{currentId ? "Save changes" : "Save memory"}<span aria-hidden="true">↗</span></button>
            <button className="clear" type="button" onClick={clear}>
              Clear form
            </button>
          </ButtonWrapper>
        </form>
      </Panel>
    </Container>
  );
};
export default Form;
const ContainerToLogin = styled.div`
  min-width: 0;
  @media (max-width: 850px) { order: -1; }
`;
const Container = styled.div`
  min-width: 0;
  position: sticky;
  top: 92px;
  @media (max-width: 850px) { position: static; order: -1; }
`;
const Panel = styled.div`
  padding: clamp(1.25rem, 2.4vw, 2rem);
  border: 1px solid rgba(255, 255, 255, 0.86);
  border-radius: 8px;
  background: var(--surface);
  box-shadow: var(--shadow);
  backdrop-filter: blur(14px);
  animation: rise-in 700ms 100ms both;
  &.signed-out { padding: 2rem; }
  &.signed-out h2 { max-width: 250px; margin: 0.7rem 0; font-family: "Playfair Display", serif; font-size: 1.8rem; line-height: 1.15; }
  &.signed-out p { margin: 0 0 1.4rem; color: var(--muted); font-size: 0.9rem; line-height: 1.65; }
  &.signed-out a { color: var(--green); font-size: 0.86rem; font-weight: 700; text-decoration: none; }
  &.signed-out a span { margin-left: 0.35rem; }
  @media (max-width: 850px) { &.signed-out h2 { max-width: none; } }
`;
const FormEyebrow = styled.p`
  margin: 0;
  color: var(--coral);
  font-size: 0.66rem;
  font-weight: 700;
  letter-spacing: 0.13em;
`;
const Heading = styled.h2`
  margin: 0.45rem 0 0;
  color: var(--ink);
  font-family: "Playfair Display", serif;
  font-size: 1.75rem;
  font-weight: 600;
`;
const FormIntro = styled.p`
  margin: 0.45rem 0 1.45rem;
  color: var(--muted);
  font-size: 0.84rem;
`;
const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;
const Input = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.45rem;
  & label { order: -1; color: #465d54; font-size: 0.76rem; font-weight: 700; }
  & label span { margin-left: 0.3rem; color: #8b9890; font-size: 0.68rem; font-weight: 400; }
  & input, & textarea { width: 100%; min-width: 0; padding: 0.78rem 0.85rem; border: 1px solid var(--line); border-radius: 5px; background: rgba(250, 251, 247, 0.9); color: var(--ink); font-size: 0.82rem; transition: border-color 180ms ease, box-shadow 180ms ease; }
  & input::placeholder, & textarea::placeholder { color: #9ba79f; }
  & input:focus, & textarea:focus { border-color: #7eaa9c; outline: none; box-shadow: 0 0 0 3px rgba(82, 145, 124, 0.12); }
  & textarea { min-height: 112px; resize: vertical; line-height: 1.5; }
`;
const FileWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.45rem;
  & label { color: #465d54; font-size: 0.76rem; font-weight: 700; }
  & input { width: 100%; color: var(--muted); font-size: 0.75rem; }
  & input::file-selector-button { margin-right: 0.65rem; padding: 0.55rem 0.75rem; border: 1px solid var(--line); border-radius: 4px; background: #eef2ec; color: var(--green); font: inherit; font-weight: 700; cursor: pointer; }
`;
const PhotoPreview = styled.div`
  display: flex;
  align-items: center;
  gap: 0.65rem;
  margin-top: 0.15rem;
  color: var(--green);
  font-size: 0.72rem;
  font-weight: 700;
  & img { width: 48px; height: 40px; border-radius: 4px; object-fit: cover; }
`;
const ButtonWrapper = styled.div`
  margin-top: 1.2rem;
  display: flex;
  align-items: center;
  gap: 0.9rem;
  & button { border: 0; cursor: pointer; }
  & .save { display: flex; flex: 1; align-items: center; justify-content: space-between; gap: 0.7rem; padding: 0.82rem 1rem; border-radius: 5px; background: var(--green); color: white; font-size: 0.82rem; font-weight: 700; transition: background 180ms ease, transform 180ms ease; }
  & .save:hover { background: var(--green-dark); transform: translateY(-1px); }
  & .save span { font-size: 1rem; }
  & .clear { padding: 0.6rem 0; background: transparent; color: var(--muted); font-size: 0.75rem; }
  & .clear:hover { color: var(--ink); }
`;
