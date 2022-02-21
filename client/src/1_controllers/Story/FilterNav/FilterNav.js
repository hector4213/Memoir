import React from "react";
import "./FilterNav.scss";

const FilterNav = (props) => {
  const { setFilter, filter } = props;

  return (
    <div className="filter-nav">
      <ul>
        <li key="none"> Filter Entries by: </li>
        <li
          key="video"
          onClick={() => setFilter(1)}
          className={filter === 1 ? "active" : ""}
        >
          {" "}
          Video{" "}
        </li>
        <li
          key="text"
          onClick={() => setFilter(2)}
          className={filter === 2 ? "active" : ""}
        >
          {" "}
          Text{" "}
        </li>
        <li
          key="audio"
          onClick={() => setFilter(3)}
          className={filter === 3 ? "active" : ""}
        >
          {" "}
          Audio{" "}
        </li>
        <li
          key="image"
          onClick={() => setFilter(4)}
          className={filter === 4 ? "active" : ""}
        >
          {" "}
          Image{" "}
        </li>
        <li key="clear" onClick={() => setFilter(null)}>
          {" "}
          Clear Filter{" "}
        </li>
      </ul>
    </div>
  );
};

export default FilterNav;
