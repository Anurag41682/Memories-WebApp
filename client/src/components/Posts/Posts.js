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
      <Post_Wrapper>
        {posts.map((post) => (
          <GridII key={post._id}>
            <Post post={post} setCurrentId={setCurrentId} />
          </GridII>
        ))}
      </Post_Wrapper>
    </Grid>
  );
};
export default Posts;
const CircularProgress = styled.div``;
const Grid = styled.div`
  flex: 3;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  margin: 1rem;
`;
const Post_Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 1rem;
`;
const GridII = styled.div``;
