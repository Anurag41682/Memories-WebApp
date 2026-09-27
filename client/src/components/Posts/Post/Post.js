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
  const canEdit = user?.result?.googleId === post?.creator ||
    user?.result?._id === post?.creator;
  const editButton = canEdit && (
    <button
      className={!post.selectedFile ? "edit-inline" : undefined}
      onClick={handleClick}
      aria-label="Edit memory"
    >
      <img src="./Images/more_horiz.svg" alt=""></img>
    </button>
  );
  return (
    <Card>
      {post.selectedFile && (
        <CardMedia>
          <img className="IMG" src={post.selectedFile} alt={post.title || "Memory"}></img>
          {canEdit && (
          <div className="dot">
              {editButton}
          </div>
          )}
        </CardMedia>
      )}
      <CardContent>
        <TitleRow>
          <Title>{post.title}</Title>
          {!post.selectedFile && editButton}
        </TitleRow>
        <div className="meta">
          <h6>{post.name}</h6>
          <h5>{moment(post.createdAt).fromNow()}</h5>
        </div>
        <div>
          <h4>{post.tags.map((tag) => `#${tag} `)}</h4>
        </div>
        <CardMessage className={!post.selectedFile ? "text-only" : undefined}>
          <h5 className="msg"> {post.message}</h5>
        </CardMessage>
        <CardAction>
          <Button>
            <button
              className={`btn ${user?.result ? "hoverable" : "not-hoverable"}`}
              disabled={!user?.result}
              onClick={() => dispatch(likePost(post._id))}
            >
              <img src="./Images/thumb-up.svg" alt=""></img>
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
                <img src="./Images/delete-32-filled.svg" alt=""></img> Delete
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
  border: 1px solid rgba(255, 255, 255, 0.92);
  border-radius: 7px;
  overflow: hidden;
  background: rgba(255, 255, 255, 0.82);
  color: var(--ink);
  box-shadow: 0 10px 28px rgba(31, 59, 50, 0.08);
  animation: rise-in 600ms both;
  transition: transform 220ms ease, box-shadow 220ms ease;
  &:hover { transform: translateY(-4px); box-shadow: 0 18px 36px rgba(31, 59, 50, 0.13); }
`;
const CardMedia = styled.div`
  position: relative;
  overflow: hidden;
  background: #e3e9df;
  & .IMG {
    display: block;
    width: 100%;
    aspect-ratio: 1.38 / 1;
    object-fit: cover;
    transition: transform 500ms cubic-bezier(0.2, 0.7, 0.2, 1);
  }
  ${Card}:hover & .IMG { transform: scale(1.035); }
  & .dot {
    position: absolute;
    right: 12px;
    top: 12px;
    & button {
      display: grid;
      width: 36px;
      height: 36px;
      place-items: center;
      background: rgba(22, 48, 41, 0.78);
      border: none;
      border-radius: 50%;
      cursor: pointer;
      backdrop-filter: blur(8px);
    }
    & img { width: 20px; filter: brightness(0) invert(1); }
    & button:hover { background: var(--green); }
  }
`;
const TitleRow = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 0.75rem;
  & .edit-inline {
    display: grid;
    flex: 0 0 34px;
    width: 34px;
    height: 34px;
    place-items: center;
    margin-top: -0.2rem;
    background: #edf2ec;
    border: 0;
    border-radius: 50%;
    cursor: pointer;
    transition: background 180ms ease, transform 180ms ease;
  }
  & .edit-inline:hover { background: #dce8dd; transform: translateY(-1px); }
  & .edit-inline img { width: 18px; height: 18px; object-fit: contain; }
`;
const Title = styled.h3`
  margin: 0 0 0.65rem;
  color: var(--ink);
  font-family: "Playfair Display", serif;
  font-size: 1.35rem;
  font-weight: 600;
  line-height: 1.2;
  overflow-wrap: anywhere;
`;
const CardContent = styled.div`
  padding: 1.05rem 1.1rem 1rem;
  & .meta { display: flex; align-items: baseline; justify-content: space-between; gap: 0.6rem; }
  & h6 { margin: 0; color: var(--green); font-size: 0.73rem; font-weight: 700; }
  & h5 { margin: 0; color: #8d9a92; font-size: 0.68rem; font-weight: 500; }
  & h4 { margin: 0.65rem 0 0; color: #d17458; font-size: 0.72rem; font-weight: 600; line-height: 1.5; overflow-wrap: anywhere; }
  & .msg {
    display: -webkit-box;
    margin: 0.5rem 0 0;
    overflow: hidden;
    color: #566a60;
    font-size: 0.82rem;
    font-weight: 400;
    line-height: 1.6;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
  }
`;
const CardMessage = styled.div`
  min-height: 4.4rem;
  &.text-only { min-height: 0; }
`;
const CardAction = styled.div`
  padding-top: 0.8rem;
  display: flex;
  align-items: center;
  gap: 0.65rem;
  border-top: 1px solid #edf0ea;
  & .btn {
    min-width: 44px;
    min-height: 38px;
    padding: 0.4rem 0.7rem;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.45rem;
    white-space: nowrap;
    & img { width: 16px; height: 16px; object-fit: contain; filter: brightness(0) invert(1); }
  }
`;
const Button = styled.div`
  flex: 1;
  min-width: 0;
  & button {
    color: white;
    background: var(--green);
    border: none;
    border-radius: 4px;
    font-size: 0.72rem;
    font-weight: 700;
    cursor: pointer;
    transition: background 180ms ease, transform 180ms ease;
  }
  & .hoverable:hover { background: var(--green-dark); transform: translateY(-1px); }
  & .not-hoverable { opacity: 0.65; }
  & .not-hoverable:hover { cursor: not-allowed; }
`;
