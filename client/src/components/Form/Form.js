import React, { useState, useEffect } from "react";
import { styled } from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { createPost, updatePost } from "../../actions/posts";

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
    if (post) setPostData(post);
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

    if (currentId) {
      dispatch(
        updatePost(currentId, { ...postData, name: user?.result?.name })
      );
    } else {
      dispatch(createPost({ ...postData, name: user?.result?.name }));
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
        <Fixed_Container>
          <h4>Please login first to create and like Memories.</h4>
        </Fixed_Container>
      </ContainerToLogin>
    );
  }
  return (
    <Container>
      <Fixed_Container>
        <form autoComplete="off" noValidate onSubmit={handleSubmit}>
          <Heading>{currentId ? "Editing the" : "Create a"} memory</Heading>
          <InputWrapper>
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
              <input
                name="tags"
                value={postData.tags}
                onChange={(e) => {
                  setPostData({ ...postData, tags: e.target.value.split(",") });
                }}
              ></input>
              <label>Tags</label>
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
            <br></br>
            <FileWrapper className="input-file">
              {/* <FileBase
                className="file"
                type="file"
                multiple={false}
                onDone={({ base64 }) =>
                  setPostData({ ...postData, selectedFile: base64 })
                }
              ></FileBase> */}
              <input type="file" onChange={handleFileChange} />
            </FileWrapper>
          </InputWrapper>
          <ButtonWrapper>
            <button type="submit">Submit</button>
            <button type="button" onClick={clear}>
              Clear
            </button>
          </ButtonWrapper>
        </form>
      </Fixed_Container>
    </Container>
  );
};
export default Form;
const ContainerToLogin = styled.div`
  flex: 1;
  padding: 1rem;
`;
const Container = styled.div`
  flex: 1;
  padding: 1rem;
`;
const Fixed_Container = styled.div`
  padding: 1rem;
  text-align: center;
  border-radius: 5px;
  background-color: #0d111e;
  color: #9aa3b4;
  box-shadow: 1px 1px 8px #9ca4ac;
  position: fixed;
  top: 3.2rem; /* Adjust as needed */
  left: 65.7vw; /* Adjust as needed */
  bottom: 0rem;
  right: 0rem;
  display: flex;
  align-items: center;
  justify-content: center;
  @media (max-width: 768px) {
    margin: 0;
    margin-top: 3.2rem;
    position: static;
  }
  margin: 1rem;
  box-sizing: border-box;
`;
const Heading = styled.h3`
  margin-bottom: 3rem;
  /* text-align: center; */
`;
const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  /* & .input-file input[type="file" i]::-webkit-file-upload-button {
    display: flex;
    text-align: center;
    width: 1rem;
  } */
`;
const Input = styled.div`
  display: flex;
  flex-direction: row-reverse;
  justify-content: space-between;
  gap: 0.5rem;
  & input {
    width: 14vw;
    background-color: #e6e6e6;
  }
  & .msg {
    background-color: #e6e6e6;
    height: 30vh;
    width: 14vw;
  }
  & .msg:focus {
    outline: none;
  }
  & input:focus {
    outline: none;
  }
  @media (max-width: 768px) {
    & input {
      width: 40vw;
    }
    & .msg {
      width: 40vw;
    }
  }
`;
const FileWrapper = styled.div`
  & input {
    width: 12rem;
  }
`;
const ButtonWrapper = styled.div`
  margin-top: 1rem;
  display: flex;
  gap: 1rem;
  justify-content: center;
  & button {
    background-color: #023a75;
    border: none;
    border-radius: 5px;
    padding: 0.4rem 0.6rem;
    color: white;
  }
`;
