import styled from "styled-components";

import Comment from "./Comment";
import Input from "./Input";

export default function CommentsContainer() {
  return (
    <Container>
      <Comment />
      <Input />
    </Container>
  );
}

const Container = styled.div`
  padding: 24px 24px 0;
  border-radius: 16px;
  margin-top: -24px;
  width: 611px;
  background-color: #1e1e1e;

  > div {
    padding: 22px 0;
  }

  img {
    border-radius: 26.5px;
    height: 40px;
    width: 40px;
  }

  @media (max-width: 612px) {
    width: 100%;
    margin-bottom: 16px;
  }
`;
