import React from "react";
import { Modal, Button, Form, Col } from "react-bootstrap";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import { GoogleLogin } from "react-google-login";
import { IconContext } from "react-icons";

function LoginModal(props) {
  return (
    <div>
      <IconContext.Provider value={{ className: "react-icons" }}>
        <Modal show={props.show} onHide={props.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Login</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Row className="d-flex justify-content-between">
                <Col>
                  <Form.Group controlId="faceBookLogin">
                    <Form.Label>Facebook Login</Form.Label>
                    <Form.Text className="text-muted">
                      <FacebookLogin
                        appId="1751990751605847"
                        autoLoad={false}
                        fields="name,email,picture"
                        render={(renderProps) => (
                          <img
                            id="login-icon"
                            src="https://img.icons8.com/plasticine/2x/facebook-new.png"
                            alt="facebook-icon"
                            onClick={renderProps.onClick}
                          ></img>
                        )}
                      />
                    </Form.Text>
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group controlId="googleLogin">
                    <Form.Label>Google Login</Form.Label>
                    <Form.Text className="text-muted">
                      <GoogleLogin
                        clientId="208444202424-l087ammsaiv65o248gubddi1c02sqbpo.apps.googleusercontent.com"
                        render={(renderProps) => (
                          <img
                            id="login-icon"
                            alt="google-icon"
                            src="https://img.icons8.com/plasticine/2x/google-logo.png"
                            onClick={renderProps.onClick}
                            disabled={renderProps.disabled}
                          ></img>
                        )}
                        onSuccess={props.loginGoogle}
                        onFailure={props.loginGoogle}
                        cookiePolicy={"single_host_origin"}
                      />
                    </Form.Text>
                  </Form.Group>
                </Col>
              </Form.Row>
            </Form>
          </Modal.Body>
          <Modal.Body>
            <Form onSubmit={props.loginEmail}>
              <Form.Label>Or if you want to sign in via Email</Form.Label>
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
          </Modal.Body>
          {/* <Modal.Footer>
            <Button variant="secondary" onClick={props.handleClose}>
              Close
            </Button>
          </Modal.Footer> */}
        </Modal>
      </IconContext.Provider>
    </div>
  );
}

export default LoginModal;
