import React from "react";
import { Badge, Card } from "react-bootstrap";
// import { useHistory } from "react-router-dom";
import genericCover from "../images/imageNotAvailable.jpg";

function ownedCard(props) {
  // const history = useHistory();

  // const goDetail = (e, gameId) => {
  //   e.preventDefault();
  //   history.push(`/games/${gameId}`);
  // };

  return (
    <div>
      <Card className="shadow-sm bg-white rounded h-auto" id="game-card">
        <Card.Img
          id="card-image"
          variant="top"
          alt="See More Detail"
          src={props.image || genericCover}
          // onClick={(e) => goDetail(e, props.id)}
        />
        <Card.Body>
          <div className="d-flex flex-row mb-3 h-100 w-100 justify-content-between">
            <Card.Text id="card-name-title">{props.name}</Card.Text>
            <Badge pill className="py-2 mb-auto wishlist-icon" variant="danger">
              OWNED
            </Badge>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
}

export default ownedCard;
