import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import TimelineContainer from "../components/Timeline/TimelineContainer";
import TimelineTitle from "../components/Timeline/TimelineTitle";
import UserContext from "../contexts/userContext";
import {
  HeaderOptions,
  HeaderProfilePic,
  TimelineHeader,
} from "../components/Timeline/TimelineHeader";
import {
  FormContainer,
  FormImage,
  FormContent,
  PublishForm,
} from "../components/Timeline/TimelineForm";
import PostList from "../components/Timeline/TimelinePosts";
import { IoIosArrowDown } from "react-icons/io";

export default function TimelinePage() {
  const { getSession } = useContext(UserContext);
  const { token, picture } = getSession();
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
      const promise = await axios.get("http://localhost:4000/posts", configs);
      console.log(promise);
      await setPostList(promise.data);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => getPosts, []);

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
        await axios.post("http://localhost:4000/posts", postData, configs);

        setPublishLoading(false);
        setPublishButton("Publish");
        alert("Criado com sucesso");
        getPosts();
      } catch (err) {
        alert("Houve um erro ao publicar o seu link");

        setPublishLoading(false);
        setPublishButton("Publish");
      }
    }
  }

  return (
    <TimelineContainer>
      <TimelineHeader>
        <div>
          <h1>linkr</h1>
        </div>
        <div>
          <IoIosArrowDown color="#ffffff" size={"24px"} />
          <HeaderProfilePic src={picture} alt="Profile" />
        </div>
      </TimelineHeader>
      <TimelineTitle>
        <h1>timeline</h1>
      </TimelineTitle>
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
      <PostList loading={loading} posts={postList} />
    </TimelineContainer>
  );
}
