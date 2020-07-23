import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Jumbotron, Container, Form } from "react-bootstrap";

function MainPage() {
  const history = useHistory();
  const dispatch = useDispatch();
  let [searchTerm, setSearchTerm] = useState("");

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
            Your one-stop place to find PC video games and get them at the best
            prices!
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
