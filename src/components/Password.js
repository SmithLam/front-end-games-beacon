import React, { useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { Form, Button } from "react-bootstrap";

function Password() {
  const { token } = useParams();
  const history = useHistory();
  const [password, setPassword] = useState("");

  const submitNewPassword = async (e, password, token) => {
    try {
      e.preventDefault();
      console.log("this is new password", password);
      console.log("this is token", token);
      let formData = { password: password, token: token };
      const submitNewPassword = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/password/reset`,
        {
          method: "PATCH",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      const result = await submitNewPassword.json();
      console.log(result.data);
      alert("You have successfully reset the password");
      history.push("/");
    } catch (err) {
      console.log(err);
      alert("Something went wrong with your password reset");
    }
  };

  return (
    <div>
      <Form className="mx-4 my-4">
        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
          <Form.Text className="text-muted">
            Please input your new Password
          </Form.Text>
        </Form.Group>

        {/* <Form.Group controlId="formBasicPassword">
          <Form.Label>Re-enter your new Password</Form.Label>
          <Form.Control type="password" placeholder="Password" />
        </Form.Group> */}

        <Button
          variant="primary"
          type="submit"
          onClick={(e) => submitNewPassword(e, password, token)}
        >
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default Password;
