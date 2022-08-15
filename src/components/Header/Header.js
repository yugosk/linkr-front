import { useContext } from "react";
import styled from "styled-components";

import UserContext from "../../contexts/userContext";

import SearchBar from "./SearchBar";
import Menu from "./Menu";

export default function Header() {
  const { authenticated } = useContext(UserContext);

  if (!authenticated) return <></>;

  return (
    <Container>
      <Content>
        <h1>linkr</h1>
        <SearchBar />
        <Menu />
      </Content>
    </Container>
  );
}

const Container = styled.div`
  position: fixed;
  top: 0;
  z-index: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 72px;
  width: 100%;
  background-color: #151515;

  @media (max-width: 612px) {
    height: 140px;
    align-items: flex-start;
  }
`;

const Content = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 28px;
  height: 53px;
  width: 100%;
  max-width: 1440px;

  h1 {
    font-family: "Passion One";
    font-weight: 700;
    font-size: 48px;
    letter-spacing: 0.05em;
    color: #ffffff;
    cursor: pointer;
  }

  @media (max-width: 612px) {
    margin-top: 10px;

    h1 {
      font-size: 44px;
    }
  }
`;
