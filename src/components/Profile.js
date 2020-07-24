import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button, Card, Container, Form, Col } from "react-bootstrap";
import { fetchWishlist, fetchCart } from "../redux/actions/gameAction";
import GameCard from "./GameCard";
import { Image, Transformation, CloudinaryContext } from "cloudinary-react";
import { openUploadWidget } from "../CloudinaryService";

const GOOGLE_SEARCH_API = process.env.REACT_APP_GOOGLE_SEARCH_API;

function Profile() {
  const dispatch = useDispatch();
  let { currentUser, currentWishlist } = useSelector((s) => s.user);

  let [images, setImages] = useState([]);
  let [publicID, setPublicID] = useState("");
  let [name, setName] = useState("");
  let [avatar, setAvatar] = useState("");

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

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      if (!name) {
        name = currentUser.name;
      }
      if (!avatar) {
        avatar = currentUser.image;
      }
      console.log(name, avatar);
      let formData = { name, avatar };
      console.log(formData);
      const updateProfile = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/user/profile`,
        {
          method: "PATCH",
          headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      const result = await updateProfile.json();
      console.log(result.data);
      alert("Your Profile has been updated!");
      setName("");
      let user = result.data;
      dispatch({
        type: "LOGIN",
        payload: {
          user: user,
        },
      });
      dispatch(fetchWishlist());
      dispatch(fetchCart());
    } catch (err) {
      console.log(err);
      alert("Your Profile is not updated!");
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(fetchWishlist());
  }, [dispatch]);

  return (
    <div>
      <div className="row mx-3 my-2 d-flex flex-wrap justify-content-around">
        <div className="col-sm-12 col-md-3 my-2">
          <Card style={{ width: "18rem" }} className="shadow">
            <Card.Header>Current User Profile</Card.Header>
            <Card.Img variant="top" src={currentUser.avatar} />
            <Card.Body>
              <Card.Title>{currentUser.name}</Card.Title>
            </Card.Body>
          </Card>
        </div>
        <div className="col-sm-12 col-md-3 my-2">
          <Card style={{ width: "18rem" }} className="shadow">
            <Card.Header>Update Your Profile</Card.Header>
            <Form.Row className="mb-1 mt-2 text-center">
              <Col xs="12" md="12">
                <CloudinaryContext cloudName="smithlam">
                  <Image publicId={publicID || "c9gsnzmd52jlcuprq6nz"}>
                    <Transformation
                      height="200"
                      width="260"
                      crop="scale"
                      angle="0"
                    />
                  </Image>
                </CloudinaryContext>
              </Col>
            </Form.Row>
            <Card.Body>
              <Container className="d-flex mt-1 justify-content-center">
                <Form onSubmit={handleSubmit}>
                  <Form.Row>
                    <Col xs="12" md="12">
                      <Form.Group controlId="formGridName">
                        <Form.Label>Update your Name</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder={currentUser.name || "Your current name"}
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                        />
                      </Form.Group>
                    </Col>
                  </Form.Row>
                  <Form.Row className="mb-3">
                    <Form.Label>Update your Avatar</Form.Label>
                    <Button onClick={() => beginUpload()}>
                      Choose new Avatar
                    </Button>
                  </Form.Row>
                  <Form.Row className="mb-3">
                    <Form.Label>Happy with your Change?</Form.Label>
                    <Button variant="danger" type="submit">
                      Update Your Profile!
                    </Button>
                  </Form.Row>
                </Form>
              </Container>
            </Card.Body>
          </Card>
        </div>
      </div>
      <div className="d-flex mx-4 mt-2 mb-2">
        <h3>Our Current Wishlist:</h3>
      </div>
      <div className="row mx-4 mt-2 mb-2">
        {!currentWishlist
          ? ""
          : currentWishlist.map((game, index) => (
              <div key={game.rawgId} className="col-12 col-md-3 my-2">
                <GameCard
                  key={game.rawgId}
                  id={game.rawgId}
                  name={game.name}
                  price={game.price}
                  image={game.cover}
                />
              </div>
            ))}
      </div>
    </div>
  );
}

export default Profile;
