import React, { useState } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import ReactTooltip from "react-tooltip";
import axios from "axios";
import { StyledLikes } from "./StyledPosts";

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

export default function PostLikes({ isLiked, likes, postId, userId, token }) {
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
