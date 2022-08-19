import React, { useContext, useState } from "react";
import { BiRepost } from "react-icons/bi";
import { StyledRepost } from "../Posts/StyledPosts";
import RepostsContext from "../../contexts/repostsContext";
import axios from "axios";

function repostText(count) {
  if (count < 2) {
    return `${count} re-post`;
  } else {
    return `${count} re-posts`;
  }
}

export default function Repost({ userReposted, reposts, postId, token }) {
  const { setRepostId, setModal } = useContext(RepostsContext);
  const [count, setCount] = useState(reposts);
  function openModal() {
    setRepostId(postId);
    setModal(true);
  }

  async function deleteRepost() {
    const configs = {
      headers: { Authorization: token },
    };
    try {
      await axios.delete(
        `${process.env.REACT_APP_API_BASE_URL}/reposts/${postId}`,
        configs
      );
      setCount(count - 1);
    } catch (error) {
      console.log(error);
      alert("There was an error attempting to undo repost, try again later");
    }
  }

  return (
    <StyledRepost>
      <BiRepost
        onClick={userReposted ? () => deleteRepost() : () => openModal()}
      />
      <p>{repostText(count)}</p>
    </StyledRepost>
  );
}
