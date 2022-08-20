import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import TimelineContainer from "../components/Timeline/TimelineContainer";
import TimelineTitle from "../components/Timeline/TimelineTitle";
import PageContainer from "../components/Timeline/PageContainer";
import UserContext from "../contexts/userContext";
import RepostsContext from "../contexts/repostsContext";
import {
  FormContainer,
  FormImage,
  FormContent,
  PublishForm,
} from "../components/Timeline/TimelineForm";
import PostList from "../components/Timeline/TimelinePosts";
import TrendingBox from "../components/Trending/TrendingBox";
import useInterval from "use-interval";
import RepostModal from "../components/Posts/RepostModal";

export default function TimelinePage() {
  const { getSession } = useContext(UserContext);
  const { token, picture, userId } = getSession();
  const [url, setUrl] = useState("");
  const [description, setDescription] = useState("");
  const [publishLoading, setPublishLoading] = useState(false);
  const [publishButton, setPublishButton] = useState("Publish");
  const [loading, setLoading] = useState(true);
  const [postList, setPostList] = useState([]);
  const [newPostList, setNewPostList] = useState([]);
  const [count, setCount] = useState(0);
  const { modal } = useContext(RepostsContext);

  async function getPosts() {
    const configs = {
      headers: { Authorization: token },
    };
    try {
      const promise = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/posts`,
        configs
      );
      if (promise.data === "This user follows no one") {
        setPostList("No follows");
      } else {
        setPostList(promise.data);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  async function getNewPosts() {
    const configs = {
      headers: { Authorization: token },
    };
    try {
      const promise = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/posts`,
        configs
      );
      setNewPostList(promise.data);
      setCount(count + 1);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => getPosts(), []);
  useInterval(getNewPosts, 15000);

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
      <RepostModal modalOpen={modal} token={token} />
      <TimelineContainer>
        <TimelineTitle>
          <h1>timeline</h1>
        </TimelineTitle>
        <div>
          <div>
            <FormContainer>
              <FormImage>
                <img src={picture} alt="Profile" />
              </FormImage>
              <FormContent>
                <h1>What are you going to share today?</h1>
                <PublishForm onSubmit={submitPost}>
                  <input
                    type={"text"}
                    id="url"
                    value={url}
                    placeholder="http://..."
                    required
                    disabled={publishLoading}
                    onChange={(e) => setUrl(e.target.value)}
                  />
                  <input
                    type={"text"}
                    id="description"
                    value={description}
                    placeholder="Awesome article about #javascript"
                    disabled={publishLoading}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                  <button type="submit" disabled={publishLoading}>
                    {publishButton}
                  </button>
                </PublishForm>
              </FormContent>
            </FormContainer>
            <PostList
              loading={loading}
              posts={postList}
              userId={userId}
              token={token}
              newPosts={newPostList}
              setPostList={setPostList}
              getPosts={getPosts}
            />
          </div>
          <TrendingBox posts={postList} />
        </div>
      </TimelineContainer>
    </PageContainer>
  );
}
