import styled from "styled-components";

const TimelineHeader = styled.div`
  height: 72px;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: space-between;
  background-color: #151515;
  text-align: left;
  justify-content: space-between;
  padding: 0 17px 0 28px;
  position: fixed;
  top: 0;
  z-index: 1;

  h1 {
    line-height: 54px;
    font-family: "Passion One";
    font-weight: 700;
    font-size: 49px;
    color: #ffffff;
  }

  div {
    display: flex;
    flex-direction: row;
    height: 100%;
    align-items: center;
  }

  @media (max-width: 612px) {
    padding: 0 52px 0 17px;

    h1 {
      font-size: 45px;
      line-height: 50px;
    }
  }
`;

const HeaderProfilePic = styled.img`
  width: 53px;
  heigth: 53px;
  border-radius: 50%;
  object-fit: cover;
  margin-left: 15px;

  @media (max-width: 612px) {
    width: 44px;
    heigth: 44px;
    margin-left: 6px;
    }

`;

export { TimelineHeader, HeaderProfilePic };
