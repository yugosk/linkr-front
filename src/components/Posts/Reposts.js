import React, { useState } from "react";
import { BiRepost } from "react-icons/bi";
import axios from "axios";
import { StyledRepost } from "../Posts/StyledPosts";

function repostText(count) {
  if (count < 2) {
    return `${count} re-post`;
  } else {
    return `${count} re-posts`;
  }
}

export default function Repost({ userReposted, reposts, postId, token }) {
  const [reposted, setReposted] = useState(userReposted);
  const [disabled, setDisabled] = useState(false);
  const [count, setCount] = useState(Number(reposts));

  async function repost(postId) {
    const configs = {
      headers: { Authorization: token },
    };
    setDisabled(true);
    if (reposted) {
      try {
        await axios.delete(
          `${process.env.REACT_APP_API_BASE_URL}/reposts/${postId}`,
          configs
        );
        setReposted(false);
        setCount(count - 1);
      } catch (error) {
        console.log(error);
        alert("There was an error attempting to undo repost, try again later");
      } finally {
        setDisabled(false);
      }
    } else {
      try {
        await axios.post(
          `${process.env.REACT_APP_API_BASE_URL}/reposts/${postId}`,
          {},
          configs
        );
        setReposted(true);
        setCount(count + 1);
      } catch (error) {
        console.log(error);
        alert("There was an error while reposting, try again later");
      } finally {
        setDisabled(false);
      }
    }
  }

  return (
    <StyledRepost>
      <BiRepost onClick={!disabled ? () => repost(postId) : null} />
      <p>{repostText(count)}</p>
    </StyledRepost>
  );
}

const responseFormat = {
  id: 53,
  url: "https://stackoverflow.com/questions/14987321/postgresql-in-operator-with-subquery-poor-performance",
  description: "esse é um post normal não repostado",
  postOwner: 22,
  picture:
    "https://www.coliseugeek.com.br/wp-content/uploads/2021/06/Falas-dos-personagens-de-Valorant-transformadas-em-musica.png",
  username: "juliana",
  isRepost: true,
  repostOwner: 9,
  repostUsername: "yugo1",
  reposts: "1",
  comments: "0",
  likes: [
    {
      username: "yugo1",
      userId: 9,
    },
  ],
  isLiked: true,
  userReposted: true,
  metaTitle: "PostgreSQL IN operator with subquery poor performance",
  metaImage:
    "https://cdn.sstatic.net/Sites/stackoverflow/Img/apple-touch-icon@2.png?v=73d79a89bded",
  metaDescription:
    'Why is the "IN" operator so slow when used with subquery?\n\nselect * \nfrom view1 \nwhere id in (1,2,3,4,5,6,7,8,9,10) \norder by somedata;\r\nexecutes in 9ms.\n\nselect * \nfrom view1 \nwhere id in (select ...',
};
