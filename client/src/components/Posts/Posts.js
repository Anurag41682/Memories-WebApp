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
    min-height: 240px;
    color: var(--muted);
    font-size: 0.85rem;
  }
  & .loading-spinner {
    border: 3px solid #dce6dd;
    border-top: 3px solid var(--coral);
    border-radius: 50%;
    width: 34px;
    height: 34px;
    margin-bottom: 0.8rem;
    animation: spin 850ms linear infinite;
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
  width: 100%;
`;
const PostWrapper = styled.div`
  column-count: 2;
  column-gap: 1.2rem;
  width: 100%;
  @media (min-width: 1300px) { column-count: 3; }
  @media (max-width: 520px) { column-count: 1; column-gap: 1rem; }
`;
const GridII = styled.div`
  display: inline-block;
  width: 100%;
  margin-bottom: 1.2rem;
  min-width: 0;
  break-inside: avoid;
  &:nth-child(3n + 2) { animation-delay: 80ms; }
  &:nth-child(3n + 3) { animation-delay: 160ms; }
`;
