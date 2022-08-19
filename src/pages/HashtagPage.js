import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import TimelineContainer from "../components/Timeline/TimelineContainer";
import TimelineTitle from "../components/Timeline/TimelineTitle";
import PageContainer from "../components/Timeline/PageContainer";
import UserContext from "../contexts/userContext";
import PostList from "../components/Timeline/TimelinePosts";
import TrendingBox from "../components/Trending/TrendingBox";

export default function TimelinePage() {
  const { hashtag } = useParams();
  const { getSession } = useContext(UserContext);
  const { token, userId } = getSession();
  const [loading, setLoading] = useState(true);
  const [postList, setPostList] = useState([]);

  async function getPosts() {
    const configs = {
      headers: { Authorization: token },
    };
    try {
      const promise = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/hashtag/${hashtag}`,
        configs
      );
      setPostList(promise.data);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => getPosts(), [hashtag]);

  return (
    <PageContainer>
      <TimelineContainer>
        <TimelineTitle>
          <h1>{hashtag}</h1>
        </TimelineTitle>

        <div>
          <div>
            <PostList
              loading={loading}
              posts={postList}
              userId={userId}
              token={token}
              newPosts={[]}
            />
          </div>
          <TrendingBox />
        </div>
      </TimelineContainer>
    </PageContainer>
  );
}
