import React, { useEffect } from "react";
import {
  Jumbotron,
  Container,
  Button,
  Form,
  Col,
  Row,
  Card,
  CardDeck,
  ListGroup,
  ListGroupItem,
  Badge,
} from "react-bootstrap";

import { FaKissWinkHeart } from "react-icons/fa";
import { fiHeart, FiHeart } from "react-icons/fi";
import { MdAddShoppingCart } from "react-icons/md";

export default function mainPage() {
  return (
    <div>
      <Jumbotron className="jumbotron" fluid>
        <Container className="jumbotron-inside py-3">
          <h2>Welcome to Games Beacon</h2>
          <p>
            Your one-stop place to find video games and buy (most) of them at
            the cheapest price!
          </p>
          <p>
            <Form>
              <Form.Row>
                <Form.Control placeholder="Find your favorite game!" />
              </Form.Row>
            </Form>
          </p>
        </Container>
      </Jumbotron>
      <Container fluid>
        <Container className="px-2 py-2">
          <h3>Check out Upcoming Games</h3>
          <Row>
            <Col
              xs="12"
              md="3"
              className="d-flex flex-wrap justify-content-around"
            >
              <Card
                className="h-100 shadow-sm bg-white rounded"
                style={{ width: "18rem" }}
              >
                <Card.Img
                  id="card-image"
                  variant="top"
                  src="https://i.ytimg.com/vi/kbQCHWUKoVw/maxresdefault.jpg"
                />
                <Card.Body>
                  <div className="d-flex mb-2 justify-content-between">
                    <Card.Title className="font-weight-bold">
                      Grand Theft Auto V
                    </Card.Title>
                    <Badge pill className="mb-auto" variant="danger">
                      <FaKissWinkHeart size={20}></FaKissWinkHeart>
                    </Badge>
                  </div>
                  <div className="d-flex mb-2 justify-content-between">
                    <Card.Text id="price-number" className="ml-2">
                      Price: $10
                    </Card.Text>
                    <Button variant="success" href="#">
                      <MdAddShoppingCart size={20}></MdAddShoppingCart>
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
            <Col
              xs="12"
              md="3"
              className="d-flex flex-wrap justify-content-around"
            >
              <Card
                className="h-100 shadow-sm bg-white rounded"
                style={{ width: "18rem" }}
              >
                <Card.Img
                  variant="top"
                  id="card-image"
                  src="http://cdn.wccftech.com/wp-content/uploads/2015/04/Grand-Theft-Auto-5-PC-Defenitive.jpg"
                />
                <Card.Body>
                  <div className="d-flex mb-2 justify-content-between">
                    <Card.Title className="font-weight-bold">
                      Grand Theft Auto V
                    </Card.Title>
                    <Badge pill className="mb-auto" variant="danger">
                      <FaKissWinkHeart size={20}></FaKissWinkHeart>
                    </Badge>
                  </div>
                  <div className="d-flex mb-2 justify-content-between">
                    <Card.Text id="price-number" className="ml-2">
                      Price: $10
                    </Card.Text>
                    <Button variant="success" href="#">
                      <MdAddShoppingCart size={20}></MdAddShoppingCart>
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
            <Col
              xs="12"
              md="3"
              className="d-flex flex-wrap justify-content-around"
            >
              <Card
                className="h-100 shadow-sm bg-white rounded"
                style={{ width: "18rem" }}
              >
                <Card.Img
                  variant="top"
                  id="card-image"
                  src="http://cdn.wccftech.com/wp-content/uploads/2015/04/Grand-Theft-Auto-5-PC-Defenitive.jpg"
                />
                <Card.Body>
                  <div className="d-flex mb-2 justify-content-between">
                    <Card.Title className="font-weight-bold">
                      Grand Theft Auto V
                    </Card.Title>
                    <Badge pill className="mb-auto" variant="danger">
                      <FaKissWinkHeart size={20}></FaKissWinkHeart>
                    </Badge>
                  </div>
                  <div className="d-flex mb-2 justify-content-between">
                    <Card.Text id="price-number" className="ml-2">
                      Price: $10
                    </Card.Text>
                    <Button variant="success" href="#">
                      <MdAddShoppingCart size={20}></MdAddShoppingCart>
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
            <Col
              xs="12"
              md="3"
              className="d-flex flex-wrap justify-content-around"
            >
              <Card
                className="h-100 shadow-sm bg-white rounded"
                style={{ width: "18rem" }}
              >
                <Card.Img
                  variant="top"
                  id="card-image"
                  src="http://cdn.wccftech.com/wp-content/uploads/2015/04/Grand-Theft-Auto-5-PC-Defenitive.jpg"
                />
                <Card.Body>
                  <div className="d-flex mb-2 justify-content-between">
                    <Card.Title className="font-weight-bold">
                      Grand Theft Auto V
                    </Card.Title>
                    <Badge pill className="mb-auto" variant="danger">
                      <FaKissWinkHeart size={20}></FaKissWinkHeart>
                    </Badge>
                  </div>
                  <div className="d-flex mb-2 justify-content-between">
                    <Card.Text id="price-number" className="ml-2">
                      Price: $10
                    </Card.Text>
                    <Button variant="success" href="#">
                      <MdAddShoppingCart size={20}></MdAddShoppingCart>
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </Container>
    </div>
  );
}
