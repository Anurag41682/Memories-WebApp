import React from "react";
import Post from "./Post/Post";
import { useSelector } from "react-redux";
import styled from "styled-components";
const Posts = ({ setCurrentId }) => {
  const posts = useSelector((state) => state.posts);
  //console.log(posts);
  return !posts.length ? (
    <CircularProgress>
      <div className="loading-screen">
        <div className="loading-spinner"></div>
        <p>Loading...</p>
      </div>
    </CircularProgress>
  ) : (
    <Grid>
      <PostWrapper>
        {posts.map((post) => (
          <GridII key={post._id}>
            <Post post={post} setCurrentId={setCurrentId} />
          </GridII>
        ))}
      </PostWrapper>
    </Grid>
  );
};
export default Posts;
const CircularProgress = styled.div`
  & .loading-screen {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    background-color: rgba(255, 255, 255, 0.8);
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 9999;
  }
  & .loading-spinner {
    border: 4px solid rgba(0, 0, 0, 0.1);
    border-top: 4px solid #3498db;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;
const Grid = styled.div`
  flex: 2;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 3.2rem;
  padding: 1rem;
  @media (max-width: 768px) {
    margin-top: 0;
  }
`;
const PostWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 1rem;
`;
const GridII = styled.div``;
