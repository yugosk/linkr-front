import styled from "styled-components";

export default styled.div`
  display: flex;
  width: 42%;
  text-align: left;
  height: 64px;
  margin-top: 121px;
  margin-bottom: 43px;

  h1 {
    font-family: "Oswald";
    font-weight: 700;
    font-size: 43px;
    line-height: 64px;
    color: #ffffff;
  }

  @media (max-width: 612px) {
    width: 100%;
    text-align: left;
    height: 87px;
    margin-top: 72px;
    margin-bottom: 0;
    padding-left: 17px;
  
    h1 {
      font-weight: 700;
      font-size: 33px;
      line-height: 87px;
      color: #ffffff;
    }
  }
`;
