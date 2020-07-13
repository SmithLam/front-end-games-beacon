import React from "react";
import { Modal, Button, Form } from "react-bootstrap";
import FacebookLogin from "react-facebook-login";
import { GoogleLogin } from "react-google-login";

function LoginModal(props) {
  return (
    <div>
      <Modal show={props.show} onHide={props.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Login</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={props.loginEmail}>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                value={props.email}
                onChange={(e) => props.setEmail(e.target.value)}
                placeholder="Enter email"
              />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="text"
                value={props.password}
                onChange={(e) => props.setPassword(e.target.value)}
                placeholder="Password"
              />
            </Form.Group>
            <Form.Group controlId="formBasicCheckbox">
              <Form.Check type="checkbox" label="Remember me" />
            </Form.Group>
            <Button variant="primary" type="submit">
              Login
            </Button>
          </Form>
          <Form>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Facebook Login</Form.Label>
              <Form.Text className="text-muted">
                <FacebookLogin
                  appId="1751990751605847"
                  autoLoad={false}
                  fields="name,email,picture"
                  callback={props.loginFacebook}
                />
              </Form.Text>
            </Form.Group>

            <Form.Group controlId="formBasicEmail">
              <Form.Label>Google Login</Form.Label>
              <Form.Text className="text-muted">
                <GoogleLogin
                  clientId="208444202424-l087ammsaiv65o248gubddi1c02sqbpo.apps.googleusercontent.com"
                  buttonText="Login"
                  onSuccess={props.loginGoogle}
                  onFailure={props.loginGoogle}
                  cookiePolicy={"single_host_origin"}
                />
              </Form.Text>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.handleClose}>
            Close
          </Button>
          {/* <Button variant="primary" type="submit">
            Login
          </Button> */}
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default LoginModal;
