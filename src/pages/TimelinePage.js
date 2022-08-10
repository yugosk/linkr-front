import React, { useState } from "react";
import axios from "axios";
import TimelineContainer from "../components/Timeline/TimelineContainer";
import TimelineTitle from "../components/Timeline/TimelineTitle";

import {
  FormContainer,
  FormImage,
  FormContent,
  PublishForm,
} from "../components/Timeline/TimelineForm";

export default function TimelinePage() {
  const [url, setUrl] = useState("");
  const [description, setDescription] = useState("");
  const [publishLoading, setPublishLoading] = useState(false);
  const [publishButton, setPublishButton] = useState("Publish");

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
          headers: {
            Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjYwMDc2ODU4fQ.hBNC8rWEeajXZnknyQsuIQ_ff5qvdVKHXDxNkxuUL1g`,
          },
        };
        await axios.post("http://localhost:4000/posts", postData, configs);

        setPublishLoading(false);
        setPublishButton("Publish");
        alert("Criado com sucesso, trocar o comando aqui pelo Get de posts");
      } catch (err) {
        alert("Houve um erro ao publicar o seu link");

        setPublishLoading(false);
        setPublishButton("Publish");
      }
    }
  }

  return (
    <TimelineContainer>
      <TimelineTitle>
        <h1>timeline</h1>
      </TimelineTitle>
      <FormContainer>
        <FormImage>
          <img
            src="https://magazine25.vteximg.com.br/arquivos/ids/231937-1250-1250/dislpay-pokemon-2.jpg?v=637804477486100000"
            alt="Profile"
          />
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
    </TimelineContainer>
  );
}
