import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Jumbotron, Container, Button, Form, Col, Row } from "react-bootstrap";
import GameCard from "./GameCard";

function MainPage() {
  const history = useHistory();
  const dispatch = useDispatch();
  let [searchTerm, setSearchTerm] = useState("");
  let { currentSearch } = useSelector((state) => state.game);

  const handleSubmit = (e, searchTerm) => {
    e.preventDefault();
    let search = `&search=${searchTerm}`;
    dispatch({ type: "SEARCH-GAME", payload: search });
    setSearchTerm("")
    history.push("/explore");
  };

  return (
    <div>
      <Jumbotron className="jumbotron" fluid>
        <Container className="jumbotron-inside py-3">
          <h2>Welcome to Games Beacon</h2>
          <p>
            Your one-stop place to find PC video games and buy them at the
            cheapest prices!
          </p>
          <p>
            <Form onSubmit={(e) => handleSubmit(e, searchTerm)}>
              <Form.Control
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                type="text"
                placeholder="Find your favorite PC game! Just press Enter!"
              />
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

export default MainPage;
