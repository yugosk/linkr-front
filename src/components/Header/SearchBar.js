import styled from "styled-components";

import { DebounceInput } from "react-debounce-input";
import { AiOutlineSearch } from "react-icons/ai";

export default function SearchBar() {
  return (
    <Container>
      <Input type="text" placeholder="Search for people" />
      <AiOutlineSearch />
    </Container>
  );
}

const Container = styled.div`
  position: relative;
  margin: 0 28px;
  height: 44px;
  width: 100%;
  max-width: 560px;

  svg {
    position: absolute;
    top: 8px;
    right: 10px;
    height: 28px;
    width: 28px;
    color: #c6c6c6;
  }

  @media (max-width: 612px) {
    position: absolute;
    top: 76px;
    width: calc(100% - 56px);
    margin: 0;
  }
`;

const Input = styled(DebounceInput)`
  padding: 0 44px 0 18px;
  border: none;
  border-radius: 8px;
  height: 100%;
  width: 100%;
  background-color: #ffffff;
  font-family: "Lato";
  font-weight: 400;
  font-size: 19px;

  &::placeholder {
    color: #c6c6c6;
  }
`;
