import { useNavigate } from "react-router-dom";
import styled from "styled-components";

export default function Comment({ comment }) {
  const { username, userId, picture, text, isFollowing, isOwner } = comment;

  const navigate = useNavigate();

  return (
    <Container>
      <img src={picture} alt="Profile" />
      <div>
        <p>
          <span onClick={() => navigate(`/user/${userId}`)}>{username}</span>
          {isOwner && <span> • post's author</span>}
          {!isOwner && isFollowing && <span> • following</span>}
        </p>
        <p>{text}</p>
      </div>
    </Container>
  );
}

const Container = styled.div`
  position: relative;
  display: flex;
  gap: 14px;
  border-bottom: 1px solid #353535;
  width: 100%;

  div {
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    gap: 4px;
    width: 100%;
  }

  p {
    width: 100%;
    font-family: "Lato";
    font-weight: 400;
    font-size: 14px;
    word-wrap: break-word;
  }

  p:nth-of-type(2) {
    color: #acacac;
  }

  span:nth-of-type(1) {
    color: #f3f3f3;
    cursor: pointer;

    &:hover {
      text-decoration: underline;
    }
  }

  span {
    color: #565656;
  }
`;
