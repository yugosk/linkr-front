import React, { useState, useEffect, useContext } from "react";
import { useParams } from 'react-router-dom';
import axios from "axios";

import TimelineContainer from "../components/Timeline/TimelineContainer";
import TimelineTitle from "../components/Timeline/TimelineTitle";
import PageContainer from "../components/Timeline/PageContainer";
import UserContext from "../contexts/userContext";
import PostList from "../components/Timeline/TimelinePosts";
import TrendingBox from "../components/Trending/TrendingBox";

export default function UserPage() {
    const { id } = useParams();
    const { getSession } = useContext(UserContext);
    const { token, picture, userId } = getSession();
    const [loading, setLoading] = useState(true);
    const [postList, setPostList] = useState([]);
    const [username,setUsername] = useState("");
    const [userPicture,setUserPicture] = useState("");

  async function getPosts() {
    const configs = {
      headers: { Authorization: token },
    };
    try {
      const promise = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/user/${id}`,
        configs
      );
      if (promise.data[0].url){
        setPostList(promise.data);
      }
      else {
        setPostList([]);
      }
      setLoading(false);
      setUsername(promise.data[0].username);
      setUserPicture(promise.data[0].picture);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => getPosts(), [id]);

  return (
    <PageContainer>
      <TimelineContainer>
        <TimelineTitle>
            <img src={userPicture} alt='user picture'/>
            <h1>{username}</h1>
        </TimelineTitle>
        <PostList loading={loading} posts={postList} userId={userId} token={token}/>
      </TimelineContainer>
      <TrendingBox />
    </PageContainer>
  );
}