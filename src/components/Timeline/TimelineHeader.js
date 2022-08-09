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
`;

const HeaderProfilePic = styled.img`
  width: 53px;
  heigth: 53px;
  border-radius: 50%;
  object-fit: cover;
  margin-left: 15px;
`;

export { TimelineHeader, HeaderProfilePic };
