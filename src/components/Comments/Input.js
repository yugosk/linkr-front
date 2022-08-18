import { useContext, useState } from "react";
import styled from "styled-components";

import { FiSend } from "react-icons/fi";

import UserContext from "../../contexts/userContext";
import axios from "axios";

export default function Input({ postId, getCommentsList }) {
  const { getSession } = useContext(UserContext);
  const { picture, token } = getSession();

  const [text, setText] = useState("");
  const [postLoading, setPostLoading] = useState(false);

  async function createComment(e) {
    e.preventDefault();
    setPostLoading(true);

    try {
      await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/posts/${postId}/comments`,
        { text },
        { headers: { Authorization: token } }
      );

      setText("");
      getCommentsList();
    } catch {
      alert(
        "An error occured while posting a comment on this post, try again later"
      );
    } finally {
      setPostLoading(false);
    }
  }

  return (
    <Container onSubmit={createComment}>
      <img src={picture} alt="Profile" />
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="write a comment..."
        disabled={postLoading}
        required
      />
      <Button type="submit" disabled={postLoading}>
        <FiSend />
      </Button>
    </Container>
  );
}

const Container = styled.form`
  position: relative;
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 22px 0;

  input {
    padding: 0 34px 0 14px;
    border: none;
    border-radius: 8px;
    height: 40px;
    width: 100%;
    background-color: #252525;
    font-family: "Lato";
    font-weight: 400;
    font-size: 14px;
    color: #acacac;

    &::placeholder {
      font-style: italic;
      color: #575757;
    }
  }
`;

const Button = styled.button`
  position: absolute;
  top: 34px;
  right: 10px;
  border: none;
  background-color: transparent;
  cursor: pointer;

  svg {
    height: 18px;
    width: 18px;
    color: #c6c6c6;
  }
`;
