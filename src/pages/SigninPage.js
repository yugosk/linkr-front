import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import PageView from "../components/Authentication/PageView";
import Description from "../components/Authentication/Description";
import Form from "../components/Authentication/Form/Form";
import Input from "../components/Authentication/Form/Input";
import Button from "../components/Authentication/Form/Button";

export default function SigninPage() {
  const navigate = useNavigate();

  const [postLoading, setPostLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function signIn(e) {
    e.preventDefault();
    try {
      setPostLoading(true);

      const body = { email, password };
      await axios.post(`${process.env.REACT_APP_API_BASE_URL}/signin`, body);

      navigate("/timeline", { replace: true });
    } catch (err) {
      if (err.response.status === 401) {
        alert("Invalid email or password");
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
      <Form onSubmit={signIn}>
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
        <Button type="submit" disabled={postLoading}>
          Log in
        </Button>
        <Link to="/sign-up">First time? Create an account!</Link>
      </Form>
    </PageView>
  );
}
