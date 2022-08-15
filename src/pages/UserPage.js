import React, { useState, useEffect, useContext } from "react";
import { useParams } from 'react-router-dom';
import axios from "axios";

import TimelineContainer from "../components/Timeline/TimelineContainer";
import TimelineTitle from "../components/Timeline/TimelineTitle";
import PageContainer from "../components/Timeline/PageContainer";
import UserContext from "../contexts/userContext";
import PostList from "../components/Timeline/TimelinePosts";
import TrendingBox from "../components/Trending/TrendingBox"

export default function UserPage() {
    const { id } = useParams();
    const { getSession } = useContext(UserContext);
    const { token, picture, userId } = getSession();
    const [url, setUrl] = useState("");
    const [description, setDescription] = useState("");
    const [publishLoading, setPublishLoading] = useState(false);
    const [publishButton, setPublishButton] = useState("Publish");
    const [loading, setLoading] = useState(true);
    const [postList, setPostList] = useState([]);
    const [username,setUsername] = useState("");

  async function getPosts() {
    const configs = {
      headers: { Authorization: token },
    };
    try {
      const promise = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/user/${id}`,
        configs
      );
      setPostList(promise.data);
      setLoading(false);
      setUsername(promise.data[0].username);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => getPosts(), []);
  return (
    <PageContainer>
      <TimelineContainer>
        <TimelineTitle>
          <h1>{username}</h1>
        </TimelineTitle>
        <PostList loading={loading} posts={postList} userId={userId}/>
      </TimelineContainer>
      <TrendingBox />
    </PageContainer>
  );
}