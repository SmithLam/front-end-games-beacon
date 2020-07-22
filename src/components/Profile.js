import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { Button, Card } from "react-bootstrap";
import { fetchWishlist } from "../redux/actions/gameAction";
import GameCard from "./GameCard";

function Profile() {
  const dispatch = useDispatch();
  let history = useHistory();
  let { currentUser, currentWishlist } = useSelector((s) => s.user);

  const goUpdate = (e) => {
    e.preventDefault();
    history.push("/profile/update");
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(fetchWishlist());
  }, [dispatch]);

  return (
    <div>
      <div className="d-flex d-row justify-content-center mt-2 mb-2">
        <Card style={{ width: "18rem" }} className="shadow">
          <Card.Header>User Profile</Card.Header>
          <Card.Img variant="top" src={currentUser.avatar} />
          <Card.Body>
            <Card.Title>{currentUser.name}</Card.Title>
            <Card.Text>A player like Everybody else!</Card.Text>
            <Button
              variant="danger"
              onClick={(e) => {
                goUpdate(e);
              }}
            >
              Update Your Profile!
            </Button>
          </Card.Body>
        </Card>
      </div>
      <div className="d-flex mx-3 mt-2 mb-2">
        <h3>Our Current Wishlist:</h3>
      </div>
      <div className="row mx-3 my-2 d-flex flex-wrap justify-content-around">
        {!currentWishlist
          ? ""
          : currentWishlist.map((game, index) => (
              <div key={game.rawgId} className="col-xs-12 col-md-3 my-2">
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
