import React from "react";
import styled from "styled-components";
import moment from "moment";
import { useDispatch } from "react-redux";
import { deletePost, likePost } from "../../../actions/posts";
import { animateScroll } from "react-scroll";
const Post = ({ post, setCurrentId }) => {
  const user = JSON.parse(localStorage.getItem("profile"));
  const Likes = () => {
    // if (post.likes.length > 0) {
    //   return post.likes.find(
    //     (like) => like === (user?.result?.googleId || user?.result?._id)
    //   ) ? (
    //     <>
    //       {/* <ThumbUpAltIcon fontSize="small" /> */}
    //       &nbsp;
    //       {post.likes.length > 2
    //         ? `You and ${post.likes.length - 1} others`
    //         : `${post.likes.length} like${post.likes.length > 1 ? "s" : ""}`}
    //     </>
    //   ) : (
    //     <>
    //       {/* <ThumbUpAltOutlined fontSize="small" /> */}
    //       &nbsp;{post.likes.length} {post.likes.length === 1 ? "Like" : "Likes"}
    //     </>
    //   );
    // }

    return (
      <>
        {/* <ThumbUpAltOutlined fontSize="small" /> */}
        {/* &nbsp;Like */}

        {post.likes.length ? post.likes.length : ""}
      </>
    );
  };
  const dispatch = useDispatch();
  const handleClick = () => {
    setCurrentId(post._id);
    if (window.innerWidth <= 768) {
      animateScroll.scrollToTop({ smooth: true, duration: 1000 });
    }
  };
  return (
    <Card>
      <CardMedia>
        <img className="IMG" src={post.selectedFile}></img>
        {(user?.result?.googleId === post?.creator ||
          user?.result?._id === post?.creator) && (
          <div className="dot">
            <button
              // onClick={() => {
              //   setCurrentId(post._id);
              //   if(screenWidth<768px){
              //   }
              // }}
              onClick={handleClick}
            >
              <img src="./Images/more_horiz.svg"></img>
            </button>
          </div>
        )}
      </CardMedia>
      <CardContent>
        <Title>{post.title}</Title>
        <div>
          <h6>{post.name}</h6>
          <h5>{moment(post.createdAt).fromNow()}</h5>
        </div>
        <div>
          <h4>{post.tags.map((tag) => `#${tag} `)}</h4>
        </div>
        <CardMessage>
          <h5 className="msg"> {post.message}</h5>
        </CardMessage>
        <CardAction>
          <Button>
            <button
              className={`btn ${user?.result ? "hoverable" : "not-hoverable"}`}
              disabled={!user?.result}
              onClick={() => dispatch(likePost(post._id))}
            >
              <img src="./Images/thumb-up.svg"></img>
              <Likes></Likes>
            </button>
          </Button>
          {(user?.result?.googleId === post?.creator ||
            user?.result?._id === post?.creator) && (
            <Button>
              <button
                className="btn"
                onClick={() => dispatch(deletePost(post._id))}
              >
                <img src="./Images/delete-32-filled.svg"></img> Delete
              </button>
            </Button>
          )}
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
  background-color: #0d111e;
  color: #9aa3b4;
  box-shadow: 1px 1px 8px #9ca4ac;
  /* width: 20vw; */
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
    & button {
      background-color: #023a75;
      border: none;
      border-radius: 5px;
      padding: 0.2rem 0.4rem;
    }
    & button:hover {
      background-color: #02438a;
    }
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
    width: 10rem;
    height: 2.2rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  @media (max-width: 480px) {
    & .btn {
      width: 4.8rem;
      height: 2rem;
    }
  }
`;
const Button = styled.div`
  & button {
    padding: 5px 20px;
    color: white;
    /* background-color: #364154; */
    background-color: #023a75;
    border: none;
    border-radius: 5px;
    font-size: 14px;
    cursor: pointer;
    gap: 0.5rem;
  }
  & .hoverable:hover {
    background-color: #02438a;
  }
  & .not-hoverable:hover {
    cursor: not-allowed;
  }
`;
