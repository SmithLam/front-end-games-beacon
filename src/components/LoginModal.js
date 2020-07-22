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

function LoginModal(props) {
  const dispatch = useDispatch();
  let { currentUser } = useSelector((state) => state.user);
  let { showModal } = useSelector((state) => state.modal);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
                <Col>
                  <Form.Group controlId="faceBookLogin">
                    <Form.Label>Facebook Login</Form.Label>
                    <Form.Text className="text-muted">
                      <FacebookLogin
                        appId="1751990751605847"
                        autoLoad={false}
                        fields="name,email,picture"
                        callback={(data) => dispatch(loginFacebook(data))}
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
                        onSuccess={(data) => dispatch(loginGoogle(data))}
                        onFailure={(data) => dispatch(loginGoogle(data))}
                        cookiePolicy={"single_host_origin"}
                      />
                    </Form.Text>
                  </Form.Group>
                </Col>
              </Form.Row>
            </Form>
          </Modal.Body>
          <Modal.Body>
            <Form onSubmit={(e) => dispatch(loginEmail(email, password, e))}>
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
                  type="text"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
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
  //  <Modal.Header closeButton>
  //           <Modal.Title>Login</Modal.Title>
  //         </Modal.Header>
  //         <Modal.Body>
  //           <Form>
  //             <Form.Row className="d-flex justify-content-between">
  //               <Col>
  //                 <Form.Group controlId="faceBookLogin">
  //                   <Form.Label>Facebook Login</Form.Label>
  //                   <Form.Text className="text-muted">
  //                     <FacebookLogin
  //                       appId="1751990751605847"
  //                       autoLoad={false}
  //                       fields="name,email,picture"
  //                       callback={(data) => dispatch(loginFacebook(data))}
  //                       render={(renderProps) => (
  //                         <img
  //                           id="login-icon"
  //                           src="https://img.icons8.com/plasticine/2x/facebook-new.png"
  //                           alt="facebook-icon"
  //                           onClick={renderProps.onClick}
  //                         ></img>
  //                       )}
  //                     />
  //                   </Form.Text>
  //                 </Form.Group>
  //               </Col>
  //               <Col>
  //                 <Form.Group controlId="googleLogin">
  //                   <Form.Label>Google Login</Form.Label>
  //                   <Form.Text className="text-muted">
  //                     <GoogleLogin
  //                       clientId="208444202424-l087ammsaiv65o248gubddi1c02sqbpo.apps.googleusercontent.com"
  //                       render={(renderProps) => (
  //                         <img
  //                           id="login-icon"
  //                           alt="google-icon"
  //                           src="https://img.icons8.com/plasticine/2x/google-logo.png"
  //                           onClick={renderProps.onClick}
  //                           disabled={renderProps.disabled}
  //                         ></img>
  //                       )}
  //                       onSuccess={(data) => dispatch(loginGoogle(data))}
  //                       onFailure={(data) => dispatch(loginGoogle(data))}
  //                       cookiePolicy={"single_host_origin"}
  //                     />
  //                   </Form.Text>
  //                 </Form.Group>
  //               </Col>
  //             </Form.Row>
  //           </Form>
  //         </Modal.Body>
  //         <Modal.Body>
  //           <Form onSubmit={(e) => dispatch(loginEmail(email, password, e))}>
  //             <Form.Label>Or if you want to sign in via Email</Form.Label>
  //             <Form.Group controlId="formBasicEmail">
  //               <Form.Label>Email address</Form.Label>
  //               <Form.Control
  //                 type="email"
  //                 value={email}
  //                 onChange={(e) => setEmail(e.target.value)}
  //                 placeholder="Enter email"
  //               />
  //               <Form.Text className="text-muted">
  //                 We'll never share your email with anyone else.
  //               </Form.Text>
  //             </Form.Group>

  //             <Form.Group controlId="formBasicPassword">
  //               <Form.Label>Password</Form.Label>
  //               <Form.Control
  //                 type="text"
  //                 value={password}
  //                 onChange={(e) => setPassword(e.target.value)}
  //                 placeholder="Password"
  //               />
  //             </Form.Group>
  //             <Form.Group controlId="formBasicCheckbox">
  //               <Form.Check type="checkbox" label="Remember me" />
  //             </Form.Group>
  //             <Button variant="primary" type="submit">
  //               Login
  //             </Button>
  //           </Form>
  //         </Modal.Body>
  //         {/* <Modal.Footer>
  //           <Button variant="secondary" onClick={props.handleClose}>
  //             Close
  //           </Button>
  //         </Modal.Footer> */}
  //       </Modal>

    //  <div>
    //    <div className="container">
    //      <form action="/action_page.php">
    //        <div className="row">
    //          <h2 style={{ textAlign: "center" }}>
    //            Login with Social Media or Manually
    //          </h2>
    //          <div className="vl">
    //            <span className="vl-innertext">or</span>
    //          </div>
    //          <div className="col">
    //            <a href="#" className="fb btn">
    //              <i className="fa fa-facebook fa-fw" /> Login with Facebook
    //            </a>
    //            <a href="#" className="twitter btn">
    //              <i className="fa fa-twitter fa-fw" /> Login with Twitter
    //            </a>
    //            <a href="#" className="google btn">
    //              <i className="fa fa-google fa-fw" /> Login with Google+
    //            </a>
    //          </div>
    //          <div className="col">
    //            <div className="hide-md-lg">
    //              <p>Or sign in manually:</p>
    //            </div>
    //            <input
    //              type="text"
    //              name="username"
    //              placeholder="Username"
    //              required
    //            />
    //            <input
    //              type="password"
    //              name="password"
    //              placeholder="Password"
    //              required
    //            />
    //            <input type="submit" defaultValue="Login" />
    //          </div>
    //        </div>
    //      </form>
    //    </div>
    //    <div className="bottom-container">
    //      <div className="row">
    //        <div className="col">
    //          <a href="#" style={{ color: "white" }} className="btn">
    //            Sign up
    //          </a>
    //        </div>
    //        <div className="col">
    //          <a href="#" style={{ color: "white" }} className="btn">
    //            Forgot password?
    //          </a>
    //        </div>
    //      </div>
    //    </div>
    //  </div>;