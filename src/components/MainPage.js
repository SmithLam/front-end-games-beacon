import React, { useEffect } from "react";
import { Jumbotron, Container, Button, Form, Col, Row } from "react-bootstrap";

import GameCard from "./GameCard";

export default function mainPage() {
  return (
    <div>
      <Jumbotron className="jumbotron" fluid>
        <Container className="jumbotron-inside py-3">
          <h2>Welcome to Games Beacon</h2>
          <p>
            Your one-stop place to find PC video games and buy them at the
            cheapest price!
          </p>
          <p>
            <Form>
              <Form.Row>
                <Form.Control placeholder="Find your favorite PC game!" />
              </Form.Row>
            </Form>
          </p>
        </Container>
      </Jumbotron>
      <Container fluid>
        <h3>Check out Latest PC Games</h3>
        <Row className="d-flex flex-wrap justify-content-around">
          <Col xs="12" md="3" className="my-2">
            <GameCard
              id="3498"
              name="Grand Theft Auto V"
              price="10"
              image="https://i.ytimg.com/vi/kbQCHWUKoVw/maxresdefault.jpg"
            ></GameCard>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
