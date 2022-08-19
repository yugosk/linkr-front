import styled from "styled-components";
import React, { useContext } from "react";
import RepostsContext from "../../contexts/repostsContext";
import axios from "axios";

const ModalBackground = styled.div`
  position: fixed;
  display: flex;
  height: 100%;
  width: 100vw;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  align-items: center;
  justify-content: center;
  background-color: rgba(255, 255, 255, 0.9);
  z-index: 3;
  overflow: hidden;
`;

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  width: 597px;
  height: 210px;
  background-color: #333333;
  align-items: center;
  border-radius: 20px;
  padding: 42px 146px 39px 146px;

  p {
    font-family: "Lato";
    font-weight: 700;
    font-size: 29px;
    text-align: center;
    color: #ffffff;
    margin-bottom: 23px;
  }
`;

const ModalButtons = styled.div`
  display: flex;
  flex-direction: row;
  gap: 27px;
  }
`;

const CancelButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  font-family: "Lato";
  font-size: 18px;
  font-weight: 700;
  border-radius: 5px;
  border: none;
  height: 37px;
  width: 134px;
  color: #1877f2;
  background-color: #ffffff;
  cursor: pointer;
`;

const ConfirmButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  font-family: "Lato";
  font-size: 18px;
  font-weight: 700;
  border-radius: 5px;
  border: none;
  height: 37px;
  width: 134px;
  color: #ffffff;
  background-color: #1877f2;
  cursor: pointer;
`;

export default function RepostModal({ modalOpen, token }) {
  const { repostId, setModal } = useContext(RepostsContext);

  async function repost() {
    const configs = {
      headers: { Authorization: token },
    };
    try {
      await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/reposts/${repostId}`,
        {},
        configs
      );
    } catch (error) {
      console.log(error);
      alert("There was an error while reposting, try again later");
    } finally {
      setModal(false);
    }
  }

  if (modalOpen) {
    return (
      <ModalBackground>
        <ModalContent>
          <p>Do you want to re-post this link?</p>
          <ModalButtons>
            <CancelButton onClick={() => setModal(false)}>
              No, cancel
            </CancelButton>
            <ConfirmButton onClick={() => repost()}>Yes, share!</ConfirmButton>
          </ModalButtons>
        </ModalContent>
      </ModalBackground>
    );
  } else {
    return <></>;
  }
}
