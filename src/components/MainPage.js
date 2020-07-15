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

  const getGames = async () => {
    try {
      let url = `https://api.rawg.io/api/games?page=1&page_size=5&platforms=4`;
      let data = await fetch(url);
      let result = await data.json();
      console.log(result.results);
      let gameList = result.results;
      let gamePrices = gameList.map(async (game) => {
        let price = await getPrice(game.name.replace(/ *\([^)]*\) */g, "")); //remove spaces between parantheses
        game["price"] = price === null ? null : price * 1;
        return game;
      });
      gameList = await Promise.all(gamePrices);
      console.log(gameList);
      dispatch({ type: "LOAD-GAMES", payload: gameList });
    } catch (err) {
      console.log(err);
    }
  };

  const getPrice = async (name) => {
    let url = `https://www.cheapshark.com/api/1.0/games?title=${name}`;
    let datas = await fetch(url);
    let price = await datas.json();
    return price[0] ? price[0].cheapest : null;
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
            <Card key={game.id} className="mb-3" style={{ width: "18rem" }}>
              <Card.Img variant="top" src={game.background_image} />
              <Card.Body>
                <Card.Title>{game.name}</Card.Title>
                <Card.Text>
                  Available on
                  {game.platforms.map((item) => {
                    return (
                      <Badge key={item.platform.name} pill variant="danger">
                        {item.platform.name}
                      </Badge>
                    );
                  })}
                </Card.Text>
              </Card.Body>
              <ListGroup className="list-group-flush">
                <ListGroupItem>Release date: {game.released}</ListGroupItem>
                <ListGroupItem>
                  Best price:{" "}
                  {game.price ? `$${game.price}` : `Not Available Now`}
                </ListGroupItem>
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
