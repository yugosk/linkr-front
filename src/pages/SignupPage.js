import PageView from "../components/Authentication/PageView";

import Description from "../components/Authentication/Description";
import Form from "../components/Authentication/Form/Form";
import Input from "../components/Authentication/Form/Input";
import Button from "../components/Authentication/Form/Button";
import { Link } from "react-router-dom";

export default function SignupPage() {
  return (
    <PageView>
      <Description>
        <div>
          <h1>linkr</h1>
          <h2>save, share and discover the best links on the web</h2>
        </div>
      </Description>
      <Form>
        <Input type="email" placeholder="e-mail" />
        <Input type="text" placeholder="password" />
        <Input type="text" placeholder="username" />
        <Input type="text" placeholder="picture url" />
        <Button>Sign up</Button>
        <Link to="/">Switch back to log in</Link>
      </Form>
    </PageView>
  );
}
