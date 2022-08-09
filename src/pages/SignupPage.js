import React, { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import UserContext from "../contexts/userContext";

import PageView from "../components/Authentication/PageView";
import Description from "../components/Authentication/Description";
import Form from "../components/Authentication/Form/Form";
import Input from "../components/Authentication/Form/Input";
import Button from "../components/Authentication/Form/Button";

export default function SignupPage() {
  const navigate = useNavigate();

  const { authenticated } = useContext(UserContext);

  const [postLoading, setPostLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [picture, setPicture] = useState("");

  useEffect(() => {
    if (authenticated) {
      navigate("/timeline", { replace: true });
    }
  }, [authenticated]);

  async function signUp(e) {
    e.preventDefault();
    try {
      setPostLoading(true);

      const body = { email, password, username, picture };
      await axios.post(`${process.env.REACT_APP_API_BASE_URL}/signup`, body);

      navigate("/", { replace: true });
    } catch (err) {
      if (err.response.status === 409) {
        alert("This email already has an account registered");
      }

      setPostLoading(false);
    }
  }

  return (
    <PageView>
      <Description>
        <div>
          <h1>linkr</h1>
          <h2>save, share and discover the best links on the web</h2>
        </div>
      </Description>
      <Form onSubmit={signUp}>
        <Input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={postLoading}
          placeholder="e-mail"
          required
        />
        <Input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={postLoading}
          placeholder="password"
          required
        />
        <Input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          disabled={postLoading}
          placeholder="username"
          required
        />
        <Input
          type="url"
          value={picture}
          onChange={(e) => setPicture(e.target.value)}
          disabled={postLoading}
          placeholder="picture url"
          required
        />
        <Button type="submit" disabled={postLoading}>
          Sign up
        </Button>
        <Link to="/">Switch back to log in</Link>
      </Form>
    </PageView>
  );
}
