import styled from "styled-components";

export default styled.div`
  display: flex;
  height: 100vh;
  //width: 100vw;
  margin-left: 20px;
  background-color: #333333;
  align-items: center;
  flex-direction: column;
  padding: 0;
  //overflow: scroll;

  @media (max-width: 612px) {
    margin-left: 0px;
  }
`;
