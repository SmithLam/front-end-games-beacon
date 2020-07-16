import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Card, ListGroup, ListGroupItem, Button, Badge } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { getGames } from "../redux/actions/gameAction";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";

function MainPage() {
  let dispatch = useDispatch();
  let { currentGameList } = useSelector((state) => state.game);

  let [liked, setLiked] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(getGames());
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
          <Card.Title>
            Cyberpunk 2077
            {liked === true ? (
              <AiFillHeart onClick={() => setLiked(false)}></AiFillHeart>
            ) : (
              <AiOutlineHeart onClick={() => setLiked(true)}></AiOutlineHeart>
            )}
          </Card.Title>
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
