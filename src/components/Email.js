import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";

function Email() {
  const [email, setEmail] = useState("");

  const submitEmail = async (e, email) => {
    try {
      e.preventDefault();
      console.log(email);
      let formData = { email: email };
      const submitEmail = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/password/reset`,
        {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      const result = await submitEmail.json();
      console.log(result.data);
      alert("Please go check your email account!");
    } catch (err) {
      console.log(err);
      alert("Something went wrong with your email");
    }
  };

  return (
    <div>
      <Form className="mx-4 my-4">
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Form.Text className="text-muted">
            Please input your email again.
          </Form.Text>
        </Form.Group>
        <Button
          variant="primary"
          type="submit"
          onClick={(e) => submitEmail(e, email)}
        >
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default Email;
