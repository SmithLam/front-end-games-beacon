import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import { Col, Form, Button } from "react-bootstrap";
import { Image, Transformation, CloudinaryContext } from "cloudinary-react";
import axios from "axios";
import { openUploadWidget } from "../CloudinaryService";

// let cloudinaryPostURL = process.env.CLOUDINARY_CLOUD_NAME;

const GOOGLE_SEARCH_API = process.env.REACT_APP_APIKEY;

function Register(props) {
  let history = useHistory();
  let [images, setImages] = useState([]);
  let [publicID, setPublicID] = useState("");

  const beginUpload = (tag) => {
    const uploadOptions = {
      cloudName: "smithlam",
      uploadPreset: "SmithLam",
      resourceType: "image",
      defaultSource: "local",
      multiple: false,
      maxImageHeight: 400,
      sources: [
        "local",
        "url",
        "camera",
        "image_search",
        "google_drive",
        "facebook",
        "dropbox",
        "instagram",
        "shutterstock",
      ],
      googleApiKey: GOOGLE_SEARCH_API,
      styles: {
        palette: {
          window: "#000000",
          sourceBg: "#000000",
          windowBorder: "#8E9FBF",
          tabIcon: "#FFFFFF",
          inactiveTabIcon: "#8E9FBF",
          menuIcons: "#2AD9FF",
          link: "#08C0FF",
          action: "#336BFF",
          inProgress: "#00BFFF",
          complete: "#33ff00",
          error: "#EA2727",
          textDark: "#000000",
          textLight: "#FFFFFF",
        },
        fonts: {
          default: null,
          "'Space Mono', monospace": {
            url: "https://fonts.googleapis.com/css?family=Space+Mono",
            active: true,
          },
        },
      },
    };

    openUploadWidget(uploadOptions, (error, photos) => {
      if (!error) {
        console.log(photos);
        if (photos.event === "success") {
          setImages([...images, photos.info.public_id]);
          setPublicID(photos.info.public_id);
          console.log(photos.info.secure_url);
          setAvatar(photos.info.secure_url);
        }
      } else {
        console.log(error);
      }
    });
  };

  let [name, setName] = useState("");
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [avatar, setAvatar] = useState("");
  const [validated, setValidated] = useState(false);

  const clearForm = () => {
    setName("");
    setEmail("");
    setPassword("");
    setAvatar("");
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    setValidated(true);
    console.log(name, email, password, avatar);
    let formData = { name, email, password, avatar };
    console.log(formData);

    axios
      .post("http://localhost:5000/user/register", formData)
      .then((res) => {
        console.log(res);
        console.log(res.data);
        alert("A new user has been added");
        clearForm();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <h1>This is Register Page</h1>
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Form.Row>
          <Col xs="auto" md="5">
            <Form.Group controlId="formGridName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Enter name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <Form.Control.Feedback type="invalid">
                Please choose a username.
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col xs="auto" md="5">
            <Form.Group controlId="formGridEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                required
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Form.Control.Feedback type="invalid">
                Please provide an email.
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Form.Row>
        <Form.Row>
          <Col xs="auto" md="4">
            <Form.Group controlId="formGridPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                required
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Form.Text id="passwordHelpBlock" muted>
                Must be 8-10 characters long.
              </Form.Text>
              <Form.Control.Feedback type="invalid">
                Please put a password
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Form.Row>
        <Form.Row>
          <Col xs="auto" md="3">
            <Button onClick={() => beginUpload()}>Upload Avatar Image</Button>
          </Col>
          <Col xs="auto" md="9">
            <CloudinaryContext cloudName="smithlam">
              <Image publicId={publicID || "c9gsnzmd52jlcuprq6nz"}>
                <Transformation height="100" crop="scale" angle="0" />
              </Image>
            </CloudinaryContext>
          </Col>
        </Form.Row>
        <Form.Group>
          <Form.Check
            required
            label="Agree to terms and conditions"
            feedback="You must agree before submitting."
          />
        </Form.Group>
        <center>
          <Button variant="primary" className="mt-5 mb-3" type="submit">
            Register!
          </Button>
        </center>
      </Form>
    </div>
  );
}

export default Register;
