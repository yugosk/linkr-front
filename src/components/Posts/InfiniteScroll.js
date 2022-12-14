import InfiniteScroll from "react-infinite-scroll-component";
import { Oval } from "react-loader-spinner";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { MdBrokenImage } from "react-icons/md";
import { ReactTagify } from "react-tagify";
import { useNavigate } from "react-router-dom";
import { AiTwotoneDelete, AiOutlineComment } from "react-icons/ai";
import { BsPencilFill } from "react-icons/bs";
import { BiRepost } from "react-icons/bi";
import axios from "axios";
import ReactModal from "react-modal";
import {
  Post,
  PostLeft,
  PostContent,
  PostSnippet,
  SnippetText,
  SnippetImage,
  CommentIcon,
  ModalStyle,
  OverlayStyle,
  RepostContainer,
  RepostSpan,
} from "../Posts/StyledPosts";
import PostLikes from "../Posts/PostLikes";
import CommentsContainer from "../Comments/Container";
import Repost from "./Reposts";

function SinglePost({
  picture,
  username,
  description,
  url,
  postOwner,
  metaTitle,
  metaImage,
  metaDescription,
  likes,
  userId,
  token,
  postId,
  isLiked,
  comments,
  reposts,
  userReposted,
}) {
  const tagStyle = {
    color: "#ffffff",
    fontWeight: 700,
    cursor: "pointer",
  };

  const navigate = useNavigate();

  const [isCommentsVisible, setIsCommentsVisible] = useState(false);
  const [commentsCount, setCommentsCount] = useState(comments);

  ReactModal.setAppElement(document.querySelector(".root"));

  const [isOpen, setIsOpen] = useState(false);

  function toggleModal() {
    setIsOpen(()=>!isOpen);

  }

  async function deleting(postId){
    const configs = {
      headers: { Authorization: token },
    };
    console.log(token);
      try{
        await axios.delete(
        `${process.env.REACT_APP_API_BASE_URL}/deleting/${postId}`,
        configs
        );
        alert('post deletado');
      } catch(error) {
        console.log(error);
        alert("There was an error deleting the post, try again");
      }

  }
  userId = parseInt(userId);
  const link = "/user/" + postOwner;

  if (metaImage === "Metadata not available" || metaImage === "") {
    return (
      <div>
        <Post>
          <PostLeft>
            <img src={picture} />
            <PostLikes
              likes={likes}
              isLiked={isLiked}
              postId={postId}
              userId={userId}
              token={token}
            />
            <CommentIcon>
              <AiOutlineComment
                onClick={() => setIsCommentsVisible((prev) => !prev)}
              />
              <p>{commentsCount} comments</p>
            </CommentIcon>
            <Repost
              userReposted={userReposted}
              reposts={reposts}
              postId={postId}
              token={token}
            />
          </PostLeft>
          <PostContent>
            {userId === postOwner ? (
              <div className="icons">
                <BsPencilFill color="white" />
                <AiTwotoneDelete
                  color="white"
                  onClick={() => toggleModal()}
                />
              </div>
            ) : (
              ""
            )}
            <ReactModal
            isOpen={isOpen}
            onRequestClose={toggleModal}
            className="_"
            overlayClassName="_"
            contentLabel="My dialog"
            closeTimeoutMS={500}
            contentElement={() => <ModalStyle>
              <p>Are you sure you want to delete this post?</p>
              <div>
                <button className="cancel" onClick={toggleModal}>No, go back</button>
                <button className="proceed" onClick={()=>deleting(postId)}>Yes, delete it</button>
              </div>
          </ModalStyle>}
          overlayElement={(props, contentElement) => <OverlayStyle {...props}>{contentElement}</OverlayStyle>}
          >
          
          </ReactModal>
            <Link key={postId} to={link}>
              {username}
            </Link>
            <ReactTagify
              tagStyle={tagStyle}
              tagClicked={(tag) => navigate(`/hashtag/${tag.slice(1)}`)}
            >
              <p>{description}</p>
            </ReactTagify>
            <PostSnippet>
              <SnippetText>
                <h1>{metaTitle}</h1>
                <p>{metaDescription.slice(0, 159)}</p>
                <a href={url} target="_blank" rel="noreferrer">
                  {url}
                </a>
              </SnippetText>
              <SnippetImage>
                <MdBrokenImage size={"32px"} color="#b7b7b7" />
              </SnippetImage>
            </PostSnippet>
          </PostContent>
        </Post>
        {isCommentsVisible && (
          <CommentsContainer
            postId={postId}
            setCommentsCount={setCommentsCount}
          />
        )}
      </div>
    );
  } else {
    return (
      <div>
        <Post>
          <PostLeft>
            <img src={picture} />
            <PostLikes
              likes={likes}
              isLiked={isLiked}
              postId={postId}
              userId={userId}
              token={token}
            />
            <CommentIcon>
              <AiOutlineComment
                onClick={() => setIsCommentsVisible((prev) => !prev)}
              />
              <p>{commentsCount} comments</p>
            </CommentIcon>
            <Repost
              userReposted={userReposted}
              reposts={reposts}
              postId={postId}
              token={token}
            />
          </PostLeft>
          <PostContent>
            {userId == postOwner ? (
              <div className="icons">
                <BsPencilFill color="white" />
                <AiTwotoneDelete
                  color="white"
                  onClick={() => toggleModal()}
                />
              </div>
            ) : (
              ""
            )}
            <ReactModal
            isOpen={isOpen}
            onRequestClose={toggleModal}
            className="_"
            overlayClassName="_"
            contentLabel="My dialog"
            closeTimeoutMS={500}
            contentElement={() => <ModalStyle>
              <p>Are you sure you want to delete this post?</p>
              <div>
                <button className="cancel" onClick={toggleModal}>No, go back</button>
                <button className="proceed" onClick={()=>deleting(postId)}>Yes, delete it</button>
              </div>
          </ModalStyle>}
          overlayElement={(props, contentElement) => <OverlayStyle {...props}>{contentElement}</OverlayStyle>}
          >
          </ReactModal>
            <Link key={postId} to={link}>
              {username}
            </Link>
            <ReactTagify
              tagStyle={tagStyle}
              tagClicked={(tag) => navigate(`/hashtag/${tag.slice(1)}`)}
            >
              <p>{description}</p>
            </ReactTagify>
            <PostSnippet>
              <SnippetText>
                <h1>{metaTitle}</h1>
                <p>{metaDescription.slice(0, 159)}</p>
                <a href={url} target="_blank" rel="noreferrer">
                  {url}
                </a>
              </SnippetText>
              <SnippetImage>
                <img src={metaImage} />
              </SnippetImage>
            </PostSnippet>
          </PostContent>
        </Post>
        {isCommentsVisible && (
          <CommentsContainer
            postId={postId}
            setCommentsCount={setCommentsCount}
          />
        )}
      </div>
    );
  }
}

function IsRepost({
  postId,
  url,
  description,
  postOwner,
  picture,
  username,
  isRepost,
  repostOwner,
  repostUsername,
  reposts,
  comments,
  likes,
  isLiked,
  userReposted,
  metaTitle,
  metaImage,
  metaDescription,
  userId,
  token,
}) {
  if (isRepost) {
    return (
      <RepostContainer>
        <RepostSpan>
          <BiRepost />
          <p>
            Re-posted by{" "}
            {Number(repostOwner) === Number(userId) ? (
              <em>you</em>
            ) : (
              <em>{repostUsername}</em>
            )}
          </p>
        </RepostSpan>
        <SinglePost
          postId={postId}
          url={url}
          description={description}
          postOwner={postOwner}
          picture={picture}
          username={username}
          reposts={reposts}
          comments={comments}
          likes={likes}
          isLiked={isLiked}
          userReposted={userReposted}
          metaTitle={metaTitle}
          metaImage={metaImage}
          metaDescription={metaDescription}
          userId={userId}
          token={token}
        />
      </RepostContainer>
    );
  } else {
    return (
      <SinglePost
        postId={postId}
        url={url}
        description={description}
        postOwner={postOwner}
        picture={picture}
        username={username}
        reposts={reposts}
        comments={comments}
        likes={likes}
        isLiked={isLiked}
        userReposted={userReposted}
        metaTitle={metaTitle}
        metaImage={metaImage}
        metaDescription={metaDescription}
        userId={userId}
        token={token}
      />
    );
  }
}

function getMorePostsParams() {
  if (window.location.pathname === "/timeline") {
    return "posts";
  } else if (window.location.pathname.slice(0, 8) === "hashtag") {
    return "hashtag";
  } else {
    return window.location.pathname.slice(1);
  }
}

export default function InfinitePosts({ posts, userId, token }) {
  const [postList, setPostList] = useState(posts);
  const [counter, setCounter] = useState(10);
  const [hasMore, setHasMore] = useState(true);
  const infiniteStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "44px",
  };
  const endMessageStyle = {
    fontFamily: "Lato",
    fontWeight: "400",
    fontSize: "16px",
    color: "#ffffff",
  };

  async function getMorePosts() {
    const requestRoute = getMorePostsParams();
    const configs = {
      headers: { Authorization: token },
    };
    try {
      const promise = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/${requestRoute}?offset=${counter}`,
        configs
      );
      if (promise.data.length < 10) {
        setHasMore(false);
      }
      setPostList(postList.concat(promise.data));
      setCounter(counter + 10);
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <InfiniteScroll
      dataLength={postList.length}
      next={() => getMorePosts()}
      hasMore={hasMore}
      loader={
        <Oval height={80} width={80} color="#1877F2" secondaryColor="#0CF0F9" />
      }
      endMessage={
        <p style={endMessageStyle}>No more previous posts for you to see.</p>
      }
      style={infiniteStyle}
    >
      {postList.map((post, index) => {
        return (
          <IsRepost
            key={index}
            postId={post.id}
            url={post.url}
            description={post.description}
            postOwner={post.postOwner}
            picture={post.picture}
            username={post.username}
            reposts={post.reposts}
            comments={post.comments}
            likes={post.likes}
            isLiked={post.isLiked}
            userReposted={post.userReposted}
            metaTitle={post.metaTitle}
            metaImage={post.metaImage}
            metaDescription={post.metaDescription}
            repostOwner={post.repostOwner}
            repostUsername={post.repostUsername}
            isRepost={post.isRepost}
            userId={userId}
            token={token}
          />
        );
      })}
    </InfiniteScroll>
  );
}
