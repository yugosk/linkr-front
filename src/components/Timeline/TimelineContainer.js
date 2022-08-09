import styled from "styled-components";

export default styled.div`
  display: flex;
  height: 100vh;
  width: 100%;
  background-color: #333333;
  align-items: center;
  flex-direction: column;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;
