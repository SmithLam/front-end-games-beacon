import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Col, Form, Button } from "react-bootstrap";
import {
  Image,
  Video,
  Transformation,
  CloudinaryContext,
} from "cloudinary-react";
import axios from "axios";
import { fetchPhotos, openUploadWidget } from "../CloudinaryService";

// let cloudinaryPostURL = process.env.CLOUDINARY_CLOUD_NAME;

function Register() {
  let state = useSelector((state) => state);
  let currentUser = state.currentUser;
  let [avatarFile, setAvatarFile] = useState("");
  let [images, setImages] = useState([]);

  //   const onChangeHandler = (event) => {
  //     console.log(event.target.files[0]);
  //     let avatarFile = event.target.files[0];
  //     let data = avatarFile;
  //     console.log(data);
  //     axios
  //       .post(`https://api.cloudinary.com/v1_1/smithlam/image/upload`, {
  //         data,
  //       })
  //       .then(function (response) {
  //         console.log(response);
  //       })
  //       .catch(function (error) {
  //         console.log(error);
  //       });
  //   };
  const beginUpload = (tag) => {
    const uploadOptions = {
      cloudName: "smithlam",
      tags: [tag],
      uploadPreset: "SmithLam",
    };

    openUploadWidget(uploadOptions, (error, photos) => {
      if (!error) {
        console.log(photos);
        if (photos.event === "success") {
          setImages([...images, photos.info.public_id]);
        }
      } else {
        console.log(error);
      }
    });
  };

  return (
    <div>
      <h1>This is Register Page</h1>
      <Form>
        <Form.Row>
          <Form.Group as={Col} controlId="formGridEmail">
            <Form.Label>Name</Form.Label>
            <Form.Control type="email" placeholder="Enter name" />
          </Form.Group>

          <Form.Group as={Col} controlId="formGridEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" placeholder="Enter email" />
          </Form.Group>

          <Form.Group as={Col} controlId="formGridPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" />
          </Form.Group>
        </Form.Row>

        <Button onClick={() => beginUpload()}>Upload Image</Button>
        {/* <Form.Group controlId="formGridPassword">
          <Form.Label>Upload Avatar</Form.Label>
          <Form.Control type="file" name="file" onChange={onChangeHandler} />
        </Form.Group> */}

        <CloudinaryContext cloudName="smithlam">
          <Image publicId="sample">
            <Transformation width="200" crop="scale" angle="10" />
          </Image>
        </CloudinaryContext>

        <Form.Group controlId="formGridAddress1">
          <Form.Label>Address</Form.Label>
          <Form.Control placeholder="1234 Main St" />
        </Form.Group>

        <Form.Group controlId="formGridAddress2">
          <Form.Label>Address 2</Form.Label>
          <Form.Control placeholder="Apartment, studio, or floor" />
        </Form.Group>

        <Form.Row>
          <Form.Group as={Col} controlId="formGridCity">
            <Form.Label>City</Form.Label>
            <Form.Control />
          </Form.Group>

          <Form.Group as={Col} controlId="formGridState">
            <Form.Label>State</Form.Label>
            <Form.Control as="select" value="Choose...">
              <option>Choose...</option>
              <option>...</option>
            </Form.Control>
          </Form.Group>

          <Form.Group as={Col} controlId="formGridZip">
            <Form.Label>Zip</Form.Label>
            <Form.Control />
          </Form.Group>
        </Form.Row>

        <Form.Group id="formGridCheckbox">
          <Form.Check type="checkbox" label="Check me out" />
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default Register;
