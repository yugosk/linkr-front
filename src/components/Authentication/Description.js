import styled from "styled-components";

export default styled.div`
  display: flex;
  align-items: center;
  height: 100%;
  width: 62%;
  background-color: #151515;
  color: #ffffff;

  div {
    margin: 0 0 200px 144px;
  }

  h1 {
    font-family: "Passion One";
    font-weight: 700;
    font-size: 106px;
    letter-spacing: 0.05em;
  }

  h2 {
    width: 100%;
    max-width: 442px;
    font-family: "Oswald";
    font-weight: 700;
    font-size: 43px;
  }

  @media (max-width: 768px) {
    justify-content: center;
    padding: 20px 20px 30px;
    height: auto;
    width: 100%;

    div {
      margin: 0;
    }

    h1,
    h2 {
      text-align: center;
    }

    h1 {
      font-size: 76px;
    }

    h2 {
      max-width: 240px;
      font-size: 23px;
    }
  }
`;
