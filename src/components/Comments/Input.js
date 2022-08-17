import { useContext, useState } from "react";
import styled from "styled-components";

import { FiSend } from "react-icons/fi";

import UserContext from "../../contexts/userContext";

export default function Input() {
  const { getSession } = useContext(UserContext);
  const { picture } = getSession();

  const [text, setText] = useState("");

  return (
    <Container>
      <img src={picture} alt="Profile" />
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="write a comment..."
      />
      <FiSend />
    </Container>
  );
}

const Container = styled.div`
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

  > svg {
    position: absolute;
    top: 34px;
    right: 10px;
    height: 18px;
    width: 18px;
    color: #c6c6c6;
  }
`;
