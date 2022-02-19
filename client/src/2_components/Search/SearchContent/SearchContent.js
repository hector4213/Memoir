import React, { useState } from "react";
import "./SearchContent.scss";

import { connect } from "react-redux";
import { clearSearchAction, searchAction } from "../../../redux/actions/search";
import SearchTags from "./SearchType/SearchTags";
import SearchTitle from "./SearchType/SearchTitle";
import SearchDate from "./SearchType/SearchDate";
import { Link } from "react-router-dom";

const SearchContent = (props) => {
  const [searchType, setSearchType] = useState("");
  const [searchTagInput, setSearchTagInput] = useState("");
  const [searchTitleInput, setSearchTitleInput] = useState("");
  const [date, setDate] = useState({ month: 0, day: 0, year: 0 });

  const { setSearching, search, results, clearSearch } = props;

  let resultCards = [];
  const resultsExist = results && results.length > 0;
  if (resultsExist) {
    results.forEach((res) => {
      const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];
      const d = new Date(res.date);
      const date = `${months[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`;

      resultCards.push(
        <Link to={`/story/${res.story_id}/entry/${res.id}`}>
          <li key={`${res.title}`}>
            <h1>{res.title}</h1>
            {res.story ? <h2>{res.story.name}</h2> : ""}

            <p>{date}</p>
          </li>
        </Link>
      );
    });
  } else {
    resultCards = null;
  }

  const handleClear = (e) => {
    setSearchTagInput("");
    setSearchTitleInput("");
    setDate("");
    clearSearch();
  };

  const handleClose = (e) => {
    handleClear();
    setSearching(false);
  };

  return (
    <div className="search-screen" onClick={handleClose}>
      <button className="close-search" onClick={handleClose}>
        X
      </button>

      <div
        className="search-content"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }}
      >
        <label> I am looking for ... </label>

        <div className="search-type-nav">
          <button onClick={(e) => setSearchType("tag")}> Tag </button>
          <button onClick={(e) => setSearchType("title")}> Title </button>
          <button onClick={(e) => setSearchType("date")}> Date </button>
        </div>

        <form onSubmit={(e) => e.preventDefault()}>
          {searchType === "tag" ? (
            <SearchTags {...{ search, searchTagInput, setSearchTagInput }} />
          ) : (
            ""
          )}
          {searchType === "title" ? (
            <SearchTitle
              {...{ search, searchTitleInput, setSearchTitleInput }}
            />
          ) : (
            ""
          )}
          {searchType === "date" ? (
            <SearchDate {...{ search, date, setDate }} />
          ) : (
            ""
          )}
        </form>

        {resultsExist ? (
          <>
            <div className="clear" onClick={handleClear}>
              Clear Results
            </div>
            <div className="results"> {resultCards} </div>
          </>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    results: state.page.results,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    search: (searchType, searchTerm) =>
      dispatch(searchAction(searchType, searchTerm)),
    clearSearch: () => dispatch(clearSearchAction()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchContent);
