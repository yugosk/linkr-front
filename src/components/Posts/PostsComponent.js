import React from "react";
import { Link } from "react-router-dom";
import { MdBrokenImage } from "react-icons/md";
import { ReactTagify } from "react-tagify";
import { useNavigate } from "react-router-dom";
import { AiTwotoneDelete } from "react-icons/ai";
import { BsPencilFill } from "react-icons/bs";
import { HiRefresh } from "react-icons/hi";
import axios from "axios";
import {
  Post,
  PostLeft,
  PostContent,
  PostSnippet,
  SnippetText,
  SnippetImage,
  NoPosts,
  StyledNewPost,
} from "../Posts/StyledPosts";
import PostLikes from "../Posts/PostLikes";

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
}) {
  const tagStyle = {
    color: "#ffffff",
    fontWeight: 700,
    cursor: "pointer",
  };

  const navigate = useNavigate();

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
      <Post>
        <PostLeft>
          <img src={picture} />
          <br />
          <PostLikes
            likes={likes}
            isLiked={isLiked}
            postId={postId}
            userId={userId}
            token={token}
          />
        </PostLeft>
        <PostContent>
          {userId === postOwner ? (
            <div className="icons">
              <BsPencilFill color="white" />
              <AiTwotoneDelete color="white" onClick={() => deleting(postId)} />
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
    );
  } else {
    return (
      <Post>
        <PostLeft>
          <img src={picture} />
          <br />
          <PostLikes
            likes={likes}
            isLiked={isLiked}
            postId={postId}
            userId={userId}
            token={token}
          />
        </PostLeft>
        <PostContent>
          {userId == postOwner ? (
            <div className="icons">
              <BsPencilFill color="white" />
              <AiTwotoneDelete color="white" onClick={() => deleting(postId)} />
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
    );
  }
}

function MapPosts({ posts, userId, token }) {
  if (posts === "No follows") {
    return (
      <NoPosts>You don't follow anyone yet. Search for new friends!</NoPosts>
    );
  } else {
    if (posts.length === 0) {
      if (window.location.pathname === "/timeline") {
        return <NoPosts>No posts found from your friends</NoPosts>;
      } else if (window.location.pathname.slice(1, 5) === "user") {
        return <NoPosts>This user has not posted anything yet</NoPosts>;
      } else {
        return <NoPosts>This hashtag has not been used yet</NoPosts>;
      }
    } else {
      return posts.map((post, index) => {
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
      });
    }
  }
}

export default function NewPosts({
  postList,
  newPostList,
  userId,
  token,
  setPostList,
}) {
  if (newPostList.length === 0) {
    return <MapPosts posts={postList} userId={userId} token={token} />;
  } else {
    if (postList[0].id === newPostList[0].id) {
      return <MapPosts posts={postList} userId={userId} token={token} />;
    } else {
      return (
        <>
          <StyledNewPost onClick={() => setPostList(newPostList)}>
            <p>x new posts, load more!</p>
            <HiRefresh />
          </StyledNewPost>
          <MapPosts posts={postList} userId={userId} token={token} />
        </>
      );
    }
  }
}
