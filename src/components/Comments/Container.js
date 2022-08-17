import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";

import UserContext from "../../contexts/userContext";

import Comment from "./Comment";
import Input from "./Input";

export default function CommentsContainer({ postId }) {
  const { getSession } = useContext(UserContext);
  const { token } = getSession();

  const [commentsList, setCommentsList] = useState([]);

  const getCommentsList = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/posts/${postId}/comments`,
        { headers: { Authorization: token } }
      );

      setCommentsList(response.data);
    } catch {
      alert(
        "An error occured while fetchng comments from this post, try again later"
      );
    }
  };

  useEffect(() => {
    getCommentsList();
  }, []);

  return (
    <Container>
      <Comments>
        {commentsList.map((comment) => (
          <Comment key={comment.id} comment={comment} />
        ))}
      </Comments>
      <Input postId={postId} getCommentsList={getCommentsList} />
    </Container>
  );
}

const Container = styled.div`
  padding: 24px 24px 0;
  border-radius: 16px;
  margin-top: -24px;
  width: 611px;
  background-color: #1e1e1e;

  img {
    border-radius: 26.5px;
    height: 40px;
    width: 40px;
    object-fit: cover;
  }

  @media (max-width: 612px) {
    width: 100%;
    margin-bottom: 16px;
  }
`;

const Comments = styled.div`
  max-height: 300px;
  overflow-y: scroll;

  > div {
    padding: 22px 0;
  }
`;
