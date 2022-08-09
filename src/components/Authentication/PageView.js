import styled from "styled-components";

export default styled.div`
  display: flex;
  align-items: center;
  height: 100vh;
  width: 100%;

  @media (max-width: 992px) {
    flex-direction: column;
  }
`;
