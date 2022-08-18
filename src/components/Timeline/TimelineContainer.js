import styled from "styled-components";

export default styled.div`
  display: flex;
  min-height: 100vh;
  width: 100%;
  max-width: 934px;
  margin: 0 20px;
  background-color: #333333;
  flex-direction: column;
  padding-bottom: 20px;
  //overflow: scroll;

  > div:nth-of-type(2) {
    display: flex;
    justify-content: space-between;

    > div:nth-of-type(1) {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 611px;
    }
  }

  @media (max-width: 612px) {
    margin: 0px;
  }
`;
