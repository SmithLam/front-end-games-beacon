import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Pagination from "react-js-pagination";
import { getGames } from "../redux/actions/gameAction";
import GameCard from "./GameCard.js";
import { Button, Form, InputGroup } from "react-bootstrap";

export default function Explore() {
  let dispatch = useDispatch();
  let { loaded } = useSelector((state) => state.app);
  let {
    currentGameList,
    currentGameCount,
    currentPage,
    currentSearch,
  } = useSelector((state) => state.game);


  let [searchTerm, setSearchTerm] = useState("");

  const handleSubmit = (e, searchTerm) => {
    e.preventDefault();
    let search = `&search=${searchTerm}`;
    dispatch({ type: "SEARCH-GAME", payload: search });
    setSearchTerm("");
  };

  const handlePageChange = async (pageNumber) => {
    console.log("This is page number on explore", pageNumber);
    dispatch(getGames(pageNumber, currentSearch));
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(getGames(currentPage, currentSearch));
  }, [dispatch, currentPage, currentSearch]);


  //loading
  if (!loaded) {
    return (
      <div>
        <h1>Loading</h1>
      </div>
    );
  }
  return (
    <div>
      <div
        id="search-box"
        className="mx-2 my-4 text-left d-flex justify-content-center"
      >
        <Form onSubmit={(e) => handleSubmit(e, searchTerm)}>
          <Form.Label>Search Your Game!</Form.Label>
          <InputGroup className="mb-3">
            <Form.Control
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              type="text"
              placeholder="e.g Doom or Half-Life!"
            />
            <InputGroup.Append>
              <Button type="submit" variant="outline-danger">
                Button
              </Button>
            </InputGroup.Append>
          </InputGroup>
          <Form.Text className="text-muted">
            Enter your desired game and Fire the Red Button!
          </Form.Text>
        </Form>
      </div>
      <Pagination
        className="pagination"
        hideDisabled
        prevPageText="Prev"
        nextPageText="Next"
        firstPageText="First"
        lastPageText="Last"
        activePage={currentPage}
        itemsCountPerPage={12}
        totalItemsCount={Math.ceil((currentGameCount * 1) / 12)}
        onChange={(pageNumber) => handlePageChange(pageNumber)}
        itemClass="page-item"
        linkClass="page-link"
      ></Pagination>
      <div className="container-fluid">
        <div className="row d-flex flex-wrap justify-content-around">
          {!currentGameList
            ? ""
            : currentGameList.map((game, index) => (
                <div key={game.id} className="col-xs-12 col-md-3 my-2">
                  <GameCard
                    key={game.id}
                    id={game.id}
                    name={game.name}
                    price={game.price}
                    image={game.background_image}
                  />
                </div>
              ))}
        </div>
        <Pagination
          className="pagination"
          hideDisabled
          prevPageText="Prev"
          nextPageText="Next"
          firstPageText="First"
          lastPageText="Last"
          activePage={currentPage}
          itemsCountPerPage={12}
          totalItemsCount={Math.ceil((currentGameCount * 1) / 12)}
          onChange={(pageNumber) => handlePageChange(pageNumber)}
          itemClass="page-item"
          linkClass="page-link"
        ></Pagination>
      </div>
    </div>
  );
}
