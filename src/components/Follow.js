import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";

import UserContext from "../contexts/userContext";

export default function FollowContainer({ followedId }) {
  const { getSession, finishSession } = useContext(UserContext);
  const { token, userId } = getSession();

  const [isLoading, setIsLoading] = useState(true);
  const [isFollowing, setIsFollowing] = useState(false);
  const [followId, setFollowedId] = useState(null);

  useEffect(() => {
    const getFollow = async () => {
      try {
        setIsLoading(true);

        const { data } = await axios.get(
          `${process.env.REACT_APP_API_BASE_URL}/followers?followedId=${followedId}`,
          { headers: { Authorization: token } }
        );

        if (data.length !== 0) {
          setIsFollowing(true);
          setFollowedId(data[0].id);
        }
      } catch (err) {
        if (err.response.status === 401) {
          finishSession();
        }
      } finally {
        setIsLoading(false);
      }
    };

    getFollow();
  }, [followedId]);

  const toggleFollow = async () => {
    try {
      setIsLoading(true);

      if (!isFollowing) {
        const { data } = await axios.post(
          `${process.env.REACT_APP_API_BASE_URL}/followers`,
          { followedId },
          { headers: { Authorization: token } }
        );

        setFollowedId(data.id);
      } else {
        await axios.delete(
          `${process.env.REACT_APP_API_BASE_URL}/followers/${followId}`,
          { headers: { Authorization: token } }
        );

        setFollowedId(null);
      }

      setIsFollowing((prev) => !prev);
    } catch (err) {
      alert(
        "An error occured while trying to follow/unfollow this user, try again later"
      );
    } finally {
      setIsLoading(false);
    }
  };

  if (followedId === userId) {
    return <></>;
  }

  if (isLoading) {
    return (
      <Button isFollowing={isFollowing}>
        <p>. . .</p>
      </Button>
    );
  }

  return (
    <Button onClick={toggleFollow} isFollowing={isFollowing}>
      {isFollowing ? <p>Unfollow</p> : <p>Follow</p>}
    </Button>
  );
}

const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  margin-left: auto;
  width: 100%;
  max-width: 110px;
  height: 30px;
  background: ${(props) => (props.isFollowing ? "#ffffff" : "#1877f2")};
  border-radius: 5px;
  cursor: pointer;

  p {
    font-family: "Lato";
    font-weight: 700;
    font-size: 14px;
    color: ${(props) => (props.isFollowing ? "#1877f2" : "#ffffff")};
  }
`;
