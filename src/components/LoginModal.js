import React, { useState } from "react";
import { Modal, Button, Form, Col } from "react-bootstrap";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import { GoogleLogin } from "react-google-login";
import { IconContext } from "react-icons";
import { useSelector, useDispatch } from "react-redux";
import {
  loginFacebook,
  loginGoogle,
  loginEmail,
} from "../redux/actions/userAction";
import facebookNew from "../images/facebookNew.png";
import googleLogo from "../images/googleLogo.png";

function LoginModal(props) {
  const dispatch = useDispatch();
  let { showModal } = useSelector((state) => state.modal);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [isRemembered, setRemember] = useState(false);


  return (
    <div>
      <IconContext.Provider value={{ className: "react-icons" }}>
        <Modal
          show={showModal}
          onHide={(e) => dispatch({ type: "CLOSE-LOGIN-MODAL" })}
        >
          <Modal.Header closeButton>
            <Modal.Title>Login</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Row className="d-flex justify-content-between">
                <Col className="text-center">
                  <Form.Group controlId="faceBookLogin">
                    <Form.Label>Facebook Login</Form.Label>
                    <Form.Text className="text-muted">
                      <FacebookLogin
                        appId="1751990751605847"
                        autoLoad={false}
                        fields="name,email,picture"
                        callback={(data) =>
                          dispatch(loginFacebook(data))
                        }
                        render={(renderProps) => (
                          <img
                            id="login-icon"
                            src={facebookNew}
                            alt="facebook-icon"
                            onClick={renderProps.onClick}
                          ></img>
                        )}
                      />
                    </Form.Text>
                  </Form.Group>
                </Col>
                <Col className="text-center">
                  <Form.Group controlId="googleLogin">
                    <Form.Label>Google Login</Form.Label>
                    <Form.Text className="text-muted">
                      <GoogleLogin
                        clientId="208444202424-n9c1v4mqgpiul0l08rte73i9j8l8l5kp.apps.googleusercontent.com"
                        render={(renderProps) => (
                          <img
                            id="login-icon"
                            alt="google-icon"
                            src={googleLogo}
                            onClick={renderProps.onClick}
                            disabled={renderProps.disabled}
                          ></img>
                        )}
                        onSuccess={(data) =>
                          dispatch(loginGoogle(data))
                        }
                        onFailure={(data) =>
                          dispatch(loginGoogle(data))
                        }
                        cookiePolicy={"single_host_origin"}
                      />
                    </Form.Text>
                  </Form.Group>
                </Col>
              </Form.Row>
            </Form>
          </Modal.Body>
          <Modal.Body>
            <Form
              onSubmit={(e) =>
                dispatch(loginEmail(e, email, password))
              }
            >
              <Form.Label>Or if you want to sign in via Email</Form.Label>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter email"
                />
                <Form.Text className="text-muted">
                  We'll never share your email with anyone else.
                </Form.Text>
              </Form.Group>

              <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                />
              </Form.Group>
              {/* <Form.Group controlId="formBasicCheckbox">
                <Form.Check
                  type="checkbox"
                  checked={isRemembered}
                  onChange={(e) => setRemember(!isRemembered)}
                  label="Remember me"
                />
              </Form.Group> */}
              <Button variant="primary" type="submit">
                Login
              </Button>
            </Form>
          </Modal.Body>
        </Modal>
      </IconContext.Provider>
    </div>
  );
}

export default LoginModal;
