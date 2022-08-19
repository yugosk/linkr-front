import InfiniteScroll from "react-infinite-scroll-component";
import { Oval } from "react-loader-spinner";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { MdBrokenImage } from "react-icons/md";
import { ReactTagify } from "react-tagify";
import { useNavigate } from "react-router-dom";
import { AiTwotoneDelete, AiOutlineComment } from "react-icons/ai";
import { BsPencilFill } from "react-icons/bs";
import axios from "axios";
import {
  Post,
  PostLeft,
  PostContent,
  PostSnippet,
  SnippetText,
  SnippetImage,
  CommentIcon,
} from "../Posts/StyledPosts";
import PostLikes from "../Posts/PostLikes";
import CommentsContainer from "../Comments/Container";

function SinglePost({
  postId,
  picture,
  postOwner,
  username,
  description,
  url,
  metaTitle,
  metaImage,
  metaDescription,
  likes,
  userId,
  token,
  isLiked,
  comments = 0,
}) {
  const tagStyle = {
    color: "#ffffff",
    fontWeight: 700,
    cursor: "pointer",
  };

  const navigate = useNavigate();

  const [isCommentsVisible, setIsCommentsVisible] = useState(false);
  const [commentsCount, setCommentsCount] = useState(comments);

  async function deleting(postId) {
    const configs = {
      headers: { Authorization: `${token}` },
    };
    //console.log(token);
    if (window.confirm("Deletar post?")) {
      try {
        await axios.delete(
          `${process.env.REACT_APP_API_BASE_URL}/deleting/${postId}`,
          configs
        );
        alert("post deletado");
      } catch (error) {
        console.log(error);
        alert("There was an error deleting the post, try again");
      }
    }
  }

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
          </PostLeft>
          <PostContent>
            {userId === postOwner ? (
              <div className="icons">
                <BsPencilFill color="white" />
                <AiTwotoneDelete
                  color="white"
                  onClick={() => deleting(postId)}
                />
              </div>
            ) : (
              ""
            )}
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
          </PostLeft>
          <PostContent>
            {userId == postOwner ? (
              <div className="icons">
                <BsPencilFill color="white" />
                <AiTwotoneDelete
                  color="white"
                  onClick={() => deleting(postId)}
                />
              </div>
            ) : (
              ""
            )}
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
    const configs = {
      headers: { Authorization: token },
    };
    try {
      const promise = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/posts?offset=${counter}`,
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
          <SinglePost
            key={index}
            picture={post.picture}
            username={post.username}
            description={post.description}
            url={post.url}
            postOwner={post.postOwner}
            metaTitle={post.metaTitle}
            metaImage={post.metaImage}
            metaDescription={post.metaDescription}
            likes={post.likes}
            userId={userId}
            token={token}
            postId={post.id}
            isLiked={post.isLiked}
          />
        );
      })}
    </InfiniteScroll>
  );
}
