import styled from "styled-components";

export default styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  padding: 56px;
  margin: 0 0 70px 0;
  width: 38%;

  input,
  button {
    font-family: "Oswald";
    font-weight: 700;
    font-size: 27px;
  }

  a {
    border-bottom: 1px solid #ffffff;
    font-family: "Lato";
    font-weight: 400;
    font-size: 20px;
    line-height: 24px;
    color: #ffffff;
  }

  @media (max-width: 768px) {
    padding: 0 20px;
    margin: 40px 0;
    width: 100%;
  }
`;
