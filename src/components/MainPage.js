import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Card, ListGroup, ListGroupItem, Button, Badge } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import axios from "axios";

function MainPage() {
  let state = useSelector((state) => state);
  let dispatch = useDispatch();
  let currentUser = state.currentUser;
  let currentGameList = state.currentGameList;

  // let [gameList, setGameList] = useState([]);

  const getGames = async () => {
    await axios
      .get("https://api.rawg.io/api/games?page=1&page_size=5&platform=4")
      .then((res) => {
        console.log(res);
        console.log("this is res data", res.data.results);
        let gameList = res.data.results;
        console.log(gameList);
        dispatch({ type: "LOAD-GAMES", payload: gameList });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    getGames();
  }, []);

  //loading
  if (!currentGameList) {
    return (
      <div>
        <h1>Loading</h1>
      </div>
    );
  }

  return (
    <div>
      <h1>This is Main Page</h1>
      <Card style={{ width: "18rem" }}>
        <Card.Img
          variant="top"
          src="https://i.ytimg.com/vi/07w-ITS91_M/maxresdefault.jpg"
        />
        <Card.Body>
          <Card.Title>Cyberpunk 2077</Card.Title>
          <Card.Text>Available on PC, PS4, Xbox One</Card.Text>
        </Card.Body>
        <ListGroup className="list-group-flush">
          <ListGroupItem>Release date: </ListGroupItem>
          <ListGroupItem>Best price: </ListGroupItem>
        </ListGroup>
        <Button variant="danger">More detail</Button>
      </Card>
      <div className="container-fluid">
        <div className="Row"></div>
        <div className="col-md-12 d-flex flex-wrap justify-content-around">
          {currentGameList.map((game) => (
            <Card style={{ width: "18rem" }}>
              <Card.Img variant="top" src={game.background_image} />
              <Card.Body>
                <Card.Title>{game.name}</Card.Title>
                <Card.Text>
                  Available on
                  {game.platforms.map((item) => {
                    return (
                      <Badge pill variant="danger">
                        {item.platform.name}
                      </Badge>
                    );
                  })}
                </Card.Text>
              </Card.Body>
              <ListGroup className="list-group-flush">
                <ListGroupItem>
                  Release date: {game.platforms[0].released_at}
                </ListGroupItem>
                <ListGroupItem>Best price: </ListGroupItem>
              </ListGroup>
              <Button variant="danger">More detail</Button>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MainPage;
