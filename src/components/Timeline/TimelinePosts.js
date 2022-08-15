import styled from "styled-components";
import React, { useState } from "react";
import { MdBrokenImage } from "react-icons/md";
import { Oval } from "react-loader-spinner";
import { ReactTagify } from "react-tagify";
import { useNavigate } from "react-router-dom";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import ReactTooltip from "react-tooltip";
import axios from "axios";

const Post = styled.div`
  display: flex;
  background-color: #171717;
  flex-direction: row;
  width: 611px;
  min-height: 276px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 16px;
  margin-bottom: 30px;
  box-sizing: content-box;
  padding-bottom: 20px;

  @media (max-width: 612px) {
    width: 100%;
    height: 232px;
    border-radius: 0;
    padding: 0 0 8px 0;
    margion-bottom: 16px;
  }
`;

const PostLeft = styled.div`
  width: 14%;
  height: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  margin-top: 17px;

  img {
    width: 50px;
    height: 50px;
    object-fit: cover;
    border-radius: 50%;
    display: block;
  }

  @media (max-width: 612px) {
  }
`;

const PostContent = styled.div`
  width: 86%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  margin-top: 17px;
  h1 {
    font-family: "Lato";
    font-weight: 400;
    font-size: 19px;
    color: #ffffff;
    text-align: left;
    line-height: 23px;
    margin-bottom: 7px;
  }

  p {
    font-family: "Lato";
    font-weight: 400;
    font-size: 17px;
    color: #b7b7b7;
    text-align: left;
    line-height: 20px;
    margin-bottom: 12px;
    padding-right: 22px;
    min-height: 52px;
  }

  @media (max-width: 612px) {
    padding: 10px 15px 0 15px;
    width: 97%;

    h1 {
      font-size: 17px;
    }

    p {
      font-size: 15px;
    }
  }
`;

const PostSnippet = styled.div`
  display: flex;
  flex-direction: row;
  width: 503px;
  min-height: 155px;
  border: 1px solid #4d4d4d;
  border-radius: 12px;
  margin-bottom: 20px;

  @media (max-width: 612px) {
    width: 97%;
    height: 155px;
    border: 1px solid #4d4d4d;
    border-radius: 12px;
  }
`;

const SnippetText = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  text-align: left;
  width: 70%;
  height: 100%;
  padding: 24px 0 23px 20px;
  box-sizing: border-box;

  h1 {
    font-family: "Lato";
    font-weight: 400;
    font-size: 16px;
    color: #cecece;
    margin-bottom: 5px;
  }

  p {
    font-family: "Lato";
    font-weight: 400;
    font-size: 11px;
    color: #9b9595;
    margin-bottom: 13px;
  }

  a {
    font-family: "Lato";
    font-weight: 400;
    font-size: 11px;
    color: #cecece;
    text-decoration: none;
    word-break: break-all;
  }

  @media (max-width: 612px) {
    padding: 7px 7px 8px 11px;

    h1 {
      font-size: 11px;
      margin-bottom: 4px;
    }

    p {
      font-size: 9px;
      margin-bottom: 4px;
    }

    a {
      font-size: 9px;
    }
  }
`;

const SnippetImage = styled.div`
  display: flex;
  width: 30%;
  height: 100%;
  align-items: center;
  justify-content: center;

  img {
    width: 100%;
    height: 100%;
    border-radius: 0 12px 12px 0;
    object-fit: cover;
  }
`;

const NoPosts = styled.p`
  text-align: center;
  font-family: "Lato";
  font-size: 28px;
  font-weight: 400px;
  color: #ffffff;
`;

const StyledLikes = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  height: 35px;

  svg {
    color: ${(props) => (props.liked ? "#ac0000" : "#ffffff")};
    height: 18px;
    width: 20px;
    margin-bottom: 4px;
    cursor: pointer;
  }

  p {
    font-family: "Lato";
    font-weight: 400;
    font-size: 11px;
    text-align: center;
    color: #ffffff;
  }

  @media (max-width: 612px) {
    svg {
      height: 15px;
      width: 17px;
      margin-bottom: 12px;
    }

    p {
      font-size: 9px;
    }
  }
`;

function defineTooltip(likes, isLiked, count, userId) {
  const newLikes = likes.filter((i) => i.userId !== userId);
  if (likes.length === 0) {
    return "Nobody liked this post yet :(";
  } else if (likes.length === 1) {
    if (isLiked) {
      return "You";
    } else {
      return `${likes[0].username}`;
    }
  } else if (likes.length === 2) {
    if (isLiked) {
      return `You and ${newLikes[0].username}`;
    } else {
      return `${likes[0].username} and ${likes[1].username}`;
    }
  } else {
    if (isLiked) {
      return `You, ${newLikes[0].username} and other ${count - 2} people`;
    } else {
      return `${likes[0].username}, ${likes[1].username} and other ${
        count - 2
      } people`;
    }
  }
}

function PostLikes({ isLiked, likes, postId, userId, token }) {
  const [liked, setLiked] = useState(isLiked);
  const [disabled, setDisabled] = useState(false);
  const [count, setCount] = useState(likes.length);
  const [tooltip, setTooltip] = useState(
    defineTooltip(likes, isLiked, count, userId)
  );

  async function postLike(postId) {
    const configs = {
      headers: { Authorization: token },
    };
    setDisabled(true);
    if (liked) {
      try {
        console.log(configs);
        await axios.delete(
          `${process.env.REACT_APP_API_BASE_URL}/likes/${postId}`,
          configs
        );
        setLiked(false);
        setCount(count - 1);
        setTooltip(defineTooltip(likes, isLiked, count, userId));
      } catch {
        alert("There was an error unliking the post, try again later");
      } finally {
        setDisabled(false);
      }
    } else {
      try {
        console.log(configs);
        await axios.post(
          `${process.env.REACT_APP_API_BASE_URL}/likes/${postId}`,
          {},
          configs
        );
        setLiked(true);
        setCount(count + 1);
        setTooltip(defineTooltip(likes, isLiked, count, userId));
      } catch {
        alert("There was an error liking the post, try again later");
      } finally {
        setDisabled(false);
      }
    }
  }

  if (liked) {
    return (
      <StyledLikes liked={true}>
        <AiFillHeart onClick={!disabled ? () => postLike(postId) : null} />
        <p data-tip={tooltip}>{count} likes</p>
        <ReactTooltip place="bottom" type="light" />
      </StyledLikes>
    );
  } else {
    return (
      <StyledLikes liked={false}>
        <AiOutlineHeart onClick={!disabled ? () => postLike(postId) : null} />
        <p data-tip={tooltip}>{count} likes</p>
        <ReactTooltip place="bottom" type="light" />
      </StyledLikes>
    );
  }
}

function SinglePost({
  postId,
  picture,
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
          <h1>{username}</h1>
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
          <h1>{username}</h1>
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
  if (posts.length === 0) {
    return <NoPosts>There are no posts yet</NoPosts>;
  } else {
    return posts.map((post, index) => {
      return (
        <SinglePost
          key={index}
          picture={post.picture}
          username={post.username}
          description={post.description}
          url={post.url}
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

export default function PostList({ loading, posts, userId, token }) {
  if (loading) {
    return (
      <Oval height={80} width={80} color="#1877F2" secondaryColor="#0CF0F9" />
    );
  } else {
    return <MapPosts posts={posts} userId={userId} token={token} />;
  }
}
