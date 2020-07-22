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
    setSearchTerm("");
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
          <Form as="p" onSubmit={(e) => handleSubmit(e, searchTerm)}>
            <Form.Control
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              type="text"
              placeholder="Find your favorite PC game! Just press Enter!"
            />
          </Form>
        </Container>
      </Jumbotron>
    </div>
  );
}

export default MainPage;
