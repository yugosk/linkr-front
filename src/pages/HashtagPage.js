import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import TimelineContainer from "../components/Timeline/TimelineContainer";
import TimelineTitle from "../components/Timeline/TimelineTitle";
import PageContainer from "../components/Timeline/PageContainer";
import UserContext from "../contexts/userContext";
import {
  FormContainer,
  FormImage,
  FormContent,
  PublishForm,
} from "../components/Timeline/TimelineForm";
import PostList from "../components/Timeline/TimelinePosts";
import TrendingBox from "../components/Trending/TrendingBox";

export default function TimelinePage() {
  const { hashtag } = useParams();
  const { getSession } = useContext(UserContext);
  const { token, picture, userId } = getSession();
  const [url, setUrl] = useState("");
  const [description, setDescription] = useState("");
  const [publishLoading, setPublishLoading] = useState(false);
  const [publishButton, setPublishButton] = useState("Publish");
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

  useEffect(() => getPosts(), []);

  async function submitPost(e) {
    e.preventDefault();
    const urlRegex =
      /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,4}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/;
    if (url === "" || !urlRegex.test(url)) {
      alert("Fill in the url input correctly");
    } else {
      try {
        setPublishLoading(true);
        setPublishButton("Publishing...");

        const postData = { url, description };
        const configs = {
          headers: { Authorization: token },
        };
        await axios.post(
          `${process.env.REACT_APP_API_BASE_URL}/posts`,
          postData,
          configs
        );

        setPublishLoading(false);
        setPublishButton("Publish");
        alert("Criado com sucesso");
        setDescription("");
        setUrl("");
        getPosts();
      } catch (err) {
        alert("Houve um erro ao publicar o seu link");

        setPublishLoading(false);
        setPublishButton("Publish");
      }
    }
  }
  return (
    <PageContainer>
      <TimelineContainer>
        <TimelineTitle>
          <h1>{hashtag}</h1>
        </TimelineTitle>
        <PostList
          loading={loading}
          posts={postList}
          userId={userId}
          token={token}
          newPosts={[]}
        />
      </TimelineContainer>
      <TrendingBox />
    </PageContainer>
  );
}
