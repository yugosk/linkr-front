import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import { ThreeDots } from "react-loader-spinner";

export default function SearchResult({ usersList, getLoading, resetSearch }) {
  const navigate = useNavigate();

  if (getLoading) {
    return (
      <Container>
        <ThreeDots color="#515151" height={10} width={80} />
      </Container>
    );
  }

  if (usersList.length === 0) {
    return (
      <Container>
        <SearchOption>
          <p>No results found</p>
        </SearchOption>
      </Container>
    );
  }

  return (
    <Container>
      {usersList.map(({ id, picture, username }) => (
        <SearchOption
          key={id}
          onMouseDown={() => {
            navigate(`/user/${id}`);
            resetSearch();
          }}
        >
          <img src={picture} alt="Profile" />
          <p>{username}</p>
        </SearchOption>
      ))}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  padding: 16px;
  border-radius: 0 0 8px 8px;
  margin-top: 40px;
  width: 100%;
  max-height: 360px;
  background-color: #e7e7e7;
  overflow-y: scroll;
`;

const SearchOption = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  width: 100%;
  cursor: pointer;

  &:hover {
    background-color: #b4b2b2;
  }

  img {
    width: 40px;
    height: 40px;
    border-radius: 85px;
    object-fit: cover;
  }

  p {
    font-family: "Lato";
    font-weight: 400;
    font-size: 19px;
    color: #515151;
  }
`;
