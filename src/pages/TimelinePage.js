import React, { useState } from "react";
import axios from "axios";
import TimelineContainer from "../components/Timeline/TimelineContainer";
import TimelineTitle from "../components/Timeline/TimelineTitle";
import {
  HeaderProfilePic,
  TimelineHeader,
} from "../components/Timeline/TimelineHeader";
import {
  FormContainer,
  FormImage,
  FormContent,
  PublishForm,
} from "../components/Timeline/PublishForm/FormContainer";
import { IoIosArrowDown } from "react-icons/io";

export default function TimelinePage() {
  const [url, setUrl] = useState("");
  const [description, setDescription] = useState("");

  function submitPost(e) {
    e.preventDefault();
    const urlRegex =
      /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/;
    if (url !== "" && urlRegex.test(url)) {
      const postData = { url, description };
      //falta trocar o link da requisição e o token usado para testes
      const promise = axios.post("http://localhost:4000/posts", postData, {
        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjYwMDc2ODU4fQ.hBNC8rWEeajXZnknyQsuIQ_ff5qvdVKHXDxNkxuUL1g`,
        },
      });
      promise.then((response) =>
        console.log(
          "Criado com sucesso, falta a parte de atualizar a página com os novos posts"
        )
      );
      promise.catch((err) => console.log(err));
    } else {
      alert("Check the inputs, the url is required!");
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
          <HeaderProfilePic
            src="https://magazine25.vteximg.com.br/arquivos/ids/231937-1250-1250/dislpay-pokemon-2.jpg?v=637804477486100000"
            alt="Profile"
          />
        </div>
      </TimelineHeader>
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
              onChange={(e) => setUrl(e.target.value)}
            />
            <input
              type={"text"}
              id="description"
              value={description}
              placeholder="Awesome article about #javascript"
              onChange={(e) => setDescription(e.target.value)}
            />
            <button>Publish</button>
          </PublishForm>
        </FormContent>
      </FormContainer>
    </TimelineContainer>
  );
}
