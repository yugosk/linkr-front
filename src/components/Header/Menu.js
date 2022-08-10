import { useContext } from "react";
import { IoIosArrowDown } from "react-icons/io";
import styled from "styled-components";

import UserContext from "../../contexts/userContext";

export default function Menu() {
  const { getSession } = useContext(UserContext);

  const { picture } = getSession();

  return (
    <Container>
      <Profile>
        <IoIosArrowDown />
        <img src={picture} alt="Profile" />
      </Profile>
      {/* <Options>
        <p>Logout</p>
      </Options> */}
    </Container>
  );
}

const Container = styled.div`
  position: relative;
  width: 100%;
  max-width: 90px;

  @media (max-width: 612px) {
    max-width: 80px;
  }
`;

const Profile = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;

  svg {
    color: #ffffff;
    height: 40px;
    width: 30px;
  }

  img {
    border: 1px solid #ffffff;
    border-radius: 26.5px;
    width: 53px;
    height: 53px;
    object-fit: cover;
  }

  @media (max-width: 612px) {
    svg {
      width: 24px;
    }

    img {
      width: 46px;
      height: 46px;
    }
  }
`;

const Options = styled.div`
  position: absolute;
  right: -36px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  border-radius: 0px 0px 20px 20px;
  padding-right: 20px;
  height: 40px;
  width: 150%;
  background-color: #171717;

  p {
    font-family: "Lato";
    font-weight: 700;
    font-size: 17px;
    letter-spacing: 0.05em;
    color: #ffffff;
    cursor: pointer;
  }
`;
