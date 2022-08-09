import React from "react";
import { Link } from "react-router-dom";

import PageView from "../components/Authentication/PageView";
import Description from "../components/Authentication/Description";
import Form from "../components/Authentication/Form/Form";
import Input from "../components/Authentication/Form/Input";
import Button from "../components/Authentication/Form/Button";

export default function SigninPage() {
  async function signIn(e) {
    e.preventDefault();
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
        <Input type="email" placeholder="e-mail" required />
        <Input type="password" placeholder="password" required />
        <Button type="submit">Log in</Button>
        <Link to="/sign-up">First time? Create an account!</Link>
      </Form>
    </PageView>
  );
}
