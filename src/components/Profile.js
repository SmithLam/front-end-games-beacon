import React from "react";
import { useSelector} from "react-redux";
import {useHistory} from "react-router-dom"
import { Button } from "react-bootstrap";

function Profile() {
  let history = useHistory();
  let { currentUser } = useSelector((s) => s.user);

  const goUpdate = (e) => {
    e.preventDefault();
    history.push("/profile/update");
  };

  return (
    <div>
      <h1>This is Profile Page of {currentUser.name}</h1>
      <div>
        This is our current Avatar:{" "}
        <img id="avatar-big" alt="avatar" src={currentUser.avatar}></img>
      </div>
      <div>
        This is the list of our Wishslist:{" "}
        {currentUser.wishlistRawgId.length === 0
          ? "Nothing"
          : currentUser.wishlistRawgId}
      </div>
      <div>
        This is the list of our Owned Games:{" "}
        {currentUser.owned.length === 0 ? "Nothing" : currentUser.owned}
      </div>
      <div>We have spent this much: $ {currentUser.nPayment}</div>
      <Button variant="danger" onClick={(e) => goUpdate(e)}>
        Update Profile
      </Button>
    </div>
  );
}

export default Profile;
